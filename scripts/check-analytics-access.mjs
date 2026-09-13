import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

dotenv.config({ path: '.env.local', quiet: true })

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const serverKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const browserKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
if (!url || !serverKey || !browserKey) {
  console.error('Missing Supabase URL, service role key or anonymous key.')
  process.exit(1)
}

// A NULL primary key must fail before any row is inserted. This checks the
// actual RPC permission without adding synthetic visits to production stats.
async function checkAccess(label, key, expectedCode) {
  const db = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  const { error } = await db.rpc('record_site_activity', {
    p_visitor_id: null,
    p_user_id: null,
    p_path: '/node-rads',
    p_visits: 0,
    p_page_views: 0,
    p_active_seconds: 0,
  })
  const passed = error?.code === expectedCode
  console.log(`${passed ? 'PASS' : 'FAIL'} ${label}: ${error?.code || 'unexpected success'}`)
  if (!passed) process.exitCode = 1
}

await checkAccess('Server can execute (NULL visitor rejected by table constraint)', serverKey, '23502')
await checkAccess('Anonymous browser cannot execute', browserKey, '42501')
