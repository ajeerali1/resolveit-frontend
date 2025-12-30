import Navbar from '../../components/layout/Navbar'
import Sidebar from '../../components/layout/Sidebar'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'

const sample = [
  { id: 'B-1021', service: 'Plumbing', date: '2025-02-01', status: 'In Progress' },
  { id: 'B-1020', service: 'Electrician', date: '2025-01-22', status: 'Completed' },
]

export default function Bookings() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 lg:px-0">
        <Sidebar />
        <main className="flex-1">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h1 className="text-2xl font-bold text-slate-900">My Bookings</h1>
            <p className="mt-2 text-sm text-slate-600">Your recent and upcoming bookings.</p>

            <div className="mt-6 space-y-4">
              {sample.map((b) => (
                <div key={b.id} className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <p className="font-medium text-slate-900">{b.service}</p>
                    <p className="text-sm text-slate-500">{b.date}</p>
                  </div>
                  <div className="text-sm text-slate-700">{b.status}</div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
