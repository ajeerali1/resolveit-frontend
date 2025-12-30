import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import api from '../../services/api'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Navbar from '../../components/layout/Navbar'
import Sidebar from '../../components/layout/Sidebar'

export default function AdminProfile() {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await api.get('/admin/stats')
        setStats(response.data)
      } catch (err) {
        console.error('Failed to fetch stats')
      }
    }
    fetchStats()
  }, [])

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="mx-auto max-w-4xl">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-slate-900">Admin Profile</h1>
              <p className="mt-1 text-sm text-slate-600">Manage your admin account</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2 space-y-6">
                <Card header="Profile Information">
                  <div className="flex items-start gap-6">
                    <img
                      src={`https://i.pravatar.cc/150?u=${user?.email || 'admin'}`}
                      alt={user?.name || 'Admin'}
                      className="h-24 w-24 rounded-full border-2 border-slate-200"
                    />
                    <div className="flex-1 space-y-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-500">
                          Full Name
                        </label>
                        <p className="mt-1 text-sm font-medium text-slate-900">
                          {user?.name || 'Not set'}
                        </p>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-500">Email</label>
                        <p className="mt-1 text-sm font-medium text-slate-900">
                          {user?.email || 'Not set'}
                        </p>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-500">Role</label>
                        <p className="mt-1 text-sm font-medium text-slate-900 capitalize">
                          {user?.role || 'admin'}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card header="Account Settings">
                  <div className="space-y-4">
                    <Button variant="secondary" className="w-full">
                      Update Profile
                    </Button>
                    <Button variant="secondary" className="w-full">
                      Change Password
                    </Button>
                  </div>
                </Card>
              </div>

              <div className="space-y-6">
                {stats && (
                  <Card header="Platform Statistics">
                    <div className="space-y-4">
                      <div className="rounded-lg bg-sky-50 p-4">
                        <p className="text-xs text-slate-600">Total Users</p>
                        <p className="mt-1 text-2xl font-bold text-sky-700">
                          {stats.totalUsers}
                        </p>
                      </div>
                      <div className="rounded-lg bg-blue-50 p-4">
                        <p className="text-xs text-slate-600">Total Vendors</p>
                        <p className="mt-1 text-2xl font-bold text-blue-700">
                          {stats.totalVendors}
                        </p>
                      </div>
                      <div className="rounded-lg bg-yellow-50 p-4">
                        <p className="text-xs text-slate-600">Open Complaints</p>
                        <p className="mt-1 text-2xl font-bold text-yellow-700">
                          {stats.openComplaints}
                        </p>
                      </div>
                      <div className="rounded-lg bg-green-50 p-4">
                        <p className="text-xs text-slate-600">Resolved</p>
                        <p className="mt-1 text-2xl font-bold text-green-700">
                          {stats.resolvedComplaints}
                        </p>
                      </div>
                    </div>
                  </Card>
                )}

                <Card header="Quick Actions">
                  <div className="space-y-2">
                    <Link to="/admin" className="block">
                      <Button className="w-full">View Dashboard</Button>
                    </Link>
                    <Link to="/admin/vendors" className="block">
                      <Button variant="secondary" className="w-full">
                        Manage Vendors
                      </Button>
                    </Link>
                    <Link to="/admin/complaints" className="block">
                      <Button variant="secondary" className="w-full">
                        Manage Complaints
                      </Button>
                    </Link>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

