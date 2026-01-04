import { useMemo, useState } from 'react'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Navbar from '../../components/layout/Navbar'
// TopNav removed to keep header minimal per design
import { useAuth } from '../../hooks/useAuth'
import Sidebar from '../../components/layout/Sidebar'
import UpcomingBookings from '../../components/dashboard/UpcomingBookings'

const serviceOptions = [
  { label: 'Plumbing', value: 'plumbing' },
  { label: 'Electrician', value: 'electrician' },
  { label: 'AC Repair', value: 'acrepair' },
  { label: 'Carpenter', value: 'carpenter' },
  { label: 'Cleaning', value: 'cleaning' },
  { label: 'Handyman', value: 'handyman' },
]

const dummyBookings = [
  { id: 'B-1021', service: 'Plumbing', date: '2025-02-01', status: 'In Progress', amount: 85 },
  { id: 'B-1020', service: 'Electrician', date: '2025-01-22', status: 'Scheduled', amount: 120 },
  { id: 'B-1018', service: 'Carpentry', date: '2024-12-18', status: 'Completed', amount: 200 },
]

const dummyComplaints = [
  { id: 'C-2201', title: 'Leaking kitchen sink', status: 'Open' },
  { id: 'C-2198', title: 'Breaker keeps tripping', status: 'Resolved' },
]

const dummyNotifications = [
  { id: 1, message: 'Your plumber booking is confirmed for Feb 1', time: '2h ago' },
  { id: 2, message: 'Complaint C-2198 was marked resolved', time: '1d ago' },
]

export default function CustomerDashboard() {
  const { user } = useAuth()
  const [selectedService, setSelectedService] = useState(serviceOptions[0].value)
  const [date, setDate] = useState('')
  const [bookings, setBookings] = useState(dummyBookings)
  const [complaints] = useState(dummyComplaints)
  const [notifications] = useState(dummyNotifications)

  const statusBadge = useMemo(
    () => ({
      Open: 'bg-yellow-100 text-yellow-800',
      'In Progress': 'bg-blue-100 text-blue-800',
      Scheduled: 'bg-indigo-100 text-indigo-800',
      Resolved: 'bg-green-100 text-green-800',
    }),
    [],
  )

  const handleBookingSubmit = (e) => {
    e.preventDefault()
    if (!date) return
    const selected = serviceOptions.find((s) => s.value === selectedService)
    setBookings((prev) => [
      {
        id: `B-${Math.floor(Math.random() * 9000) + 1000}`,
        service: selected?.label || 'Service',
        date,
        status: 'Scheduled',
        amount: 75,
      },
      ...prev,
    ])
    setDate('')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 lg:px-0">
        <Sidebar />

        <main className="flex-1 space-y-6">
          <div className="rounded-2xl bg-gradient-to-r from-white/90 to-white p-6 shadow-lg">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900">Welcome back, {user?.name || 'User'} 👋</h2>
                <p className="mt-1 text-sm text-slate-600">Manage your bookings, payments, and support requests.</p>
              </div>
              <div className="hidden sm:flex items-center gap-3">
                <Button variant="secondary">Support</Button>
                <Button as="a" href="/customer/book-service">Book a Service</Button>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-4">
              <div className="rounded-xl bg-white p-4 shadow-sm">
                <p className="text-xs text-slate-500">Active Bookings</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">{bookings.filter(b => b.status !== 'Completed').length}</p>
                <p className="text-sm text-slate-500">Currently scheduled or in progress</p>
              </div>
              <div className="rounded-xl bg-white p-4 shadow-sm">
                <p className="text-xs text-slate-500">Completed Services</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">{bookings.filter(b => b.status === 'Completed').length}</p>
                <p className="text-sm text-slate-500">Services you received</p>
              </div>
              <div className="rounded-xl bg-white p-4 shadow-sm">
                <p className="text-xs text-slate-500">Pending Payments</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">${bookings.filter(b => b.status !== 'Completed').reduce((s, b) => s + (b.amount||0), 0)}</p>
                <p className="text-sm text-slate-500">Amount awaiting payment</p>
              </div>
              <div className="rounded-xl bg-white p-4 shadow-sm">
                <p className="text-xs text-slate-500">Total Spent</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">${bookings.reduce((s, b) => s + (b.amount||0), 0)}</p>
                <p className="text-sm text-slate-500">Lifetime spend</p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">Recent Bookings</h3>
                  <div className="flex items-center gap-2">
                    <Button as="a" href="/customer/bookings" variant="ghost">View all</Button>
                    <Button as="a" href="/customer/book-service">Book a Service</Button>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  {bookings.map((b) => (
                    <div key={b.id} className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{b.service}</p>
                        <p className="text-xs text-slate-500">{b.date} • {b.id}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusBadge[b.status] || 'bg-slate-100 text-slate-800'}`}>{b.status}</span>
                        <div className="text-sm font-semibold text-slate-900">${b.amount}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">Need help?</h3>
                <p className="mt-2 text-sm text-slate-600">Open a support ticket or chat with our team if you need assistance with a booking.</p>
                <div className="mt-4 flex gap-3">
                  <Button as="a" href="/customer/support">Open Support Ticket</Button>
                  <Button variant="secondary">Chat with Support</Button>
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-xl bg-white p-4 shadow-sm">
                <h4 className="text-sm font-semibold text-slate-900">Quick Actions</h4>
                <div className="mt-3 flex flex-col gap-2">
                  <Button as="a" href="/customer/book-service" className="w-full">Book a Service</Button>
                  <Button as="a" href="/customer/bookings" variant="secondary" className="w-full">My Bookings</Button>
                  <Button as="a" href="/customer/payments" variant="ghost" className="w-full">Payment History</Button>
                </div>
              </div>

              <div className="rounded-xl bg-white p-4 shadow-sm">
                <h4 className="text-sm font-semibold text-slate-900">Notifications</h4>
                <ul className="mt-2 text-sm text-slate-600 space-y-2">
                  {notifications.map(n => <li key={n.id} className="">{n.message}</li>)}
                </ul>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  )
}
