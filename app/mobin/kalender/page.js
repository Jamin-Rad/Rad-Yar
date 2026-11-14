import MobinCalendar from './MobinCalendar'

export const metadata = { title: 'Kalender · Mobin' }

export default async function KalenderPage({ searchParams }) {
  const query = await searchParams
  const view = ['week', 'month', 'year'].includes(query?.ansicht) ? query.ansicht : 'month'
  return <MobinCalendar key={view} initialView={view} />
}
