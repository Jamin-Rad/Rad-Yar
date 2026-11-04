"use client";
import { useState } from "react";
import { DECISION_ACTIONS, todayBerlin } from "@/lib/investments/family.mjs";
import { sundayOf } from "@/lib/investments/sunday-state.mjs";
import { shiftDate } from "@/lib/investments/period-profit.mjs";
import {
  captureDecisionBaseline,
  decisionResult,
  decisionCheckpoints,
} from "@/lib/investments/decision-results.mjs";
import { marketForPosition } from "@/lib/investments/market.mjs";
import {
  signedMoney,
  percent,
  parseMoney,
} from "@/lib/investments/portfolio.mjs";
import { JournalDialog } from "./TradeDialogs";
import DecisionConsultation from "./DecisionConsultation";
import useDecisionResults from "./useDecisionResults";
import styles from "./SundayReview.module.css";
export function DecisionDialog({
  state,
  ledger,
  marketData,
  accountId,
  positionId,
  onClose,
  onSave,
}) {
  const [owner, setOwner] = useState(accountId || state.accounts[0].id),
    [asset, setAsset] = useState(positionId || ""),
    [broker, setBroker] = useState("tr"),
    [error, setError] = useState(""),
    [name, setName] = useState(""),
    [action, setAction] = useState("hold"),
    [rationale, setRationale] = useState(""),
    [invalidation, setInvalidation] = useState(""),
    [success, setSuccess] = useState(""),
    [reviewDate, setReviewDate] = useState(shiftDate(todayBerlin(), 7)),
    [chat, setChat] = useState({ answer: "", prompt: "" });
  const account = state.accounts.find((a) => a.id === owner),
    position = account.positions.find((p) => p.id === asset);
  const baseline =
    broker === "tr"
      ? captureDecisionBaseline(
          position,
          marketData.markets,
          ledger.loaded
            ? ledger.transactions.filter((t) => t.accountId === owner)
            : null,
        )
      : null;
  const candidate = {
    broker,
    accountId: owner,
    name: broker === "tr" ? position?.name || "دارایی انتخاب نشده" : name,
    action: DECISION_ACTIONS[action],
    rationale,
    invalidation,
    successCriterion: success,
    reviewDate,
    planDate: todayBerlin(),
    baseline,
  };
  function submit(event) {
    event.preventDefault();
    if (broker === "tr" && !position) {
      setError("یک دارایی را انتخاب کن.");
      return;
    }
    try {
      const now = new Date().toISOString();
      onSave({
        ...candidate,
        id: crypto.randomUUID(),
        positionId: broker === "tr" ? position.id : crypto.randomUUID(),
        action,
        sessionDate: sundayOf(todayBerlin()),
        createdAt: now,
        baselineQuantity: baseline?.quantity || null,
        baselineValueCents: baseline?.valueCents ?? null,
        baselineDate: baseline?.asOf.slice(0, 10) || null,
        chatPrompt: chat.prompt,
        chatResponse: chat.answer,
        reviews: [],
      });
    } catch (err) {
      setError(err.message);
    }
  }
  return (
    <JournalDialog
      className={styles.dialog}
      title="ثبت تصمیم این هفته"
      onClose={onClose}
      onSubmit={submit}
      error={error}
    >
      <div className={styles.root}>
        <div className={styles.grid}>
          <label className={styles.field}>
            نوع حساب
            <select
              value={broker}
              onChange={(e) => {
                setBroker(e.target.value);
                setAsset("");
                if (
                  e.target.value === "xtb" &&
                  !["self", "fatemeh"].includes(owner)
                )
                  setOwner("self");
              }}
            >
              <option value="tr">Trade Republic</option>
              <option value="xtb">XTB</option>
            </select>
          </label>
          <label className={styles.field}>
            حساب
            <select
              value={owner}
              onChange={(e) => {
                setOwner(e.target.value);
                setAsset("");
              }}
            >
              {state.accounts
                .filter(
                  (a) => broker === "tr" || ["self", "fatemeh"].includes(a.id),
                )
                .map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.owner}
                  </option>
                ))}
            </select>
          </label>
        </div>
        {broker === "tr" ? (
          <label className={styles.field}>
            دارایی
            <select
              required
              value={asset}
              onChange={(e) => setAsset(e.target.value)}
            >
              <option value="">انتخاب دارایی</option>
              {account.positions.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>
        ) : (
          <label className={styles.field}>
            نماد یا موضوع تصمیم
            <input
              required
              value={name}
              maxLength={160}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثلاً نماد معامله یا توقف معامله در این هفته"
            />
          </label>
        )}
        <label className={styles.field}>
          تصمیم من
          <select value={action} onChange={(e) => setAction(e.target.value)}>
            {Object.entries(DECISION_ACTIONS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.field}>
          دلیل تصمیم
          <textarea
            required
            maxLength={1000}
            rows={3}
            value={rationale}
            onChange={(e) => setRationale(e.target.value)}
          />
        </label>
        <label className={styles.field}>
          از کجا بفهمم تصمیم درست بوده؟
          <textarea
            required
            maxLength={1000}
            rows={2}
            value={success}
            onChange={(e) => setSuccess(e.target.value)}
          />
        </label>
        <label className={styles.field}>
          چه چیزی نظرم را تغییر می‌دهد؟
          <textarea
            required
            maxLength={1000}
            rows={2}
            value={invalidation}
            onChange={(e) => setInvalidation(e.target.value)}
          />
        </label>
        <label className={styles.field}>
          اولین بازبینی
          <input
            type="date"
            value={reviewDate}
            onChange={(e) => setReviewDate(e.target.value)}
            min={todayBerlin()}
            required
            dir="ltr"
          />
        </label>
        {broker === "tr" && position && (
          <p className={styles.muted}>
            {baseline ? (
              <>
                قیمت مبنا: <bdi>{baseline.price} EUR</bdi> ·{" "}
                <bdi>{baseline.asOf}</bdi>
              </>
            ) : (
              "قیمت یا تعداد معتبر فعلاً در دسترس نیست؛ نتیجه خودکار این تصمیم قابل سنجش نخواهد بود."
            )}
          </p>
        )}
        <DecisionConsultation
          decision={candidate}
          owner={account.owner}
          news={
            position
              ? marketForPosition(position, marketData.markets)?.news
              : []
          }
          answer={chat.answer}
          onAnswer={(answer, prompt) => setChat({ answer, prompt })}
        />
      </div>
    </JournalDialog>
  );
}
export function decisionDue(decision) {
  return decision.reviews.length
    ? decision.reviews.at(-1).nextReviewDate
    : decision.reviewDate;
}
export function DecisionReviewDialog({
  decision,
  state,
  ledger,
  marketData,
  onClose,
  onSave,
}) {
  const [error, setError] = useState(""),
    [chat, setChat] = useState({ answer: "", prompt: "" });
  const measured = decisionResult(
    decision,
    ledger.loaded ? ledger.transactions : null,
    marketData.markets,
  );
  function submit(event) {
    event.preventDefault();
    const f = new FormData(event.currentTarget);
    try {
      const manual = decision.broker === "xtb";
      const actual = manual
        ? parseMoney(f.get("actualOutcome") || "", true)
        : measured.actualOutcomeCents;
      if (manual && actual != null && !String(f.get("evidence") || "").trim())
        throw Error("برای نتیجه XTB، مبنای گزارش بروکر را بنویس.");
      onSave({
        id: crypto.randomUUID(),
        date: todayBerlin(),
        recordedAt: new Date().toISOString(),
        thesisValid: f.get("thesisValid"),
        followedPlan: f.get("followedPlan"),
        note: String(f.get("note")),
        chatResponse: chat.answer,
        chatPrompt: chat.prompt,
        nextReviewDate: f.get("nextReviewDate") || null,
        actualOutcomeCents: actual,
        noActionOutcomeCents: manual ? null : measured.noActionOutcomeCents,
        evidence: manual
          ? String(f.get("evidence") || "")
          : "اثر قیمت و خریدوفروش خالص از مبنای تصمیم؛ بدون سود نقدی و بهره",
        measurement: measured,
      });
    } catch (err) {
      setError(err.message);
    }
  }
  return (
    <JournalDialog
      className={styles.dialog}
      title={`بازبینی ${decision.name}`}
      onClose={onClose}
      onSubmit={submit}
      error={error}
    >
      <div className={styles.root}>
        <p className={styles.note}>{decision.rationale}</p>
        <ResultMetrics result={measured} />
        <div className={styles.grid}>
          <label className={styles.field}>
            دلیل اولیه هنوز معتبر است؟
            <select name="thesisValid" defaultValue="uncertain">
              <option value="uncertain">هنوز مشخص نیست</option>
              <option value="yes">بله</option>
              <option value="no">خیر</option>
            </select>
          </label>
          <label className={styles.field}>
            تصمیم را اجرا کردم؟
            <select name="followedPlan" defaultValue="uncertain">
              <option value="uncertain">بخشی از آن / نامشخص</option>
              <option value="yes">بله</option>
              <option value="no">خیر</option>
            </select>
          </label>
        </div>
        <label className={styles.field}>
          نتیجه بررسی و تصمیم بعدی
          <textarea name="note" required maxLength={1000} rows={4} />
        </label>
        {decision.broker === "xtb" && (
          <>
            <label className={styles.field}>
              نتیجه خالص تحقق‌یافته از این تصمیم (€)، اختیاری
              <input name="actualOutcome" inputMode="decimal" dir="ltr" />
            </label>
            <label className={styles.field}>
              مبنای گزارش بروکر
              <textarea name="evidence" maxLength={2000} rows={2} />
            </label>
          </>
        )}
        <label className={styles.field}>
          بازبینی بعدی
          <input
            name="nextReviewDate"
            type="date"
            dir="ltr"
            min={todayBerlin()}
            defaultValue={shiftDate(todayBerlin(), 7)}
          />
          <small>برای پایان پیگیری، تاریخ را پاک کن.</small>
        </label>
        <div className={styles.actions}>
          <span className={styles.muted}>
            بازبینی یک‌ماهه از تصمیم:{" "}
            <bdi>{shiftDate(decision.planDate, 30)}</bdi>
          </span>
        </div>
        <DecisionConsultation
          decision={{ ...decision, action: DECISION_ACTIONS[decision.action] }}
          owner={state.accounts.find((a) => a.id === decision.accountId)?.owner}
          measurement={measured}
          news={
            decision.baseline
              ? marketData.markets["ISIN:" + decision.baseline.isin]?.news
              : []
          }
          answer={chat.answer}
          onAnswer={(answer, prompt) => setChat({ answer, prompt })}
        />
      </div>
    </JournalDialog>
  );
}
function ResultMetrics({ result }) {
  return (
    <>
      <div className={styles.grid}>
        <div className={styles.metric}>
          <span>حرکت قیمت دارایی پس از تصمیم</span>
          <strong>
            {result.pricePercent == null ? "—" : percent(result.pricePercent)}
          </strong>
        </div>
        <div className={styles.metric}>
          <span>اثر قیمت و خریدوفروش ثبت‌شده</span>
          <strong>{signedMoney(result.actualOutcomeCents)}</strong>
        </div>
      </div>
      {result.issue && <p className={styles.muted}>{result.issue}</p>}
    </>
  );
}
export default function DecisionWorkspace({
  decision,
  state,
  ledger,
  marketData,
  onReview,
  onAsset,
}) {
  useDecisionResults([decision], marketData, state.settings.isinPricesEnabled);
  const owner = state.accounts.find((a) => a.id === decision.accountId)?.owner,
    verdicts = { yes: "بله", no: "خیر", uncertain: "هنوز مشخص نیست" };
  const result = decisionResult(
      decision,
      ledger.loaded ? ledger.transactions : null,
      marketData.markets,
    ),
    checkpoints = decisionCheckpoints(
      decision,
      ledger.loaded ? ledger.transactions : null,
      marketData.markets,
    );
  return (
    <div className={styles.root}>
      <section className={styles.panel}>
        <div className={styles.heading}>
          <div>
            <h2 dir="auto">{decision.name}</h2>
            <p>
              {decision.broker === "xtb" ? "XTB" : "Trade Republic"} · {owner} ·{" "}
              {DECISION_ACTIONS[decision.action]} ·{" "}
              <bdi>{decision.planDate}</bdi>
            </p>
          </div>
          <div className={styles.actions}>
            <button className={styles.primary} type="button" onClick={onReview}>
              ثبت بازبینی
            </button>
            {decision.broker !== "xtb" &&
              state.accounts
                .find((a) => a.id === decision.accountId)
                ?.positions.some((p) => p.id === decision.positionId) && (
                <button
                  type="button"
                  onClick={() =>
                    onAsset(decision.accountId, decision.positionId)
                  }
                >
                  پرونده دارایی
                </button>
              )}
          </div>
        </div>
        <ResultMetrics result={result} />
        <p className={styles.muted}>
          از زمان ثبت تصمیم؛ شامل خریدوفروش‌های ثبت‌شده و هزینه‌های خالص آن‌ها،
          بدون سود نقدی و بهره.
        </p>
        {result.priceAsOf && (
          <p className={styles.muted}>
            قیمت پایان: <bdi>{result.priceAsOf}</bdi> · {result.source} ·{" "}
            {result.tradeCount} معامله
          </p>
        )}
        <div className={styles.scroll}>
          <table>
            <thead>
              <tr>
                <th>زمان سنجش</th>
                <th>اثر قیمت</th>
                <th>بدون خریدوفروش</th>
                <th>با خریدوفروش ثبت‌شده</th>
                <th>تفاوت دو حالت</th>
              </tr>
            </thead>
            <tbody>
              {[
                { label: "تا امروز", ...result },
                ...checkpoints.map((r) => ({
                  ...r,
                  label: r.days === 7 ? "یک هفته بعد" : "یک ماه بعد",
                })),
              ].map((r) => (
                <tr key={r.label}>
                  <td>
                    {r.label}
                    <small>
                      <bdi>{r.date}</bdi>
                    </small>
                    {r.issue && <small>{r.issue}</small>}
                  </td>
                  <td>
                    <bdi>
                      {r.pricePercent == null ? "—" : percent(r.pricePercent)}
                    </bdi>
                  </td>
                  <td>
                    <bdi>{signedMoney(r.noActionOutcomeCents)}</bdi>
                  </td>
                  <td>
                    <bdi>{signedMoney(r.actualOutcomeCents)}</bdi>
                  </td>
                  <td>
                    <bdi>
                      {signedMoney(
                        r.actualOutcomeCents != null &&
                          r.noActionOutcomeCents != null
                          ? r.actualOutcomeCents - r.noActionOutcomeCents
                          : null,
                      )}
                    </bdi>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className={styles.panel}>
        <h2>تصمیم اولیه</h2>
        <h3>دلیل</h3>
        <p>{decision.rationale}</p>
        <h3>معیار موفقیت</h3>
        <p>{decision.successCriterion || "در تصمیم قدیمی ثبت نشده است."}</p>
        <h3>شرط تغییر نظر</h3>
        <p>{decision.invalidation}</p>
        {decision.baseline && (
          <p className={styles.muted}>
            مبنا:{" "}
            <bdi>
              {decision.baseline.quantity} × {decision.baseline.price} EUR
            </bdi>{" "}
            · <bdi>{decision.baseline.asOf}</bdi> · {decision.baseline.source}
          </p>
        )}
        {decision.chatResponse && (
          <details>
            <summary>مشورت اولیه با ChatGPT</summary>
            <pre>{decision.chatResponse}</pre>
            {decision.chatPrompt && (
              <details>
                <summary>سؤال اولیه</summary>
                <pre>{decision.chatPrompt}</pre>
              </details>
            )}
          </details>
        )}
        <DecisionConsultation
          decision={{ ...decision, action: DECISION_ACTIONS[decision.action] }}
          owner={owner}
          measurement={result}
          news={
            decision.baseline
              ? marketData.markets["ISIN:" + decision.baseline.isin]?.news
              : []
          }
        />
      </section>
      <section className={styles.panel}>
        <div className={styles.heading}>
          <h2>مسیر تصمیم و نتیجه‌ها</h2>
          <span className={styles.muted}>
            بازبینی بعدی: <bdi>{decisionDue(decision) || "پایان پیگیری"}</bdi>
          </span>
        </div>
        {decision.reviews.length ? (
          <div className={styles.history}>
            {decision.reviews.map((r) => (
              <article key={r.id}>
                <strong>
                  <bdi>{r.date}</bdi>
                </strong>
                <p className={styles.muted}>
                  دلیل معتبر: {verdicts[r.thesisValid]} · اجرا:{" "}
                  {verdicts[r.followedPlan]}
                </p>
                <p>{r.note}</p>
                <p>
                  نتیجه ثبت‌شده: <bdi>{signedMoney(r.actualOutcomeCents)}</bdi>{" "}
                  · بدون تغییر: <bdi>{signedMoney(r.noActionOutcomeCents)}</bdi>
                </p>
                {r.measurement?.issue && (
                  <p className={styles.muted}>{r.measurement.issue}</p>
                )}
                {r.evidence && <p className={styles.muted}>{r.evidence}</p>}
                {r.measurement?.priceAsOf && (
                  <p className={styles.muted}>
                    منبع سنجش: {r.measurement.source} ·{" "}
                    <bdi>{r.measurement.priceAsOf}</bdi>
                  </p>
                )}
                {r.chatResponse && (
                  <details>
                    <summary>گفت‌وگوی این بازبینی با ChatGPT</summary>
                    <pre>{r.chatResponse}</pre>
                    {r.chatPrompt && (
                      <details>
                        <summary>سؤال این بازبینی</summary>
                        <pre>{r.chatPrompt}</pre>
                      </details>
                    )}
                  </details>
                )}
              </article>
            ))}
          </div>
        ) : (
          <p className={styles.empty}>
            اولین بازبینی: <bdi>{decision.reviewDate}</bdi>
          </p>
        )}
      </section>
    </div>
  );
}
