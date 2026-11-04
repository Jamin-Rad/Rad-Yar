import { positionBalance, euroProductCents } from "./balances.mjs";
import { marketForPosition, marketTrusted } from "./market.mjs";
import { historicalPrice } from "./history-coverage.mjs";
import { ledgerUnits, ledgerQuantity } from "./ledger.mjs";
import { todayBerlin } from "./family.mjs";
import { shiftDate } from "./period-profit.mjs";
const DAY = 86400000;
export function captureDecisionBaseline(
  position,
  markets,
  transactions,
  now = Date.now(),
) {
  if (!position || !Array.isArray(transactions)) return null;
  const value = positionBalance(position, markets, now),
    market = marketForPosition(position, markets);
  if (
    !value.quantityKnown ||
    value.marketValueCents == null ||
    !position.isin ||
    market?.identity?.isin !== position.isin ||
    market?.quote?.currency !== "EUR" ||
    !Number.isFinite(market.quote.price) ||
    market.quote.price <= 0
  )
    return null;
  return {
    isin: position.isin,
    quantity: position.quantity,
    price: market.quote.price,
    currency: "EUR",
    valueCents: value.marketValueCents,
    asOf: market.quote.asOf,
    source: market.quote.source || "",
    transactionIds: transactions
      .filter((t) => t.isin === position.isin)
      .map((t) => t.id),
  };
}
function marketForBaseline(baseline, markets) {
  return (
    markets["ISIN:" + baseline.isin] ||
    Object.values(markets).find((m) => m?.identity?.isin === baseline.isin)
  );
}
function priceFor(baseline, markets, date, now) {
  const market = marketForBaseline(baseline, markets);
  if (
    !marketTrusted({ isin: baseline.isin }, market) ||
    market?.quote?.currency !== "EUR" ||
    !Number.isFinite(market.quote.price) ||
    market.quote.price <= 0
  )
    return null;
  if (date !== todayBerlin(now)) {
    const historical = historicalPrice(market, date, now);
    return historical
      ? {
          price: historical.price,
          asOf: historical.asOf,
          source: market.quote.source || "Onvista",
        }
      : null;
  }
  const time = Date.parse(market.quote.asOf);
  return Number.isFinite(time) && time <= now + 300000 && now - time <= 7 * DAY
    ? {
        price: market.quote.price,
        asOf: market.quote.asOf,
        source: market.quote.source || "",
      }
    : null;
}
export function decisionResult(
  decision,
  transactions,
  markets,
  date = todayBerlin(),
  now = Date.now(),
) {
  const result = {
    date,
    evaluatedAt: new Date(now).toISOString(),
    priceAsOf: "",
    source: "",
    pricePercent: null,
    actualOutcomeCents: null,
    noActionOutcomeCents: null,
    tradeCount: 0,
    issue: "",
  };
  const b = decision.baseline;
  if (date > todayBerlin(now)) {
    return { ...result, issue: "هنوز موعد این سنجش نرسیده است." };
  }
  if (!b)
    return {
      ...result,
      issue:
        decision.broker === "xtb"
          ? "نتیجه XTB را از گزارش بروکر در بازبینی ثبت کن."
          : "قیمت و تعداد معتبر در زمان تصمیم ثبت نشده است.",
    };
  const market = marketForBaseline(b, markets);
  if (
    market?.splits?.some((s) => s.date > b.asOf.slice(0, 10) && s.date <= date)
  )
    return {
      ...result,
      issue: "رویداد شرکتی؛ قیمت و تعداد نیازمند تطبیق است.",
    };
  if (date < decision.planDate)
    return { ...result, issue: "این تاریخ پیش از تصمیم است." };
  const candidate = priceFor(b, markets, date, now);
  const price =
    candidate && Date.parse(candidate.asOf) >= Date.parse(b.asOf)
      ? candidate
      : null;
  if (price) {
    result.priceAsOf = price.asOf;
    result.source = price.source;
    result.pricePercent = (price.price / b.price - 1) * 100;
    const holdValue = euroProductCents(b.quantity, price.price);
    result.noActionOutcomeCents =
      holdValue == null ? null : holdValue - b.valueCents;
  } else
    result.issue =
      "قیمت معتبر برای ارزش‌گذاری مانده و سناریوی بدون تغییر در دسترس نیست.";
  if (!Array.isArray(transactions))
    return { ...result, issue: "تراکنش‌ها هنوز بارگذاری نشده‌اند." };
  const ids = new Set(b.transactionIds),
    end = date === todayBerlin(now) ? now : Date.parse(date + "T23:59:59.999Z");
  const rows = transactions
    .filter(
      (t) =>
        t.accountId === decision.accountId &&
        t.isin === b.isin &&
        !ids.has(t.id) &&
        Date.parse(t.datetime) <= end,
    )
    .sort((a, c) => Date.parse(a.datetime) - Date.parse(c.datetime));
  let quantity = ledgerUnits(b.quantity),
    cash = 0,
    lastTradeTime = 0;
  for (const tx of rows) {
    if (["DIVIDEND", "DISTRIBUTION", "INTEREST_PAYMENT"].includes(tx.type))
      continue;
    if (Date.parse(tx.datetime) <= Date.parse(decision.createdAt))
      return {
        ...result,
        issue:
          "تراکنش تازه با تاریخ پیش از تصمیم ثبت شده؛ مبنا نیازمند تطبیق است.",
      };
    if (!["BUY", "SELL"].includes(tx.type)) {
      if (
        (tx.quantity != null && ledgerUnits(tx.quantity) !== 0n) ||
        [
          "SPLIT",
          "REVERSE_SPLIT",
          "SPIN_OFF",
          "MERGER",
          "WORTHLESS",
          "LIQUIDATION_PROCEEDS",
        ].includes(tx.type)
      ) {
        if (["DIVIDEND", "DISTRIBUTION"].includes(tx.type)) continue;
        return {
          ...result,
          pricePercent: null,
          noActionOutcomeCents: null,
          issue: "رویداد شرکتی؛ قیمت و تعداد نیازمند تطبیق است.",
        };
      }
      continue;
    }
    if (
      tx.quantity == null ||
      !Number.isSafeInteger(tx.cashCents) ||
      tx.currency !== "EUR" ||
      (tx.type === "BUY" && tx.cashCents >= 0) ||
      (tx.type === "SELL" && tx.cashCents <= 0)
    )
      return { ...result, issue: "تعداد یا مبلغ خالص خریدوفروش کامل نیست." };
    const units = ledgerUnits(tx.quantity),
      absolute = units < 0n ? -units : units;
    quantity += tx.type === "BUY" ? absolute : -absolute;
    cash += tx.cashCents;
    result.tradeCount++;
    lastTradeTime = Date.parse(tx.datetime);
    if (quantity < 0n)
      return {
        ...result,
        issue: "فروش ثبت‌شده از تعداد مبنا بیشتر است؛ سابقه نیازمند تطبیق است.",
      };
  }
  if (quantity > 0n && !price) return result;
  if (
    quantity > 0n &&
    lastTradeTime &&
    Date.parse(
      price.asOf.length === 10 ? price.asOf + "T23:59:59.999Z" : price.asOf,
    ) < lastTradeTime
  )
    return { ...result, issue: "قیمت پایان هنوز پیش از آخرین معامله است." };
  const endValue =
    quantity === 0n
      ? 0
      : euroProductCents(ledgerQuantity(quantity), price.price);
  result.actualOutcomeCents =
    endValue == null ? null : endValue + cash - b.valueCents;
  if (!Number.isSafeInteger(result.actualOutcomeCents))
    result.actualOutcomeCents = null;
  return result;
}
export function decisionCheckpoints(
  d,
  transactions,
  markets,
  now = Date.now(),
) {
  return [7, 30].map((days) => ({
    days,
    ...decisionResult(
      d,
      transactions,
      markets,
      shiftDate(d.planDate, days),
      now,
    ),
  }));
}
export function decisionConsultation(
  d,
  { owner = "", measurement = null, news = [] } = {},
) {
  return `برای تصمیم شخصی سرمایه‌گذاری زیر نقش منتقد را داشته باش. داده تازه را با منبع و تاریخ بررسی کن و بین واقعیت، فرض و مجهول فرق بگذار. پیشنهاد را معامله انجام‌شده فرض نکن.\nحساب: ${d.broker === "xtb" ? "XTB" : "Trade Republic"} / ${owner}\nدارایی: ${d.name}\nتاریخ ثبت: ${d.planDate}\nتصمیم پیشنهادی: ${d.action}\nدلیل: ${d.rationale}\nمعیار موفقیت: ${d.successCriterion || "هنوز تعیین نشده"}\nشرط تغییر نظر: ${d.invalidation}\nبازبینی بعدی: ${d.reviewDate}\nمبنای ثبت‌شده: ${d.baseline ? JSON.stringify(d.baseline, (key, value) => (key === "transactionIds" ? undefined : value)) : "قیمت و تعداد معتبر ثبت نشده"}\nسنجش فعلی (اثر قیمت و خریدوفروش؛ بدون سود نقدی): ${measurement ? JSON.stringify(measurement) : "هنوز سنجیده نشده"}\nخبرهای دریافت‌شده (عنوان، نه واقعیت تأییدشده):\n${
    news
      .slice(0, 5)
      .map((n) => `${n.title} | ${n.date} | ${n.url}`)
      .join("\n") || "خبری به این پرونده پیوست نشده"
  }\nسه سناریوی موافق، مخالف و بدون اقدام را بررسی کن. چه شواهدی تصمیم را رد می‌کند؟ برای بازبینی یک هفته و یک ماه دیگر، معیار قابل اندازه‌گیری بده. داده ناموجود را حدس نزن و منبع خبرها را بررسی کن.`;
}
