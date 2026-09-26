export const ANDARUN_WEB_APPS = {
  andarun: {
    name: 'Andarun', shortName: 'Andarun', startUrl: '/andarun',
    themeColor: '#080b1d', backgroundColor: '#080b1d', icon: 'andarun',
  },
  routine: {
    name: 'Andarun Routine', shortName: 'Routine', startUrl: '/andarun/routine',
    themeColor: '#16213a', backgroundColor: '#090d1f', icon: 'routine',
  },
  todo: {
    name: 'Andarun ToDos', shortName: 'ToDos', startUrl: '/andarun/todo',
    themeColor: '#183b3e', backgroundColor: '#0a1120', icon: 'todo',
  },
  termine: {
    name: 'Andarun Termine', shortName: 'Termine', startUrl: '/andarun/termine',
    themeColor: '#4a3154', backgroundColor: '#0a1120', icon: 'termine',
  },
  deutsch: {
    name: 'Andarun Deutsch', shortName: 'Deutsch', startUrl: '/andarun/deutsch',
    themeColor: '#292856', backgroundColor: '#09091d', icon: 'deutsch',
  },
  gesundheit: {
    name: 'Andarun Gesundheit', shortName: 'Gesundheit', startUrl: '/andarun/gesundheit',
    themeColor: '#0f766e', backgroundColor: '#071a1b', icon: 'gesundheit',
  },
  medikamente: {
    name: 'داروی من', shortName: 'داروی من', startUrl: '/andarun/medikamente',
    themeColor: '#2f755f', backgroundColor: '#fffdf9', icon: 'medikamente',
  },
  finanzen: {
    name: 'Andarun Finanzen', shortName: 'Finanzen', startUrl: '/andarun/finanz',
    themeColor: '#9a512d', backgroundColor: '#0e1424', icon: 'finanzen',
  },
  gefangene: {
    name: 'Andarun Hilfe', shortName: 'Hilfe', startUrl: '/andarun/finanz/gefangene',
    themeColor: '#17335f', backgroundColor: '#f4f7fc', icon: 'gefangene',
  },
  dienste: {
    name: 'Andarun Dienste', shortName: 'Dienste', startUrl: '/andarun/dienste',
    themeColor: '#214c5e', backgroundColor: '#091225', icon: 'dienste',
  },
  befunde: {
    name: 'Andarun Befunde', shortName: 'Befunde', startUrl: '/andarun/befunde',
    themeColor: '#224761', backgroundColor: '#091225', icon: 'befunde',
  },
  urlaub: {
    name: 'Andarun Urlaub', shortName: 'Urlaub', startUrl: '/andarun/urlaub',
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

export function getAndarunPwaMetadata(key) {
  const app = getAndarunWebApp(key)
  if (!app) return {}
  const iconBase = `/andarun/icons/${app.icon}`

  return {
    applicationName: app.name,
    manifest: `/andarun/pwa/${key}/manifest.webmanifest`,
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
