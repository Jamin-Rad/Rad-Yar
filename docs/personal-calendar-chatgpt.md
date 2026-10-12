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

There are deliberately no update or delete tools in the first version.
