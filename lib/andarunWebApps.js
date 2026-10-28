export const ANDARUN_WEB_APPS = {
  andarun: {
    name: 'Jaminova', shortName: 'Jaminova', startUrl: '/andarun',
    themeColor: '#080b1d', backgroundColor: '#080b1d', icon: 'andarun',
  },
  routine: {
    name: 'Jaminova Routine', shortName: 'Routine', startUrl: '/andarun/routine',
    themeColor: '#16213a', backgroundColor: '#090d1f', icon: 'routine',
  },
  todo: {
    name: 'Jaminova ToDos', shortName: 'ToDos', startUrl: '/andarun/todo',
    themeColor: '#183b3e', backgroundColor: '#0a1120', icon: 'todo',
  },
  termine: {
    name: 'Jaminova Termine', shortName: 'Termine', startUrl: '/andarun/termine',
    themeColor: '#4a3154', backgroundColor: '#0a1120', icon: 'termine',
  },
  deutsch: {
    name: 'Jaminova Deutsch', shortName: 'Deutsch', startUrl: '/andarun/deutsch',
    themeColor: '#292856', backgroundColor: '#09091d', icon: 'deutsch',
  },
  english: {
    name: 'Jaminova English', shortName: 'English', startUrl: '/andarun/english',
    themeColor: '#25366b', backgroundColor: '#f5f6fc', icon: 'english',
  },
  test: {
    name: 'RadYar Lernseiten', shortName: 'Lernseiten', startUrl: '/andarun/test',
    themeColor: '#171320', backgroundColor: '#171320', icon: 'test',
  },
  gesundheit: {
    name: 'Jaminova Gesundheit', shortName: 'Gesundheit', startUrl: '/andarun/gesundheit',
    themeColor: '#0f766e', backgroundColor: '#071a1b', icon: 'gesundheit',
  },
  medikamente: {
    name: 'داروی من', shortName: 'داروی من', startUrl: '/andarun/medikamente',
    themeColor: '#2f755f', backgroundColor: '#fffdf9', icon: 'medikamente',
  },
  finanzen: {
    name: 'Jaminova Finanzen', shortName: 'Finanzen', startUrl: '/andarun/finanz',
    themeColor: '#9a512d', backgroundColor: '#0e1424', icon: 'finanzen',
  },
  freunde: {
    name: 'Jaminova Konten mit Freunden', shortName: 'Konten', startUrl: '/andarun/finanz/freunde',
    themeColor: '#087454', backgroundColor: '#f7f9fc', icon: 'freunde',
  },
  gefangene: {
    name: 'Jaminova Hilfe', shortName: 'Hilfe', startUrl: '/andarun/finanz/gefangene',
    themeColor: '#17335f', backgroundColor: '#f4f7fc', icon: 'gefangene',
  },
  dienste: {
    name: 'Jaminova Dienste', shortName: 'Dienste', startUrl: '/andarun/dienste',
    themeColor: '#214c5e', backgroundColor: '#091225', icon: 'dienste',
  },
  befundtimer: {
    name: 'Jaminova Befundtimer', shortName: 'Befundtimer', startUrl: '/andarun/befundtimer',
    themeColor: '#224761', backgroundColor: '#091225', icon: 'befundtimer',
  },
  befunde: {
    name: 'Jaminova Fallsammlung', shortName: 'Fallsammlung', startUrl: '/andarun/befunde',
    themeColor: '#075c50', backgroundColor: '#fbfaf8', icon: 'befunde',
  },
  urlaub: {
    name: 'Jaminova Urlaub', shortName: 'Urlaub', startUrl: '/andarun/urlaub',
    themeColor: '#2458ed', backgroundColor: '#f5f3ed', icon: 'urlaub',
  },
  iran: {
    name: 'Iran Reisekasse', shortName: 'Iran Reise', startUrl: '/andarun/iran-app',
    themeColor: '#b54832', backgroundColor: '#f5f3ed', icon: 'iran',
  },
}

export function getAndarunWebApp(key) {
  return ANDARUN_WEB_APPS[key] || null
}

// Match the most specific app first: friends and aid have their own identity
// inside the finance URL tree. Paths inside a tool retain that tool's identity.
export function getAndarunWebAppKey(pathname) {
  return Object.keys(ANDARUN_WEB_APPS)
    .filter(key => pathname === ANDARUN_WEB_APPS[key].startUrl || pathname.startsWith(`${ANDARUN_WEB_APPS[key].startUrl}/`))
    .sort((a, b) => ANDARUN_WEB_APPS[b].startUrl.length - ANDARUN_WEB_APPS[a].startUrl.length)[0] || null
}

export function isAndarunAppBoundary(fromPath, toPath) {
  return getAndarunWebAppKey(fromPath) !== getAndarunWebAppKey(toPath)
}

export function getAndarunPwaMetadata(key) {
  const app = getAndarunWebApp(key)
  if (!app) return {}
  const iconBase = `/andarun/icons/${app.icon}`

  return {
    applicationName: app.name,
    // The version makes phones refresh a previously cached parent manifest.
    manifest: `/andarun/pwa/${key}/manifest.webmanifest?v=4`,
    alternates: { canonical: app.startUrl },
    openGraph: { title: app.name, siteName: app.name, url: app.startUrl },
    appleWebApp: {
      capable: true,
      title: app.shortName,
      statusBarStyle: 'black-translucent',
    },
    icons: {
      icon: [
        { url: `${iconBase}-192.png`, sizes: '192x192', type: 'image/png' },
        { url: `${iconBase}-512.png`, sizes: '512x512', type: 'image/png' },
      ],
      apple: [{ url: `${iconBase}-180.png`, sizes: '180x180', type: 'image/png' }],
    },
    other: { 'mobile-web-app-capable': 'yes' },
  }
}

export function getAndarunViewport(key) {
  const app = getAndarunWebApp(key) || ANDARUN_WEB_APPS.andarun
  return {
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover',
    themeColor: app.themeColor,
  }
}
