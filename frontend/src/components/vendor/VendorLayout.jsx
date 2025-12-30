import TopNav from '../dashboard/TopNav'
import VendorSidebar from './Sidebar'

export default function VendorLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <TopNav user={{ name: 'Vendor User' }} />

      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 lg:px-0">
        <VendorSidebar />

        <main className="flex-1 space-y-6">{children}</main>
      </div>
    </div>
  )
}
