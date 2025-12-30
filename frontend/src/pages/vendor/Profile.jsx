import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import api from '../../services/api'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Navbar from '../../components/layout/Navbar'
import Sidebar from '../../components/layout/Sidebar'

export default function VendorProfile() {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    completedJobs: 0,
  })

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await api.get('/vendor/jobs')
        const jobs = response.data.items || []
        setStats({
          totalJobs: jobs.length,
          activeJobs: jobs.filter((j) => j.status === 'assigned' || j.status === 'accepted')
            .length,
          completedJobs: jobs.filter((j) => j.status === 'completed').length,
        })
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
              <h1 className="text-2xl font-bold text-slate-900">Vendor Profile</h1>
              <p className="mt-1 text-sm text-slate-600">Manage your vendor account</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2 space-y-6">
                <Card header="Profile Information">
                  <div className="flex items-start gap-6">
                    <img
                      src={`https://i.pravatar.cc/150?u=${user?.email || 'vendor'}`}
                      alt={user?.name || 'Vendor'}
                      className="h-24 w-24 rounded-full border-2 border-slate-200"
                    />
                    <div className="flex-1 space-y-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-500">
                          Business Name
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
                          {user?.role || 'vendor'}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card header="Skills & Services">
                  <div className="flex flex-wrap gap-2">
                    {['Plumbing', 'Electrical', 'HVAC', 'Appliance Repair'].map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700"
                      >
                        {skill}
                      </span>
                    ))}
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
                <Card header="Statistics">
                  <div className="space-y-4">
                    <div className="rounded-lg bg-sky-50 p-4">
                      <p className="text-xs text-slate-600">Total Jobs</p>
                      <p className="mt-1 text-2xl font-bold text-sky-700">{stats.totalJobs}</p>
                    </div>
                    <div className="rounded-lg bg-blue-50 p-4">
                      <p className="text-xs text-slate-600">Active Jobs</p>
                      <p className="mt-1 text-2xl font-bold text-blue-700">
                        {stats.activeJobs}
                      </p>
                    </div>
                    <div className="rounded-lg bg-green-50 p-4">
                      <p className="text-xs text-slate-600">Completed</p>
                      <p className="mt-1 text-2xl font-bold text-green-700">
                        {stats.completedJobs}
                      </p>
                    </div>
                  </div>
                </Card>

                <Card header="Quick Actions">
                  <div className="space-y-2">
                    <Link to="/vendor" className="block">
                      <Button className="w-full">View Dashboard</Button>
                    </Link>
                    <Link to="/vendor/jobs" className="block">
                      <Button variant="secondary" className="w-full">
                        View All Jobs
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

