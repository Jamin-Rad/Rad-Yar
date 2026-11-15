import PaduaCalculator from './PaduaCalculator'

export const metadata = {
  title: 'ACM-Rechner · TFC 2010 und Padua 2020 | RadYar',
  description: 'Interaktiver Rechner für arrhythmogene Kardiomyopathie. Befunde einmal eingeben und nach TFC 2010 und Padua 2020 vergleichen.',
  alternates: { canonical: '/padua-rechner' },
}

export default function PaduaPage() {
  return <PaduaCalculator/>
}
