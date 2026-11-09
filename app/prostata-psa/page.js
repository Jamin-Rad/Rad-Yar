import ProstateCalculator from '@/components/prostate-calculator/ProstateCalculator'

export const metadata = {
  title: 'PSA-Dichte & Prostatavolumen | RadYar',
  description: 'Prostatavolumen und PSA-Dichte berechnen – mit drei Durchmessern oder bekanntem Volumen.',
  alternates: { canonical: '/prostata-psa' },
}

export default function ProstatePsaPage() {
  return <ProstateCalculator tool="psa" />
}
