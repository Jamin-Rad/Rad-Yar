export const metadata = {
  title: 'Kaiser Score Rechner | RadYar',
  description: 'Interaktiver Kaiser Score für kontrastmittelverstärkte Mamma-MRT – strukturierte Einordnung von Läsionen anhand morphologischer und kinetischer Kriterien.',
  applicationName: 'Kaiser Score',
  alternates: { canonical: '/kaiser-score' },
  openGraph: {
    title: 'Kaiser Score Rechner',
    description: 'Ein strukturierter Entscheidungsweg für kontrastmittelverstärkte Mamma-MRT.',
    url: '/kaiser-score',
    siteName: 'RadYar',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Kaiser Score Rechner',
    description: 'Ein strukturierter Entscheidungsweg für kontrastmittelverstärkte Mamma-MRT.',
  },
}

export default function KaiserScoreLayout({ children }) {
  return children
}
