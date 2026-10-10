import Navbar from '@/components/Navbar'

export default function AdminLayout({ children }) {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '64px' }}>
        {children}
      </div>
    </>
  )
}
