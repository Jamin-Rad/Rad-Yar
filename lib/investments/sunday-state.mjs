import { euroProductCents } from "./balances.mjs";
const validDate = (value) =>
  typeof value === "string" &&
  /^\d{4}-\d{2}-\d{2}$/.test(value) &&
  Number.isFinite(Date.parse(value)) &&
  new Date(value).toISOString().slice(0, 10) === value;
const string = (value, max) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";
const timestamp = (value) =>
  typeof value === "string" && Number.isFinite(Date.parse(value));
const cents = (value) =>
  value == null
    ? null
    : Number.isSafeInteger(value) && Math.abs(value) <= 1e12
      ? value
      : (() => {
          throw Error("مبلغ نتیجه معتبر نیست.");
        })();
export function sundayOf(date) {
  const day = new Date(date + "T12:00:00Z");
  day.setUTCDate(day.getUTCDate() - day.getUTCDay());
  return day.toISOString().slice(0, 10);
}
export function normalizeSessions(input = []) {
  if (!Array.isArray(input) || input.length > 5200)
    throw Error("جلسه‌های یکشنبه معتبر نیستند.");
  const seen = new Set();
  return input.map((s) => {
    if (
      !validDate(s.date) ||
      sundayOf(s.date) !== s.date ||
      seen.has(s.date) ||
      !timestamp(s.createdAt) ||
      !["draft", "closed"].includes(s.status) ||
      (s.status === "closed" &&
        (!timestamp(s.closedAt) ||
          Date.parse(s.closedAt) < Date.parse(s.createdAt)))
    )
      throw Error("تاریخ یا وضعیت جلسه یکشنبه معتبر نیست.");
    seen.add(s.date);
    return {
      id: s.date,
      date: s.date,
      goal: string(s.goal, 1000),
      notes: string(s.notes, 4000),
      status: s.status,
      createdAt: s.createdAt,
      closedAt: s.status === "closed" ? s.closedAt : null,
    };
  });
}
export function normalizeDecisionContext(d) {
  const broker = d.broker === "xtb" ? "xtb" : "tr";
  const sessionDate = d.sessionDate || sundayOf(d.planDate);
  if (
    !validDate(sessionDate) ||
    sundayOf(sessionDate) !== sessionDate ||
    sessionDate !== sundayOf(d.planDate)
  )
    throw Error("هفته تصمیم معتبر نیست.");
  let baseline = null;
  if (d.baseline) {
    const b = d.baseline;
    if (
      broker !== "tr" ||
      !/^([A-Z]{2}[A-Z0-9]{9}\d)$/.test(b.isin || "") ||
      !/^\d{1,12}(\.\d{1,8})?$/.test(b.quantity || "") ||
      !Number.isFinite(b.price) ||
      b.price <= 0 ||
      b.currency !== "EUR" ||
      b.valueCents == null ||
      b.valueCents !== euroProductCents(b.quantity, b.price) ||
      Date.parse(b.asOf) > Date.parse(d.createdAt) + 300000 ||
      Date.parse(d.createdAt) - Date.parse(b.asOf) > 7 * 86400000 ||
      !timestamp(b.asOf) ||
      !Array.isArray(b.transactionIds) ||
      b.transactionIds.length > 10000 ||
      b.transactionIds.some((id) => typeof id !== "string" || id.length > 160)
    )
      throw Error("مبنای قیمت تصمیم معتبر نیست.");
    baseline = {
      isin: b.isin,
      quantity: b.quantity,
      price: b.price,
      currency: "EUR",
      valueCents: cents(b.valueCents),
      asOf: b.asOf,
      source: string(b.source, 200),
      transactionIds: [...new Set(b.transactionIds)],
    };
  }
  return {
    broker,
    sessionDate,
    successCriterion: string(d.successCriterion, 1000),
    chatPrompt: string(d.chatPrompt, 20000),
    chatResponse: string(d.chatResponse, 20000),
    baseline,
  };
}
export function normalizeMeasurement(m) {
  if (m == null) return null;
  if (!timestamp(m.evaluatedAt) || !validDate(m.date))
    throw Error("زمان سنجش نتیجه معتبر نیست.");
  const pricePercent = m.pricePercent == null ? null : m.pricePercent;
  if (
    pricePercent !== null &&
    (!Number.isFinite(pricePercent) || Math.abs(pricePercent) > 1e9)
  )
    throw Error("درصد نتیجه معتبر نیست.");
  return {
    date: m.date,
    evaluatedAt: m.evaluatedAt,
    priceAsOf: string(m.priceAsOf, 100),
    source: string(m.source, 200),
    pricePercent,
    actualOutcomeCents: cents(m.actualOutcomeCents),
    noActionOutcomeCents: cents(m.noActionOutcomeCents),
    tradeCount:
      Number.isSafeInteger(m.tradeCount) && m.tradeCount >= 0
        ? m.tradeCount
        : 0,
    issue: string(m.issue, 1000),
  };
}
export function assertSessionsPreserved(previous, next) {
  for (const session of previous.weeklySessions) {
    const updated = next.weeklySessions.find((s) => s.date === session.date);
    if (
      !updated ||
      (session.status === "closed" &&
        JSON.stringify(session) !== JSON.stringify(updated))
    )
      throw Error("جلسه ثبت‌شده قابل حذف یا بازنویسی نیست.");
  }
}
