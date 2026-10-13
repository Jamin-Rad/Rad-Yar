import test from 'node:test'
import assert from 'node:assert/strict'
import config from '../next.config.mjs'
import { ANDARUN_WEB_APPS, getAndarunPwaMetadata } from '../lib/andarunWebApps.js'

test('home-screen installation metadata is never streamed into the body', () => {
  for (const ua of ['Mozilla/5.0 (iPhone) AppleWebKit/605.1.15 Version/18.0 Mobile/15E148 Safari/604.1','Mozilla/5.0 Chrome/130 Safari/537.36','Googlebot','facebookexternalhit']) assert.equal(config.htmlLimitedBots.test(ua),true)
})
test('every private tool retains a distinct install identity, launch path and Apple title', () => {
  const paths=new Set()
  for (const [key,app] of Object.entries(ANDARUN_WEB_APPS)) {
    assert.equal(paths.has(app.startUrl),false)
    paths.add(app.startUrl)
    const metadata=getAndarunPwaMetadata(key)
    assert.equal(metadata.appleWebApp.title,app.shortName)
    assert.ok(metadata.manifest.includes(`/pwa/${key}/`))
  }
  assert.equal(ANDARUN_WEB_APPS.termine.startUrl,'/andarun/termine')
})

// Optional local production-server checks; do not print or persist session tokens.
if (process.env.PWA_TEST_BASE) {
  const base=new URL(process.env.PWA_TEST_BASE)
  assert.ok(['localhost','127.0.0.1'].includes(base.hostname),'Authenticated integration checks are local only.')
  const token=process.env.ANDARUN_SESSION_SECRET || process.env.ADMIN_SESSION_SECRET
  assert.ok(token,'A configured local session is required.')
  for (const key of ['andarun','termine','gesundheit','finanzen']) test(`${key}: server head and manifest match the selected tool`,async()=>{
    const app=ANDARUN_WEB_APPS[key]
    const response=await fetch(new URL(app.startUrl,base),{headers:{Cookie:`andarun_session=${token}`,'User-Agent':'Mozilla/5.0 (iPhone) AppleWebKit/605.1.15 Version/18.0 Mobile/15E148 Safari/604.1'},redirect:'manual'})
    assert.equal(response.status,200)
    const html=await response.text()
    const head=html.split('</head>')[0]
    const links=[...head.matchAll(/<link\b[^>]*rel="manifest"[^>]*>/g)].map(match=>match[0])
    assert.equal(links.length,1)
    assert.ok(links[0].includes(`/andarun/pwa/${key}/manifest.webmanifest`))
    assert.ok(head.includes('name="apple-mobile-web-app-title"'))
    const manifest=await (await fetch(new URL(getAndarunPwaMetadata(key).manifest,base))).json()
    assert.equal(manifest.id,app.startUrl)
    assert.equal(manifest.start_url,app.startUrl)
    assert.equal(manifest.short_name,app.shortName)
  })
}
