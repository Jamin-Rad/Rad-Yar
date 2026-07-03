import AndarunLogin from './AndarunLogin'

export const metadata = {
  title: 'Andarun Login',
  description: 'Private Anmeldung',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AndarunLoginPage() {
  return <AndarunLogin />
}
