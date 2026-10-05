import { redirect } from 'next/navigation'
import MedicationPage from '@/app/andarun/medikamente/MedicationPage'
import { hasMamanSession } from '@/lib/mamanAuth'

const MAMAN_PROFILE = { id: 'maman', name: 'Maman', initials: 'M' }

export const dynamic = 'force-dynamic'

export default async function MamanMedicationPage() {
  if (!(await hasMamanSession())) redirect('/maman/login')
  return (
    <MedicationPage
      apiEndpoint="/api/maman/medications"
      profile={MAMAN_PROFILE}
      appHref="/maman"
      homeHref="/maman"
      homeLabel="Maman"
      storageKey="maman-medications-cache-v1"
    />
  )
}
