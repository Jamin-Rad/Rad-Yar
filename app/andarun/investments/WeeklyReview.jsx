"use client";
import { useEffect, useState } from "react";
import {
  DECISION_ACTIONS,
  todayBerlin,
  nextReviewDate,
  tradePosition,
} from "@/lib/investments/family.mjs";
import { sundayOf } from "@/lib/investments/sunday-state.mjs";
import { shiftDate } from "@/lib/investments/period-profit.mjs";
import { attentionQueue, marketKey } from "@/lib/investments/market.mjs";
import { decisionResult } from "@/lib/investments/decision-results.mjs";
import { percent, signedMoney } from "@/lib/investments/portfolio.mjs";
import { decisionDue } from "./DecisionWorkspace";
import useDecisionResults from "./useDecisionResults";
import styles from "./SundayReview.module.css";
export function DecisionRows({
  decisions,
  state,
  ledger,
  marketData,
  onDecision,
}) {
  return decisions.length ? (
    <div className={styles.scroll}>
      <table>
        <thead>
          <tr>
            <th>دارایی / حساب</th>
            <th>تصمیم / تاریخ</th>
            <th>اثر قیمت</th>
            <th>اثر خریدوفروش و قیمت</th>
            <th>بازبینی بعدی</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {decisions.map((d) => {
            const result = decisionResult(
              d,
              ledger.loaded ? ledger.transactions : null,
              marketData.markets,
            );
            const manual =
              d.broker === "xtb"
                ? d.reviews.filter((r) => r.actualOutcomeCents != null).at(-1)
                : null;
            return (
              <tr key={d.id}>
                <td>
                  <strong dir="auto">{d.name}</strong>
                  <small>
                    {d.broker === "xtb" ? "XTB" : "Trade Republic"} ·{" "}
                    {state.accounts.find((a) => a.id === d.accountId)?.owner}
                  </small>
                </td>
                <td>
                  {DECISION_ACTIONS[d.action]}
                  <small>
                    <bdi>{d.planDate}</bdi>
                  </small>
                </td>
                <td>
                  <bdi>
                    {result.pricePercent == null
                      ? "—"
                      : percent(result.pricePercent)}
                  </bdi>
                </td>
                <td>
                  <bdi>
                    {signedMoney(
                      manual?.actualOutcomeCents ?? result.actualOutcomeCents,
                    )}
                  </bdi>
                  <small>
                    {manual
                      ? `گزارش بروکر · ${manual.date}`
                      : result.issue ||
                        `${result.tradeCount} معامله پس از تصمیم`}
                  </small>
                </td>
                <td>
                  <bdi>{decisionDue(d) || "پایان پیگیری"}</bdi>
                </td>
                <td>
                  <button type="button" onClick={() => onDecision(d.id)}>
                    پرونده و نتیجه
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  ) : (
    <p className={styles.empty}>هنوز تصمیمی ثبت نشده است.</p>
  );
}
export default function WeeklyReview({
  state,
  ledger,
  marketData,
  onTrade,
  onDecision,
  onAsset,
  onNewTrade,
  onNewDecision,
  onSaveSession,
  archive = false,
}) {
  const today = todayBerlin(),
    currentSunday = sundayOf(today);
  const [date, setDate] = useState(currentSunday),
    [tab, setTab] = useState(archive ? "archive" : "session"),
    [owner, setOwner] = useState("all"),
    [query, setQuery] = useState(""),
    [status, setStatus] = useState("all"),
    [message, setMessage] = useState("");
  const session = state.weeklySessions.find((s) => s.date === date);
  const [goal, setGoal] = useState(session?.goal || ""),
    [notes, setNotes] = useState(session?.notes || "");
  useEffect(() => {
    setGoal(session?.goal || "");
    setNotes(session?.notes || "");
    setMessage("");
  }, [date, session?.goal, session?.notes]);
  useDecisionResults(
    state.decisions,
    marketData,
    state.settings.isinPricesEnabled,
  );
  const historyRows = JSON.stringify([
    ...new Map(
      state.accounts
        .flatMap((a) =>
          a.positions
            .filter(
              (p) =>
                (p.marketConfirmed && p.marketSymbol) ||
                (state.settings.isinPricesEnabled && p.isin),
            )
            .map((p) => ({ key: marketKey(p), name: p.name })),
        )
        .map((row) => [row.key, row]),
    ).values(),
  ]);
  useEffect(() => {
    let active = true,
      index = 0;
    const rows = JSON.parse(historyRows);
    async function worker() {
      while (active && index < rows.length) {
        const row = rows[index++];
        await marketData.load(row.key, row.name, false, true);
      }
    }
    Promise.all(Array.from({ length: Math.min(3, rows.length) }, worker));
    return () => {
      active = false;
    };
  }, [historyRows, marketData.load]);
  const decisions = state.decisions.filter((d) => d.sessionDate === date);
  const due = state.decisions.filter(
    (d) => decisionDue(d) && decisionDue(d) <= shiftDate(date, 6),
  );
  const candidates = attentionQueue(state, marketData.markets, today)
    .filter((r) => owner === "all" || r.accountId === owner)
    .slice(0, 6);
  const filtered = state.decisions
    .filter(
      (d) =>
        (owner === "all" || d.accountId === owner) &&
        (!query ||
          `${d.name} ${d.rationale}`
            .toLocaleLowerCase()
            .includes(query.toLocaleLowerCase())) &&
        (status === "all" ||
          (status === "active" ? !!decisionDue(d) : !decisionDue(d))),
    )
    .slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const dates = [
    ...new Set([
      currentSunday,
      ...state.weeklySessions.map((s) => s.date),
      ...state.decisions.map((d) => d.sessionDate),
      ...Array.from({ length: 12 }, (_, i) =>
        shiftDate(currentSunday, -7 * (i + 1)),
      ),
    ]),
  ]
    .sort()
    .reverse();
  function save(close = false) {
    try {
      const now = new Date().toISOString();
      onSaveSession({
        id: date,
        date,
        goal,
        notes,
        status: close ? "closed" : "draft",
        createdAt: session?.createdAt || now,
        closedAt: close ? now : null,
      });
      setMessage(
        close
          ? "یادداشت جلسه نهایی شد؛ پیگیری تصمیم‌ها ادامه دارد."
          : "جلسه ذخیره شد.",
      );
      return true;
    } catch (error) {
      setMessage(error.message);
      return false;
    }
  }
  function newDecision(accountId, positionId) {
    if (
      session?.status !== "closed" &&
      (goal !== (session?.goal || "") || notes !== (session?.notes || "")) &&
      !save()
    )
      return;
    onNewDecision(accountId, positionId);
  }
  const xtbPlans = state.trades.filter((t) => {
    const date = nextReviewDate(t);
    return date && date <= today;
  });
  return (
    <div className={styles.root}>
      <div className={styles.toolbar}>
        <label className={styles.field}>
          هفته از یکشنبه
          <select
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setTab("session");
            }}
          >
            {dates.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </label>
        <div className={styles.actions}>
          {date !== currentSunday && (
            <button type="button" onClick={() => setDate(currentSunday)}>
              هفته جاری
            </button>
          )}
          <button
            type="button"
            disabled={marketData.batch.running || !marketData.symbolCount}
            onClick={marketData.refreshAll}
          >
            {marketData.batch.running
              ? "دریافت قیمت‌ها…"
              : "به‌روزرسانی قیمت‌ها"}
          </button>
          <button
            type="button"
            className={styles.primary}
            disabled={date !== currentSunday}
            onClick={() => newDecision()}
          >
            ثبت تصمیم
          </button>
        </div>
      </div>
      <div className={styles.tabs} role="tablist" aria-label="مرور یکشنبه">
        {[
          ["session", "جلسه این یکشنبه"],
          ["archive", "تصمیم‌ها و نتیجه‌ها"],
          ["history", "جلسه‌های قبلی"],
        ].map(([key, label]) => (
          <button
            key={key}
            role="tab"
            type="button"
            aria-selected={tab === key}
            onClick={() => setTab(key)}
          >
            {label}
          </button>
        ))}
      </div>
      {tab === "session" && (
        <>
          <section className={styles.panel}>
            <div className={styles.grid}>
              <label className={styles.field}>
                هدف این هفته
                <input
                  value={goal}
                  maxLength={1000}
                  onChange={(e) => setGoal(e.target.value)}
                  readOnly={session?.status === "closed"}
                  placeholder="این هفته درباره چه چیزی تصمیم می‌گیرم؟"
                />
              </label>
              <label className={styles.field}>
                یادداشت جلسه
                <textarea
                  className={styles.compact}
                  value={notes}
                  maxLength={4000}
                  onChange={(e) => setNotes(e.target.value)}
                  readOnly={session?.status === "closed"}
                />
              </label>
            </div>
            {session?.status === "closed" && (
              <p className={styles.closed}>
                جلسه پایان یافته · <bdi>{session.closedAt.slice(0, 10)}</bdi>
              </p>
            )}
          </section>
          <section className={styles.panel}>
            <h2>بازبینی‌های این هفته</h2>
            <DecisionRows
              decisions={due}
              {...{ state, ledger, marketData, onDecision }}
            />
            {xtbPlans.map((t) => (
              <div className={styles.heading} key={t.id}>
                <span dir="auto">
                  {t.plan.name} · XTB ·{" "}
                  {t.ownerId
                    ? state.accounts.find((a) => a.id === t.ownerId)?.owner
                    : "مالک تعیین نشده"}
                </span>
                <button type="button" onClick={() => onTrade(t.id)}>
                  بازبینی برنامه
                </button>
              </div>
            ))}
          </section>
          <section className={styles.panel}>
            <div className={styles.heading}>
              <h2>برای تصمیم این هفته</h2>
              <select
                aria-label="حساب موارد قابل بررسی"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
              >
                <option value="all">همه حساب‌ها</option>
                {state.accounts.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.owner}
                  </option>
                ))}
              </select>
            </div>
            {candidates.length ? (
              <div className={styles.scroll}>
                <table>
                  <thead>
                    <tr>
                      <th>دارایی / حساب</th>
                      <th>تغییر هفتگی قیمت</th>
                      <th>دلیل توجه</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {candidates.map((r) => (
                      <tr key={`${r.accountId}:${r.positionId}`}>
                        <td>
                          <button
                            type="button"
                            onClick={() => onAsset(r.accountId, r.positionId)}
                            dir="auto"
                          >
                            {r.name}
                          </button>
                          <small>{r.owner}</small>
                        </td>
                        <td>
                          <bdi>
                            {r.movement
                              ? percent(r.movement.nativePercent)
                              : "—"}
                          </bdi>
                        </td>
                        <td>
                          {r.reasons.map((reason, i) => (
                            <p key={i}>{reason.text}</p>
                          ))}
                        </td>
                        <td>
                          <button
                            type="button"
                            disabled={date !== currentSunday}
                            onClick={() =>
                              newDecision(r.accountId, r.positionId)
                            }
                          >
                            ثبت تصمیم
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className={styles.empty}>
                فعلاً موردی برای بررسی نمایش داده نشده است.
              </p>
            )}
            <div className={styles.actions}>
              <button type="button" onClick={onNewTrade}>
                برنامه معاملاتی XTB
              </button>
            </div>
          </section>
          <section className={styles.panel}>
            <h2>تصمیم‌های این جلسه</h2>
            <DecisionRows
              decisions={decisions}
              {...{ state, ledger, marketData, onDecision }}
            />
          </section>
          <div className={styles.actions}>
            {session?.status !== "closed" && (
              <>
                <button
                  type="button"
                  className={styles.primary}
                  onClick={() => save()}
                >
                  ذخیره جلسه
                </button>
                <button type="button" onClick={() => save(true)}>
                  پایان جلسه
                </button>
              </>
            )}
            {message && <span role="status">{message}</span>}
          </div>
        </>
      )}
      {tab === "archive" && (
        <>
          <div className={styles.actions}>
            <input
              aria-label="جست‌وجوی تصمیم"
              placeholder="جست‌وجوی دارایی یا دلیل…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <select
              aria-label="حساب تصمیم‌ها"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
            >
              <option value="all">همه حساب‌ها</option>
              {state.accounts.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.owner}
                </option>
              ))}
            </select>
            <select
              aria-label="وضعیت پیگیری"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="all">همه تصمیم‌ها</option>
              <option value="active">در حال پیگیری</option>
              <option value="closed">پایان پیگیری</option>
            </select>
          </div>
          <section className={styles.panel}>
            <DecisionRows
              decisions={filtered}
              {...{ state, ledger, marketData, onDecision }}
            />
          </section>
          {state.trades.length > 0 && (
            <section className={styles.panel}>
              <h2>برنامه‌های معاملاتی XTB</h2>
              {state.trades
                .filter((t) => owner === "all" || t.ownerId === owner)
                .map((t) => (
                  <div className={styles.heading} key={t.id}>
                    <span dir="auto">
                      {t.plan.name} · {t.plan.planDate} · نتیجه خروج‌ها:{" "}
                      <bdi>
                        {tradePosition(t).hasRealized
                          ? signedMoney(tradePosition(t).netResultCents)
                          : "—"}
                      </bdi>
                    </span>
                    <button type="button" onClick={() => onTrade(t.id)}>
                      برنامه و سابقه
                    </button>
                  </div>
                ))}
            </section>
          )}
        </>
      )}
      {tab === "history" && (
        <section className={styles.panel}>
          <h2>جلسه‌های قبلی</h2>
          {dates
            .filter(
              (d) =>
                state.weeklySessions.some((s) => s.date === d) ||
                state.decisions.some((item) => item.sessionDate === d),
            )
            .map((d) => {
              const item = state.weeklySessions.find((s) => s.date === d);
              return (
                <article className={styles.heading} key={d}>
                  <div>
                    <strong>
                      <bdi>{d}</bdi>
                    </strong>
                    <p>{item?.goal || "مرور تصمیم‌های این هفته"}</p>
                    <small>
                      {
                        state.decisions.filter((item) => item.sessionDate === d)
                          .length
                      }{" "}
                      تصمیم ·{" "}
                      {item?.status === "closed"
                        ? "پایان یافته"
                        : "در حال تکمیل"}
                    </small>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setDate(d);
                      setTab("session");
                    }}
                  >
                    باز کردن جلسه
                  </button>
                </article>
              );
            })}
          {!state.weeklySessions.length && !state.decisions.length && (
            <p className={styles.empty}>
              اولین جلسه را ذخیره کن تا اینجا بماند.
            </p>
          )}
        </section>
      )}
    </div>
  );
}
