# Personal calendar in ChatGPT Voice

This project exposes a private MCP endpoint so ChatGPT can add events to the
Andarun calendar when the user says “به تقویم شخصی اضافه کن”, “add this to my
personal calendar”, or the German equivalent.

## Server setup

1. Generate a cryptographically random token with at least 32 bytes of entropy.
2. Set it as `PERSONAL_CALENDAR_MCP_TOKEN` in the production deployment.
3. Deploy the application over HTTPS.
4. The MCP URL is:

   ```text
   https://YOUR-DOMAIN/api/personal-calendar/mcp?key=YOUR_TOKEN
   ```

The query parameter is a private capability URL for this single-user setup.
Never publish it, paste it into chat messages, or commit it. Rotate the token if
the URL is exposed. A multi-user or public release must replace this with OAuth
2.1 authorization.

## Connect in ChatGPT

1. Open ChatGPT Plugins and choose **Add custom MCP server**.
2. Name it **Personal Calendar**.
3. Paste the private MCP URL and choose **No authentication**. Authentication is
   carried by the unguessable capability URL in this personal-only setup.
4. Review the two tools and create/install the plugin.
5. Start a new Chat or Work conversation with the plugin enabled, then start
   Voice.

Suggested voice test:

> فردا ساعت ۱۰ یک ترمین به نام دندانپزشکی به تقویم شخصی اضافه کن.

ChatGPT should resolve the date in `Europe/Berlin`, confirm ambiguous or missing
details, and then call `add_personal_calendar_event`.

## Exposed tools

- `list_personal_calendar_events`: read-only schedule lookup and conflict check. The result also includes Baden-Württemberg public holidays and the statewide school-holiday periods published through summer 2030. School-specific movable holidays are not included.
- `add_personal_calendar_event`: creates one event after the date and time are
  clear. Duplicate events with the same title, date, and time are not recreated.

There are deliberately no update or delete tools.

## Personal finance and friends accounts

The same endpoint also exposes four finance tools. No new URL or token is needed:

- `list_personal_finance_entries`: recorded monthly income/expenses and existing categories (EUR). Totals exclude projected recurring charges and vacation ledgers.
- `add_personal_finance_entry`: record one EUR income/expense in `/andarun/finanz`.
- `list_friend_finance_entries`: actual account names/IDs, entries, and all-time balances in `/andarun/finanz/freunde`.
- `add_friend_finance_entry`: record one shared expense or an explicitly requested repayment. `me` means the user paid; `them` means the other party paid. EUR, rial and toman are accepted. Rial/toman entries require the transaction's exchange rate in the SAME stated unit per EUR. Toman converts to rial for website compatibility.

These tools only record ledger entries; they cannot move funds, pay a bill, delete entries, automatically settle an account or change budgets/categories. Each write requires a unique `requestId`, reused on retries only, to prevent duplicate recordings. Missing or ambiguous details must be clarified first. Concurrent writes use an atomic version check and retry; website edits preserve remotely added entries.

After deployment, refresh the **Personal Calendar — ChatGPT** connection in ChatGPT settings to discover the four new tools, and test from a new conversation. The earlier standalone **Personal Calendar** package is desktop-only; creating that package did not register the MCP with ChatGPT web.

Examples:

> امروز ۳۴٫۵۰ یورو از Aldi خرید کردم؛ در هزینه‌های شخصی، دستهٔ Lebensmittel ثبت کن.

> امروز ۵۰ یورو برای خانوادهٔ منصور مقدم پرداخت کردم؛ در حساب دوستان با شرح خرید مشترک ثبت کن.

First test with a typed or dictated message. Live Voice execution must be checked in the user's ChatGPT client; successful text execution alone does not prove live Voice support.
