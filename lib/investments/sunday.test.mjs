import test from "node:test";
import assert from "node:assert/strict";
import { normalizeFamilyState, assertHistoryPreserved } from "./family.mjs";
import { initialInvestmentState } from "./test-fixtures.mjs";
import { sundayOf, normalizeSessions } from "./sunday-state.mjs";
import {
  decisionResult,
  captureDecisionBaseline,
  decisionConsultation,
  decisionCheckpoints,
} from "./decision-results.mjs";
const now = Date.parse("2026-11-04T12:00:00Z"),
  isin = "US0378331005";
const baseline = {
  isin,
  quantity: "10",
  price: 10,
  currency: "EUR",
  valueCents: 10000,
  asOf: "2026-10-02T12:00:00Z",
  source: "Synthetic source",
  transactionIds: ["old"],
};
const decision = () => ({
  id: "decision",
  broker: "tr",
  accountId: "self",
  positionId: "test",
  name: "Synthetic asset",
  action: "exit",
  rationale: "Original rationale",
  invalidation: "Invalidation",
  successCriterion: "A measurable criterion",
  planDate: "2026-10-04",
  reviewDate: "2026-10-11",
  createdAt: "2026-10-04T12:00:00Z",
  baselineQuantity: "10",
  baselineValueCents: 10000,
  baselineDate: "2026-10-02",
  baseline,
  reviews: [],
});
const markets = (price = 8) => ({
  ["ISIN:" + isin]: {
    identity: { isin },
    quote: {
      price,
      currency: "EUR",
      asOf: "2026-11-04T11:00:00Z",
      idNotation: 123,
      source: "Synthetic source",
    },
    historyMeta: { verified: true, isin, currency: "EUR", idNotation: 123 },
    history: [
      { date: "2026-10-09", close: 9 },
      { date: "2026-11-03", close: 8 },
    ],
  },
});
const tx = (props = {}) => ({
  id: "sale",
  accountId: "self",
  isin,
  datetime: "2026-10-06T12:00:00Z",
  type: "SELL",
  quantity: "10",
  cashCents: 11800,
  currency: "EUR",
  ...props,
});
const measure = (rows = [], market = markets()) =>
  decisionResult(decision(), rows, market, "2026-11-04", now);
test("Sunday week is calendar based and supports year boundaries", () => {
  assert.equal(sundayOf("2026-11-04"), "2026-11-01");
  assert.equal(sundayOf("2026-11-01"), "2026-11-01");
  assert.equal(sundayOf("2026-01-01"), "2025-12-28");
});
test("intended sale with no execution retains actual holding outcome", () => {
  const r = measure();
  assert.equal(r.actualOutcomeCents, -2000);
  assert.equal(r.noActionOutcomeCents, -2000);
  assert.equal(r.tradeCount, 0);
});
test("full exit measures net received cash independently of holding benchmark", () => {
  const r = measure([tx()]);
  assert.equal(r.actualOutcomeCents, 1800);
  assert.equal(r.noActionOutcomeCents, -2000);
  assert.equal(r.actualOutcomeCents - r.noActionOutcomeCents, 3800);
});
test("partial sales and new buys include net costs without duplicate fees", () => {
  assert.equal(
    measure([tx({ quantity: "4", cashCents: 4700 })]).actualOutcomeCents,
    -500,
  );
  assert.equal(
    measure([tx({ type: "BUY", quantity: "2", cashCents: -2100 })])
      .actualOutcomeCents,
    -2500,
  );
});
test("other owners, other assets and already included trades do not change result", () => {
  assert.equal(
    measure([
      tx({ accountId: "fatemeh" }),
      tx({ isin: "US5949181045" }),
      tx({ id: "old" }),
    ]).actualOutcomeCents,
    -2000,
  );
});
test("missing ledger and incomplete executions never become zero", () => {
  assert.equal(measure(null).actualOutcomeCents, null);
  for (const row of [
    tx({ quantity: null }),
    tx({ cashCents: null }),
    tx({ currency: "USD" }),
    tx({ cashCents: -100 }),
    tx({ quantity: "11" }),
  ])
    assert.equal(measure([row]).actualOutcomeCents, null);
});
test("new backdated trades invalidate actual comparison rather than silently recasting baseline", () => {
  assert.equal(
    measure([tx({ datetime: "2026-10-03T12:00:00Z" })]).actualOutcomeCents,
    null,
  );
});
test("income is excluded consistently and does not invalidate measured trades", () => {
  const r = measure([tx({ type: "DIVIDEND", quantity: "10", cashCents: 500 })]);
  assert.equal(r.actualOutcomeCents, -2000);
});
test("corporate actions invalidate unadjusted comparison", () => {
  const r = measure([tx({ type: "SPLIT" })]);
  assert.equal(r.actualOutcomeCents, null);
  assert.equal(r.noActionOutcomeCents, null);
  assert.equal(r.pricePercent, null);
  const m = markets();
  m["ISIN:" + isin].splits = [{ date: "2026-10-10" }];
  assert.equal(measure([], m).pricePercent, null);
});
test("stale, wrong identity and non-EUR prices withhold result", () => {
  for (const patch of [{ asOf: "2026-10-10T12:00:00Z" }, { currency: "USD" }]) {
    const m = markets();
    Object.assign(m["ISIN:" + isin].quote, patch);
    assert.equal(measure([], m).pricePercent, null);
  }
  const m = markets();
  m["ISIN:" + isin].identity.isin = "US5949181045";
  assert.equal(measure([], m).actualOutcomeCents, null);
});
test("7 and 30 day outcomes use verified historical close and exclude later transactions", () => {
  const rows = [
    tx(),
    tx({
      id: "late",
      type: "BUY",
      quantity: "10",
      cashCents: -9000,
      datetime: "2026-10-20T12:00:00Z",
    }),
  ];
  const [week, month] = decisionCheckpoints(decision(), rows, markets(), now);
  assert.equal(week.date, "2026-10-11");
  assert.equal(week.actualOutcomeCents, 1800);
  assert.equal(week.noActionOutcomeCents, -1000);
  assert.equal(month.actualOutcomeCents, 800);
});
test("unmatured checkpoints remain pending", () => {
  const d = { ...decision(), planDate: "2026-11-01" };
  const [week, month] = decisionCheckpoints(d, [], markets(), now);
  assert.equal(week.actualOutcomeCents, null);
  assert.equal(month.pricePercent, null);
});
test("capture requires verified quantity, fresh EUR identity and loaded transactions", () => {
  const p = { quantity: "10", isin };
  assert.equal(captureDecisionBaseline(p, markets(), null, now), null);
  assert.equal(
    captureDecisionBaseline(
      { ...p, ledger: { quantityStatus: "prior-record" } },
      markets(),
      [],
      now,
    ),
    null,
  );
  assert.equal(captureDecisionBaseline(p, markets(), [], now).valueCents, 8000);
});
test("consultation is decision scoped and excludes internal transaction identifiers", () => {
  const prompt = decisionConsultation(decision(), { owner: "Synthetic owner" });
  assert.match(prompt, /Original rationale/);
  assert.doesNotMatch(prompt, /transactionIds|"old"/);
  assert.match(prompt, /منبع/);
  assert.match(prompt, /سه سناریو/);
});
test("legacy states migrate without creating sessions or decisions", () => {
  const state = normalizeFamilyState(initialInvestmentState());
  assert.deepEqual(state.weeklySessions, []);
  assert.deepEqual(state.decisions, []);
  assert.deepEqual(normalizeFamilyState(state), state);
});
test("draft session can be edited; closed session is immutable while later decisions remain separately appendable", () => {
  const state = normalizeFamilyState(initialInvestmentState());
  state.weeklySessions = normalizeSessions([
    { date: "2026-10-04", status: "draft", createdAt: "2026-10-04T08:00:00Z" },
  ]);
  let next = structuredClone(state);
  next.weeklySessions[0].goal = "New goal";
  assertHistoryPreserved(state, next);
  next.weeklySessions[0].status = "closed";
  next.weeklySessions[0].closedAt = "2026-10-04T14:00:00Z";
  const closed = assertHistoryPreserved(state, next);
  next = structuredClone(closed);
  next.weeklySessions[0].notes = "Rewrite";
  assert.throws(() => assertHistoryPreserved(closed, next));
  next = structuredClone(closed);
  next.decisions = [decision()];
  assert.equal(assertHistoryPreserved(closed, next).decisions.length, 1);
});
test("decision context and measured reviews survive reload and remain immutable", () => {
  const state = normalizeFamilyState(initialInvestmentState());
  state.decisions = [decision()];
  const saved = normalizeFamilyState(state),
    next = structuredClone(saved);
  next.decisions[0].reviews.push({
    id: "review",
    date: "2026-11-04",
    recordedAt: "2026-11-04T12:00:00Z",
    thesisValid: "yes",
    followedPlan: "yes",
    note: "Review with evidence",
    nextReviewDate: "2026-11-11",
    measurement: measure([tx()]),
    actualOutcomeCents: 1800,
    noActionOutcomeCents: -2000,
  });
  const reviewed = assertHistoryPreserved(saved, next);
  assert.equal(
    reviewed.decisions[0].reviews[0].measurement.actualOutcomeCents,
    1800,
  );
  next.decisions[0].baseline.price = 20;
  assert.throws(() => assertHistoryPreserved(reviewed, next));
});
test("XTB decisions preserve owner and manual broker results without invented prices", () => {
  const state = normalizeFamilyState(initialInvestmentState());
  state.decisions = [{ ...decision(), broker: "xtb", baseline: null }];
  const d = normalizeFamilyState(state).decisions[0];
  assert.equal(
    decisionResult(d, [], {}, "2026-11-04", now).actualOutcomeCents,
    null,
  );
  state.decisions[0].accountId = "mobin";
  assert.throws(() => normalizeFamilyState(state));
});
test("unverified symbol-only quotes cannot become an ISIN decision baseline", () => {
  const p = {
      quantity: "10",
      isin,
      marketConfirmed: true,
      marketSymbol: "DEMO",
    },
    m = markets();
  const quote = { ...m["ISIN:" + isin], identity: null };
  assert.equal(captureDecisionBaseline(p, { DEMO: quote }, [], now), null);
});

test("decision baseline rejects mismatched amounts and future/stale reference timestamps", () => {
  for (const patch of [
    { valueCents: 1 },
    { asOf: "2026-11-01T12:00:00Z" },
    { asOf: "2026-09-01T12:00:00Z" },
  ]) {
    const state = normalizeFamilyState(initialInvestmentState());
    state.decisions = [{ ...decision(), baseline: { ...baseline, ...patch } }];
    assert.throws(() => normalizeFamilyState(state));
  }
});

test("fully exited position retains measurable net result even when its current quote is unavailable", () => {
  const r = measure([tx()], {});
  assert.equal(r.actualOutcomeCents, 1800);
  assert.equal(r.noActionOutcomeCents, null);
  assert.equal(r.pricePercent, null);
  assert.equal(measure([tx({ quantity: "4" })], {}).actualOutcomeCents, null);
});
