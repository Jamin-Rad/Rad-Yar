import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  let dbTest = null
  let dbError = null
  if (url && key) {
    try {
      const client = createClient(url, key, { auth: { persistSession: false } })
      const { count, error } = await client.from('fachgebiete').select('id', { count: 'exact', head: true })
      if (error) dbError = error.message
      else dbTest = count
    } catch (e) {
      dbError = e.message
    }
  }

  return NextResponse.json({
    supabaseUrl: !!url,
    serviceRoleKey: !!key,
    serviceRoleKeyPrefix: key?.slice(0, 15) + '...',
    anonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    dbConnected: dbTest !== null,
    dbRowCount: dbTest,
    dbError,
  })
}
