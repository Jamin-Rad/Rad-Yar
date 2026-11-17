import PaduaCalculator from './PaduaCalculator'

export const metadata = {
  title: 'ACM-Rechner · ETF 2023 und Padua 2020 | RadYar',
  description: 'Interaktiver Rechner für arrhythmogene Kardiomyopathie. Befunde einmal eingeben und nach ETF 2023 und Padua 2020 vergleichen.',
  alternates: { canonical: '/padua-rechner' },
}

export default function PaduaPage() {
  return <PaduaCalculator/>
}
