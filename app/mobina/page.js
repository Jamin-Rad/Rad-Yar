import MobinaRoutine from './MobinaRoutine'

export const metadata = {
  title: 'Mobina | Meine Routine',
  description: 'Mobinas privater Tagesplan und Routineverlauf.',
  robots: { index: false, follow: false },
}

export default function MobinaPage() {
  return <MobinaRoutine />
}
