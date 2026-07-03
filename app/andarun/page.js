import AndarunLanding from './AndarunLanding'

export const metadata = {
  title: 'Andarun',
  description: 'Privater Bereich',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AndarunPage() {
  return <AndarunLanding />
}
