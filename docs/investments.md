# Private investment workspace

`/andarun/investments` uses the existing Andarun session. Its state and market API routes require the same session and return private, non-cacheable responses.

## Data and storage

- Run `supabase/migrations/0020_andarun_investments.sql` against the app's configured project before first use. The connected project already has this table.
- Only server-side `service_role` access is granted. RLS is enabled and there are deliberately no public/client policies.
- Personal initial holdings are stored in the private database, not source code. A fresh, unconfigured installation starts empty.
- State version 3 reads legacy versions 1 and 2. Browser drafts are migrated without deleting legacy copies. A local draft survives network failure, and server writes use optimistic revision checks.
- Changes save automatically after a submitted edit. A conflicting server revision blocks replacement and offers a draft download.
- Original trade plans, investment decisions, fills, reviews and dated snapshots cannot be rewritten or removed through the API. Corrections belong in a new review.
- Full JSON backups include all accounts, history, decisions, events and XTB records. Keep these files private. CSV imports update only the chosen account, require EUR values and preview before applying; transaction statements and PDFs are not parsed as holdings.

## Market data

The server fetches reference quotes and daily history from Yahoo Finance's public endpoints, FX reference rates from Frankfurter, and news titles/links from Google News RSS. No provider key is required. These public endpoints are not a licensed streaming feed and may change, throttle or fail; failed refreshes do not overwrite broker values. A licensed provider can replace `market.server.js` later.

The user explicitly matches a provider symbol and exchange to the broker instrument. ISIN format/checksum validation helps identify input errors, but does not certify ownership or a provider mapping. Unconfirmed mappings do not enter monetary movement calculations.

Week/month estimates apply current quantity to reference price changes with historical/current FX, not actual investment returns. Cash flows, trades, dividends and costs are excluded. Periods with share splits suppress the estimate. Quotes older than four days receive a freshness warning. The attention queue explains its thresholds (5% native movement or estimated 0.5% of recorded portfolio value); keyword news flags need human review.

## Manual refresh, charts, and visit changes

The global refresh button requests all distinct confirmed portfolio symbols with at most three concurrent requests. `refresh=1` bypasses the browser and server's normal 15-minute quote/news/latest-FX cache; a 15-second server cooldown coalesces rapid repeated clicks. Failed requests keep the previous displayed data and expose the failed instruments. The request completion time is separate from the provider's actual quote time, which can remain unchanged while a market is closed. XTB plans are not automatically valued from stock quotes.

Each holding can store a separately confirmed `tradingViewSymbol` including its exchange, such as `NASDAQ:AAPL`. Yahoo symbols are never guessed into TradingView mappings. Changing a holding's name/ISIN clears this mapping. The official Advanced Chart embed is loaded only on request in an isolated sandbox, with a direct TradingView chart link available independently. Only the public instrument symbol is provided, not quantities or account values. TradingView chart availability and delay depend on the market; an existing personal subscription does not turn the widget into a quote API or synchronize personal saved layouts.

The account overview and weekly review show changes since the previous visit in the **same browser**, using a private localStorage checkpoint (`andarun:investments:visit:v1`). The in-session baseline remains fixed during price refreshes. Leaving/hiding the page prepares the next visit's checkpoint; the explicit reviewed button adopts a new baseline immediately. SPA navigation also saves a checkpoint. An unloaded quote retains its earlier matching baseline rather than erasing it during a short visit. This checkpoint is not a confirmed broker snapshot and is not synced across devices or included in portfolio JSON exports.

Comparisons use provider quote timestamps and current quantities, with both checkpoint/current EUR FX rates. Changed mappings/ISINs/currencies, backward timestamps, splits and quotes older than four days suppress misleading comparisons. Missing FX suppresses only the EUR estimate. Important-news candidates must be newly published after the checkpoint and absent from the previously seen URLs; the source covers at most the past 14 days. Due family and XTB decisions link to the weekly queue.

## Decisions and XTB

Trade Republic decisions are linked to their account and holding. Reviews preserve the original reasoning and can store the user's pasted ChatGPT response and explicitly documented actual/no-action outcomes. No ChatGPT API call or automatic order submission occurs.

XTB supports multiple actual entry/exit fills, exact quantities to eight decimal places, partial exits, and remaining-volume validation. Realized EUR results come from broker records; CFD multipliers and fees are never inferred from spot-price differences. The risk panel sums manually entered planned loss budgets for open plans; it is not an actual or guaranteed loss calculation.

## Checks

Run `node --test lib/investments/*.test.mjs`. Fixtures are synthetic. Verify auth, server reload, stale-revision rejection, immutable plans/reviews, partial fills, CSV ownership/units and provider timestamps before releasing. Do not put QA trades or decisions in the personal owner's row.
