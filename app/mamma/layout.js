import Navbar from '@/components/Navbar'

export default function MammaLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
