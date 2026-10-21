import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import config from '../next.config.mjs'
import { ANDARUN_WEB_APPS, getAndarunPwaMetadata, getAndarunWebAppKey, isAndarunAppBoundary } from '../lib/andarunWebApps.js'
import { ANDARUN_HOME_GROUPS } from '../data/andarunHome.js'

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
    assert.equal(metadata.alternates.canonical, app.startUrl)
    assert.equal(metadata.openGraph.url, app.startUrl)
    for (const size of [180,192,512]) {
      const png=readFileSync(new URL(`../public/andarun/icons/${app.icon}-${size}.png`,import.meta.url))
      assert.equal(png.readUInt32BE(16),size)
      assert.equal(png.readUInt32BE(20),size)
    }
  }
  assert.equal(ANDARUN_WEB_APPS.termine.startUrl,'/andarun/termine')
})

test('every Jaminova directory destination has its own installable app', () => {
  for (const item of ANDARUN_HOME_GROUPS.flatMap(group=>group.items)) {
    if (!item.href?.startsWith('/andarun/')) continue
    const key=getAndarunWebAppKey(item.href)
    assert.ok(key, item.href)
    assert.equal(ANDARUN_WEB_APPS[key].startUrl,item.href)
  }
})

test('cross-app navigation reloads identity while nested tool pages stay together', () => {
  assert.equal(getAndarunWebAppKey('/andarun/finanz/freunde/print'),'freunde')
  assert.equal(getAndarunWebAppKey('/andarun/finanz/gefangene/edit'),'gefangene')
  assert.equal(getAndarunWebAppKey('/andarun/deutsch/lektion'),'deutsch')
  assert.equal(getAndarunWebAppKey('/andarun/gesundheit-extra'),'andarun')
  assert.equal(getAndarunWebAppKey('/andarun-extra'),null)
  assert.equal(isAndarunAppBoundary('/andarun','/andarun/finanz'),true)
  assert.equal(isAndarunAppBoundary('/andarun/finanz','/andarun/finanz/freunde'),true)
  assert.equal(isAndarunAppBoundary('/andarun/termine','/andarun'),true)
  assert.equal(isAndarunAppBoundary('/andarun/deutsch','/andarun/deutsch/lektion'),false)
  assert.equal(isAndarunAppBoundary('/andarun/finanz','/andarun/finanz'),false)
})

test('each generated manifest has a scope containing its own launch URL, including the home app',async()=>{
  const source=readFileSync(new URL('../app/andarun/pwa/[app]/manifest.webmanifest/route.js',import.meta.url),'utf8').replace(/^import .*\r?\n/gm,'').replace('export async function GET','async function GET')
  const get=new Function('getAndarunWebApp',source+'\nreturn GET;')(key=>ANDARUN_WEB_APPS[key]||null)
  for(const [key,app] of Object.entries(ANDARUN_WEB_APPS)){
    const response=await get(null,{params:Promise.resolve({app:key})})
    const manifest=await response.json()
    assert.equal(manifest.start_url,app.startUrl)
    assert.equal(manifest.id,app.startUrl)
    assert.ok(manifest.start_url.startsWith(manifest.scope),`${key} starts outside its scope`)
  }
})

// Optional local production-server checks; do not print or persist session tokens.
if (process.env.PWA_TEST_BASE) {
  const base=new URL(process.env.PWA_TEST_BASE)
  assert.ok(['localhost','127.0.0.1'].includes(base.hostname),'Authenticated integration checks are local only.')
  const token=process.env.ANDARUN_SESSION_SECRET || process.env.ADMIN_SESSION_SECRET
  assert.ok(token,'A configured local session is required.')
  for (const key of Object.keys(ANDARUN_WEB_APPS).filter(key=>key!=='gefangene')) test(`${key}: server head and manifest match the selected tool`,async()=>{
    const app=ANDARUN_WEB_APPS[key]
    const response=await fetch(new URL(app.startUrl,base),{headers:{Cookie:`andarun_session=${token}`,'User-Agent':'Mozilla/5.0 (iPhone) AppleWebKit/605.1.15 Version/18.0 Mobile/15E148 Safari/604.1'},redirect:'manual'})
    assert.equal(response.status,200)
    const html=await response.text()
    const head=html.split('</head>')[0]
    const links=[...head.matchAll(/<link\b[^>]*rel="manifest"[^>]*>/g)].map(match=>match[0])
    assert.equal(links.length,1)
    assert.ok(links[0].includes(`/andarun/pwa/${key}/manifest.webmanifest`))
    assert.ok(head.includes('name="apple-mobile-web-app-title"'))
    assert.ok(head.includes(`content="${app.shortName}"`))
    assert.ok(head.includes(`/andarun/icons/${app.icon}-180.png`))
    const manifest=await (await fetch(new URL(getAndarunPwaMetadata(key).manifest,base))).json()
    assert.equal(manifest.id,app.startUrl)
    assert.equal(manifest.start_url,app.startUrl)
    assert.equal(manifest.short_name,app.shortName)
    assert.ok(manifest.start_url.startsWith(manifest.scope))
  })
  for (const key of ['finanzen','freunde','termine','english']) test(`${key}: login retains the requested install identity`,async()=>{
    const response=await fetch(new URL(`/andarun/login?next=${encodeURIComponent(ANDARUN_WEB_APPS[key].startUrl)}`,base))
    const head=(await response.text()).split('</head>')[0]
    assert.match(head,new RegExp(`/andarun/pwa/${key}/manifest.webmanifest`))
    assert.ok(head.includes(`/andarun/icons/${ANDARUN_WEB_APPS[key].icon}-180.png`))
  })
}
