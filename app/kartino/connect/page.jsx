import { redirect } from 'next/navigation'
import { auth, currentUser } from '@clerk/nextjs/server'
import { getSignedInUserIdentity } from '@/lib/userIdentity'
import { db } from '@/lib/kartino/server'
export const dynamic='force-dynamic'
export default async function Connect({searchParams}) {
 const {id}=await searchParams
 if(!/^[0-9a-f-]{36}$/i.test(id||''))return <main style={{padding:40}}>This connection request is invalid. Start again from Kartino Settings.</main>
 const {userId,redirectToSignIn}=await auth()
 if(!userId)return redirectToSignIn({returnBackUrl:'/kartino/connect?id='+id})
 const {data:pending}=await db.from('kartino_radyar_pending').select('id,expires_at').eq('id',id).gt('expires_at',new Date().toISOString()).maybeSingle()
 if(!pending)return <main style={{padding:40}}>This connection has expired. Start again from Kartino Settings.</main>
 const identity=await getSignedInUserIdentity()
 async function approve(){
  'use server'
  const identity=await getSignedInUserIdentity();if(!identity)throw new Error('Please sign in again')
  const user=await currentUser()
  if(!user || user.id!==identity.userId)throw new Error('Please sign in again')
  const primary=user.emailAddresses?.find(e=>e.id===user.primaryEmailAddressId)
  if(primary?.verification?.status==='verified'){
   const aliases=[...new Set([identity.ownerId,'email:'+primary.emailAddress.trim().toLowerCase()])].filter(id=>id.startsWith('email:'))
   const {error}=await db.rpc('claim_learning_legacy_ids',{p_user_id:identity.userId,p_legacy_ids:aliases});if(error)throw new Error('Please retry shortly')
  }
  const {data,error}=await db.from('kartino_radyar_pending').update({clerk_id:identity.userId,owner_id:identity.userId,name:identity.email||'RadYar'}).eq('id',id).is('clerk_id',null).gt('expires_at',new Date().toISOString()).select('state').maybeSingle()
  if(error||!data)throw new Error('Connection expired. Please start again in Kartino.')
  redirect('com.radyar.kartino://radyar?code='+id+'&state='+encodeURIComponent(data.state))
 }
 return <main style={{maxWidth:560,margin:'60px auto',padding:28,borderRadius:24,background:'var(--surface, #f4f6f8)',color:'#17252a'}}>
  <h1>RadYar ↔ Kartino</h1><h2>Connect your flashcards · Lernkarten verbinden · اتصال فلش‌کارت‌ها</h2>
  <p>Download the cards available to your RadYar account for offline study in Kartino. Only RadYar review progress is synced. Personal Kartino cards and photos stay on your device.</p>
  <p>Die verfügbaren RadYar-Karten offline lernen und den Lernfortschritt abgleichen. Eigene Kartino-Karten und Fotos bleiben auf deinem Gerät.</p>
  <p dir="rtl">کارت‌های در دسترس حسابت در رادیار را آفلاین مرور کن و پیشرفت را همگام کن. کارت‌های شخصی و عکس‌های کارتینو منتقل نمی‌شوند. هر زمان از تنظیمات کارتینو می‌توانی اتصال را قطع کنی.</p>
  <p><strong>{identity?.email || "RadYar account"}</strong></p>
  <form action={approve}><button style={{padding:16,borderRadius:12,cursor:'pointer'}}>Connect · Verbinden · اتصال</button></form>
  <p>To cancel, close this window. / Zum Abbrechen Fenster schließen. / برای لغو، پنجره را ببند.</p>
 </main>
}
