import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js'
import { z } from 'zod'
import { safeEqual } from '@/lib/adminAuth'
import { createPersonalCalendarEvent, listPersonalCalendarEvents } from '@/lib/personalCalendar'

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
    { name: 'personal-calendar', version: '1.0.0' },
    {
      instructions:
        'Use this private calendar when the user says “add this to my personal calendar”, “به تقویم شخصی اضافه کن”, or an equivalent phrase. Resolve relative dates in Europe/Berlin. Before calling add_personal_calendar_event, make sure the user has clearly provided or confirmed the title, exact date, and time (or all-day status). Never guess an ambiguous date or time.',
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
