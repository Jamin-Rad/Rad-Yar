import { notFound } from 'next/navigation'
import MammaCalculatorClient from '../MammaCalculatorClient'

const TOOL_SLUGS = ['birads-mass', 'birads-calcifications', 'node-rads']

export function generateStaticParams() {
  return TOOL_SLUGS.map(tool => ({ tool }))
}

export default async function MammaCalculatorToolPage({ params }) {
  const { tool } = await params
  if (!TOOL_SLUGS.includes(tool)) notFound()
  return <MammaCalculatorClient initialTool={tool} />
}
