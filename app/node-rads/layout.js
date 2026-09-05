export const metadata = {
  title: 'Node-RADS Rechner | RadYar',
  description: 'Interaktive Node-RADS-1.0-Einstufung von Lymphknoten nach Region, Größe und Konfiguration.',
  alternates: { canonical: '/node-rads' },
  openGraph: {
    title: 'Node-RADS Rechner · RadYar',
    description: 'Region wählen, Größe und Konfiguration erfassen und Node-RADS strukturiert bestimmen.',
    url: '/node-rads',
    siteName: 'RadYar',
    type: 'website',
  },
}

export default function NodeRadsLayout({ children }) {
  return children
}
