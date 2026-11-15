import PaduaCalculator from './PaduaCalculator'

export const metadata = {
  title: 'Padua-Rechner 2020 | RadYar',
  description: 'Interaktiver Rechner für alle sechs Padua-Kategorien zur Einordnung der arrhythmogenen Kardiomyopathie.',
  alternates: { canonical: '/padua-rechner' },
}

export default function PaduaPage() {
  return <PaduaCalculator/>
}
