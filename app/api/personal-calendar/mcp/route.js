import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js'
import { z } from 'zod'
import { safeEqual } from '@/lib/adminAuth'
import { createPersonalCalendarEvent, listPersonalCalendarEvents } from '@/lib/personalCalendar'
import { addFriendFinanceEntry, addPersonalFinanceEntry, listFriendFinanceEntries, listPersonalFinanceEntries } from '@/lib/personalFinance'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, content-type, mcp-session-id, mcp-protocol-version, last-event-id',
  'Access-Control-Expose-Headers': 'mcp-session-id, mcp-protocol-version',
}

const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD.')
const timeSchema = z.string().regex(/^\d{2}:\d{2}$/, 'Use 24-hour HH:mm.')

function isAuthorized(request) {
  const expected = process.env.PERSONAL_CALENDAR_MCP_TOKEN || ''
  const authorization = request.headers.get('authorization') || ''
  const bearer = authorization.startsWith('Bearer ') ? authorization.slice(7).trim() : ''
  const capabilityKey = new URL(request.url).searchParams.get('key') || ''
  const supplied = bearer || capabilityKey
  return Boolean(expected && supplied && safeEqual(supplied, expected))
}

function withCors(response) {
  const headers = new Headers(response.headers)
  for (const [name, value] of Object.entries(CORS_HEADERS)) headers.set(name, value)
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers })
}

function errorResult(message) {
  return {
    isError: true,
    content: [{ type: 'text', text: message }],
  }
}

function buildServer() {
  const server = new McpServer(
    { name: 'personal-calendar', version: '1.1.0' },
    {
      instructions:
        'Use this private calendar when the user says “add this to my personal calendar”, “به تقویم شخصی اضافه کن”, or an equivalent phrase. Resolve relative dates in Europe/Berlin. Before calling add_personal_calendar_event, make sure the user has clearly provided or confirmed the title, exact date, and time (or all-day status). Never guess an ambiguous date or time. Finance tools record transactions in the monthly personal budget or the separate friends ledger. Never transfer money. Confirm missing or ambiguous amounts, currency, date, account and payment direction before recording. The monthly budget is EUR only. For friends distinguish rial from toman and ask for the exchange rate instead of estimating it. Generate one unique requestId per financial entry and reuse it only when retrying the same entry. Never record the same payment in both ledgers unless explicitly requested.',
    }
  )

  server.registerTool(
    'list_personal_calendar_events',
    {
      title: 'List personal calendar events',
      description:
        'Read events from the user’s private personal calendar for an inclusive date range, including public holidays and official statewide school holidays in Baden-Württemberg. Use this to answer schedule questions or check for conflicts before adding an event.',
      inputSchema: {
        from: dateSchema.describe('First date of the inclusive range, in Europe/Berlin, formatted YYYY-MM-DD.'),
        to: dateSchema.describe('Last date of the inclusive range, in Europe/Berlin, formatted YYYY-MM-DD.'),
      },
      annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
    },
    async ({ from, to }) => {
      try {
        const events = await listPersonalCalendarEvents({ from, to })
        return {
          structuredContent: { events, timezone: 'Europe/Berlin' },
          content: [{ type: 'text', text: events.length ? `${events.length} Termin(e) gefunden.` : 'Keine Termine in diesem Zeitraum.' }],
        }
      } catch (error) {
        return errorResult(error.message)
      }
    }
  )

  server.registerTool(
    'add_personal_calendar_event',
    {
      title: 'Add to personal calendar',
      description:
        'Add one event to the user’s private personal calendar. Call only after the title, exact date, and start time or all-day status are unambiguous and the user has asked to save it. Dates and times are Europe/Berlin local time. This changes the user’s calendar.',
      inputSchema: {
        title: z.string().trim().min(1).max(240).describe('Short event title.'),
        date: dateSchema.describe('Start date in Europe/Berlin, formatted YYYY-MM-DD.'),
        startTime: timeSchema.optional().describe('Start time in Europe/Berlin using 24-hour HH:mm. Omit only for an all-day event.'),
        endTime: timeSchema.optional().describe('Optional end time using 24-hour HH:mm.'),
        allDay: z.boolean().default(false).describe('True only when the event has no specific start time.'),
        endDate: dateSchema.optional().describe('Optional inclusive end date for a multi-day all-day event.'),
        location: z.string().trim().max(240).optional().describe('Optional location.'),
        note: z.string().trim().max(500).optional().describe('Optional note or context.'),
      },
      annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
    },
    async args => {
      try {
        const result = await createPersonalCalendarEvent(args)
        const event = result.event
        const timing = event.allDay ? 'ganztägig' : `${event.startTime}${event.endTime ? `–${event.endTime}` : ''}`
        const message = result.duplicate
          ? `Der Termin „${event.title}“ war bereits am ${event.date} (${timing}) im persönlichen Kalender.`
          : `„${event.title}“ wurde am ${event.date} (${timing}) zum persönlichen Kalender hinzugefügt.`
        return {
          structuredContent: { ...result, timezone: 'Europe/Berlin' },
          content: [{ type: 'text', text: message }],
        }
      } catch (error) {
        return errorResult(error.message)
      }
    }
  )

  const financeReply = async (operation, args) => {
    try {
      const result = await operation(args)
      return { structuredContent: result, content: [{ type: 'text', text: JSON.stringify(result) }] }
    } catch (error) { return errorResult(error.message) }
  }
  const requestId = z.string().regex(/^[a-zA-Z0-9_-]{8,80}$/).describe('Generate a unique id for this recording, e.g. a UUID. Reuse the exact id on retries of this transaction only.')
  const amount = z.number().finite().positive().describe('Positive amount explicitly provided by the user. Never guess.')
  const readOnly = { readOnlyHint: true, destructiveHint: false, openWorldHint: false }
  const recordOnly = { readOnlyHint: false, destructiveHint: false, openWorldHint: false }

  server.registerTool('list_personal_finance_entries', {
    title: 'Read personal income and expenses',
    description: 'Use to read recorded monthly budget transactions and the existing categories in Finanzen/دخل‌وخرج شخصی. Totals exclude projected recurring items and vacation accounts. Dates are Gregorian Europe/Berlin.',
    inputSchema: { from: dateSchema, to: dateSchema }, annotations: readOnly,
  }, args => financeReply(listPersonalFinanceEntries, args))

  server.registerTool('add_personal_finance_entry', {
    title: 'Record personal income or expense',
    description: 'Record ONE income or expense in the personal monthly budget when the user asks to save it, including by speech/dictation. Requires clear amount, EUR currency, title and date. Read existing categories before specifying a category; leave uncategorized only when the user accepts that. Do not use for a friend debt or transfer real money. Ask about ambiguous details before calling.',
    inputSchema: {
      requestId, type: z.enum(['income', 'expense']), amount,
      currency: z.literal('eur').describe('The monthly budget stores euros only.'),
      title: z.string().trim().min(1).max(240), date: dateSchema,
      category: z.string().trim().max(120).optional().describe('Exact existing category name of the matching income/expense type. Do not invent.'),
      note: z.string().trim().max(500).optional(),
      paidByFatima: z.boolean().default(false).describe('True only if the user explicitly says Fatima paid this personal expense.'),
    }, annotations: recordOnly,
  }, args => financeReply(addPersonalFinanceEntry, args))

  server.registerTool('list_friend_finance_entries', {
    title: 'Read friends accounts and balances',
    description: 'Use for حساب‌های دوستان/Freunde. Returns the actual account ids and names, ledger entries and balances in EUR and RIAL. Positive balance means money owed to the user. Use it to resolve the person before recording. Optional date range filters entries, not the full balances.',
    inputSchema: { accountId: z.string().optional(), from: dateSchema.optional(), to: dateSchema.optional() }, annotations: readOnly,
  }, args => financeReply(listFriendFinanceEntries, args))

  server.registerTool('add_friend_finance_entry', {
    title: 'Record a friend payment or receipt',
    description: 'Record ONE shared expense/payment/receipt in a selected friends ledger. Read accounts first and use the actual accountId; clarify similar names. payer=me means the user paid and increases their credit; payer=them means the other party paid and reduces their credit. Requires explicit amount, currency, date, note and direction. For IRR or toman, ask for the rate per 1 EUR in that SAME unit; do not invent or use today’s rate. kind=settlement only for explicitly stated debt repayment. This only records an entry; it never transfers money or automatically settles a balance.',
    inputSchema: {
      requestId, accountId: z.string().min(1), payer: z.enum(['me', 'them']), amount,
      currency: z.enum(['eur', 'irr', 'toman']),
      rate: z.number().finite().positive().optional().describe('Required for irr/toman: how many units of the stated currency equal 1 EUR at this transaction.'),
      date: dateSchema, note: z.string().trim().min(1).max(500), kind: z.enum(['expense', 'settlement']),
    }, annotations: recordOnly,
  }, args => financeReply(addFriendFinanceEntry, args))

  return server
}

async function handleMcp(request) {
  if (!isAuthorized(request)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json', 'WWW-Authenticate': 'Bearer' },
    })
  }

  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true,
    maxRequestBodySize: 128 * 1024,
  })
  const server = buildServer()

  try {
    await server.connect(transport)
    return withCors(await transport.handleRequest(request))
  } catch (error) {
    console.error('[personal-calendar-mcp] request failed', error)
    return new Response(JSON.stringify({ error: 'Personal calendar MCP request failed.' }), {
      status: 500,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    })
  }
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS })
}

export const GET = handleMcp
export const POST = handleMcp
export const DELETE = handleMcp
