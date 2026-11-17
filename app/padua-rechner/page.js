import PaduaCalculator from './PaduaCalculator'

export const metadata = {
  title: 'ACM-Rechner · ETF 2023 | RadYar',
  description: 'Interaktiver Rechner für arrhythmogene Kardiomyopathie. ACM-Befunde erfassen und nach den ETF-Kriterien 2023 einordnen.',
  alternates: { canonical: '/padua-rechner' },
}

export default function PaduaPage() {
  return <PaduaCalculator/>
}
