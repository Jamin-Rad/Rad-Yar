import assert from 'node:assert/strict'
import fs from 'node:fs'
import React from 'react'
import {renderToStaticMarkup} from 'react-dom/server'
import {transformSync} from 'esbuild'
const styles=new Proxy({}, {get:(_,key)=>key==='__esModule'?false:String(key)})
let lang='de'
let state={isSignedIn:true,user:{primaryEmailAddress:{emailAddress:'dr.benjaminzia@gmail.com'}}}
const Link=({children,href,...props})=>React.createElement('a',{href,...props},children)
const replacements={
 '@/providers/LanguageProvider':{useLanguage:()=>({lang})},
 'react':React,'next/link':Link,'next/navigation':{usePathname:()=>'/abdomen/leber/fibrolamellaeres-karzinom'},
 '@clerk/nextjs':{ClerkLoaded:({children})=>children,useUser:()=>state},
 '@/lib/lessonPdf':{isLessonPdfPath:()=>true,LESSON_PDF_EXPORT_EVENT:'export',LESSON_PDF_STATE_EVENT:'state',LESSON_PDF_STATE_REQUEST_EVENT:'request'},
 './Navbar.module.css':styles,
 './FamilyPortalMenu':({children})=>React.createElement('div',{'data-family-menu':true},children),
}
const module={exports:{}}
const runtime=await import('react/jsx-runtime')
new Function('require','module','exports',transformSync(fs.readFileSync('components/AdminHeaderLinks.jsx','utf8'),{loader:'jsx',jsx:'automatic',format:'cjs'}).code)(name=>name==='react/jsx-runtime'?runtime:replacements[name],module,module.exports)
const Page=module.exports.default
const admin=renderToStaticMarkup(React.createElement(Page))
for(const [locale,label] of Object.entries({de:'Admin-Navigation',en:'Admin navigation',fa:'ناوبری مدیریت'})){lang=locale;assert.ok(renderToStaticMarkup(React.createElement(Page)).includes(`aria-label="${label}"`))}
assert.ok(admin.includes('aria-expanded="false"')&&admin.includes('aria-controls="radyar-admin-navigation"'))
for(const value of ['href="/admin"','href="/admin/exams"','Lernskript als PDF','Lehr-Mode starten','data-family-menu'])assert.ok(admin.includes(value),`Admin feature retained: ${value}`)
for(const nonAdmin of [{isSignedIn:false,user:null},{isSignedIn:true,user:{primaryEmailAddress:{emailAddress:'reader@example.test'}}}]){state=nonAdmin;assert.equal(renderToStaticMarkup(React.createElement(Page)),'','Admin gate remains intact')}
console.log('Responsive admin navigation SSR PASS: labelled collapsed toggle with target, all5 existing features retained, signed-out/nonadmin gates unchanged. Actual320/390 click/keyboard/popover browser tests remain separate.')
