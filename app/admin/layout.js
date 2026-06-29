import Navbar from '@/components/Navbar'
import AdminPrivateNav from '@/components/AdminPrivateNav'

export default function AdminLayout({ children }) {
  return (
    <>
      <Navbar />
      <AdminPrivateNav />
      <div style={{ paddingTop: '116px' }}>
        {children}
      </div>
    </>
  )
}
