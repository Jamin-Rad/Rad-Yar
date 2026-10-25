import { NextResponse } from 'next/server'
import { readState } from '../app/andarun/english/courseEngine.js'

// Optimistic concurrency prevents one device silently replacing another device's progress.
export function createEnglishHandlers(requireSession, storage) {
  const json=(body,status=200)=>NextResponse.json(body,{status,headers:{'Cache-Control':'no-store'}})
  async function GET() {
    const identity=await requireSession()
    if(identity.error)return json({error:identity.error},identity.status)
    if(!storage.available)return json({error:'ذخیرهٔ آنلاین فعلاً در دسترس نیست.'},503)
    try { return json(await storage.read(identity.ownerId)) }
    catch { return json({error:'خواندن پیشرفت آنلاین انجام نشد.'},503) }
  }
  async function PUT(request) {
    const identity=await requireSession()
    if(identity.error)return json({error:identity.error},identity.status)
    if(!storage.available)return json({error:'ذخیرهٔ آنلاین فعلاً در دسترس نیست.'},503)
    let body
    try {
      const text=await request.text()
      if(text.length>200000)return json({error:'اطلاعات بیش از حد مجاز است.'},413)
      body=JSON.parse(text)
    }catch{return json({error:'درخواست معتبر نیست.'},400)}
    if(body?.state?.version!==2 || !(body.revision===null || (typeof body.revision==='string'&&/^\d{4}-\d{2}-\d{2}T/.test(body.revision))))
      return json({error:'نسخه یا شناسهٔ ذخیره معتبر نیست.'},400)
    try {
      const saved=await storage.write(identity.ownerId,readState(body.state),body.revision)
      return saved?json(saved):json({error:'نسخهٔ تازه‌تری موجود است.',...await storage.read(identity.ownerId)},409)
    }catch{return json({error:'ذخیرهٔ آنلاین انجام نشد؛ نسخهٔ محلی حفظ شده است.'},503)}
  }
  return {GET,PUT}
}
