import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import Card from '../../components/ui/Card'
import Loader from '../../components/ui/Loader'
import Button from '../../components/ui/Button'
import Navbar from '../../components/layout/Navbar'
import Sidebar from '../../components/layout/Sidebar'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function fetchStats() {
      try {
        setLoading(true)
        setError(null)
        const response = await api.get('/admin/stats')
        if (!isMounted) return
        setStats(response.data)
      } catch (err) {
        if (!isMounted) return
        setError('Failed to load admin stats.')
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchStats()

    return () => {
      isMounted = false
    }
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6">
            <Loader label="Loading admin dashboard..." />
          </main>
        </div>
      </div>
    )
  }

  if (error || !stats) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6">
            <Card header="Error">
              <p className="text-sm text-red-600">{error || 'Failed to load stats'}</p>
            </Card>
          </main>
        </div>
      </div>
    )
  }

  const cards = [
    {
      label: 'Total Users',
      value: stats.totalUsers,
      color: 'bg-sky-50 text-sky-700',
      icon: '👥',
    },
    {
      label: 'Total Vendors',
      value: stats.totalVendors,
      color: 'bg-blue-50 text-blue-700',
      icon: '🔧',
    },
    {
      label: 'Open Complaints',
      value: stats.openComplaints,
      color: 'bg-yellow-50 text-yellow-700',
      icon: '⚠️',
    },
    {
      label: 'Resolved Complaints',
      value: stats.resolvedComplaints,
      color: 'bg-green-50 text-green-700',
      icon: '✅',
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="mx-auto max-w-6xl">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
              <p className="mt-1 text-sm text-slate-600">
                Overview of platform statistics and pending approvals
              </p>
            </div>

            <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {cards.map((card) => (
                <Card key={card.label} className="overflow-hidden">
                  <div className={`${card.color} p-4`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide opacity-80">
                          {card.label}
                        </p>
                        <p className="mt-2 text-3xl font-bold">{card.value}</p>
                      </div>
                      <span className="text-3xl">{card.icon}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card header="Pending Approvals">
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg bg-yellow-50 p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://picsum.photos/seed/handyman/400/300"
                        alt="Vendor"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {stats.totalVendors} vendors pending verification
                        </p>
                        <p className="text-xs text-slate-600">Requires admin approval</p>
                      </div>
                    </div>
                  </div>
                  <Link to="/admin/vendors">
                    <Button className="w-full">Manage Vendors</Button>
                  </Link>
                </div>
              </Card>

              <Card header="Recent Activity">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 rounded-lg border border-slate-200 p-3">
                    <img
                      src="https://picsum.photos/seed/handyman/400/300"
                      alt="Activity"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">
                        {stats.openComplaints} open complaints
                      </p>
                      <p className="text-xs text-slate-600">Need attention</p>
                    </div>
                  </div>
                  <Link to="/admin/complaints">
                    <Button variant="secondary" className="w-full">
                      Manage Complaints
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>

            <div className="mt-6">
              <Card header="Platform Overview">
                <div className="aspect-video w-full overflow-hidden rounded-lg bg-slate-200">
                  <img
                    src="https://picsum.photos/seed/smarthome/400/300"
                    alt="Platform overview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
