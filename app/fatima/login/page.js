import FatimaLogin from './FatimaLogin'

export const metadata = {
  title: 'Fatima Login',
  description: 'Private Anmeldung',
  robots: {
    index: false,
    follow: false,
  },
}

export default function FatimaLoginPage() {
  return <FatimaLogin />
}
