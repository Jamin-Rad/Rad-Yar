import ProstateCalculator from '@/components/prostate-calculator/ProstateCalculator'

export const metadata = {
  title: 'PI-RADS v2.1 Rechner | RadYar',
  description: 'PI-RADS v2.1 für periphere und Transitionszone mit nachvollziehbarer T2-, DWI- und DCE-Kombination.',
  alternates: { canonical: '/pi-rads' },
}

export default function PiradsPage() {
  return <ProstateCalculator tool="pirads" />
}
