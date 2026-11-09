import { Suspense } from 'react'
import { notFound, redirect } from 'next/navigation'
import RechnerClient from '@/components/rechner/RechnerClient'
import { TOOLS } from '@/components/rechner/catalog'

export async function generateMetadata({ params }) {
  const { tool: id } = await params
  const tool = TOOLS.find(item => item.id === id)
  return { title: `${tool?.name.de || 'Rechner'} | RadYar`, alternates: { canonical: `/rechner/${id}` } }
}
export default async function CalculatorPage({ params, searchParams }) {
  const { tool: id } = await params
  const tool = TOOLS.find(item => item.id === id)
  if (!tool) notFound()
  if (tool.href) {
    const query = await searchParams
    const lang = ['de', 'en', 'fa'].includes(query.lang) ? query.lang : 'en'
    redirect(`${tool.href}?lang=${lang}`)
  }
  return <Suspense fallback={<main style={{ padding: 40 }}>RadYar · {tool.name.de}</main>}><RechnerClient toolId={id}/></Suspense>
}
