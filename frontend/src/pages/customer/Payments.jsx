import Navbar from '../../components/layout/Navbar'
import Sidebar from '../../components/layout/Sidebar'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'

const payments = [
  { id: 1, label: 'Escrow held', amount: 120, status: 'Pending' },
  { id: 2, label: 'Refund', amount: 50, status: 'Released' },
]

export default function Payments() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 lg:px-0">
        <Sidebar />
        <main className="flex-1">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h1 className="text-2xl font-bold text-slate-900">Payments</h1>
            <p className="mt-2 text-sm text-slate-600">View your transactions and pending payments.</p>

            <div className="mt-6 space-y-4">
              {payments.map((p) => (
                <div key={p.id} className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <p className="font-medium text-slate-900">{p.label}</p>
                    <p className="text-sm text-slate-500">${p.amount}</p>
                  </div>
                  <div className="text-sm text-slate-700">{p.status}</div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
