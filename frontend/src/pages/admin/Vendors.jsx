import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Loader from '../../components/ui/Loader'
import Navbar from '../../components/layout/Navbar'
import Sidebar from '../../components/layout/Sidebar'

export default function AdminVendors() {
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [submittingId, setSubmittingId] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function fetchVendors() {
      try {
        setLoading(true)
        setError(null)
        const response = await api.get('/admin/vendors')
        if (!isMounted) return
        setVendors(response.data.items || [])
      } catch (err) {
        if (!isMounted) return
        setError('Failed to load vendors.')
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchVendors()

    return () => {
      isMounted = false
    }
  }, [])

  const handleApprove = async (id) => {
    setSubmittingId(id)
    setError(null)
    try {
      const response = await api.post(`/admin/vendors/${id}/verify`)
      const updated = response.data.vendor
      setVendors((prev) =>
        prev.map((v) => (v.id === id ? { ...v, ...updated } : v)),
      )
    } catch (err) {
      setError('Failed to approve vendor.')
    } finally {
      setSubmittingId(null)
    }
  }

  const handleReject = (id) => {
    setVendors((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: 'rejected' } : v)),
    )
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800'
      case 'pending_verification':
        return 'bg-yellow-100 text-yellow-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-slate-100 text-slate-800'
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="mx-auto max-w-6xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Vendor Management</h1>
                <p className="mt-1 text-sm text-slate-600">
                  Review and approve vendor applications
                </p>
              </div>
              <Link to="/admin">
                <Button variant="ghost">Back to Dashboard</Button>
              </Link>
            </div>

            {loading ? (
              <Loader label="Loading vendors..." />
            ) : error ? (
              <Card header="Error">
                <p className="text-sm text-red-600">{error}</p>
              </Card>
            ) : vendors.length === 0 ? (
              <Card>
                <div className="py-12 text-center">
                  <img
                    src="https://picsum.photos/seed/handyman/400/300"
                    alt="No vendors"
                    className="mx-auto w-full max-w-md h-48 object-cover rounded-lg"
                  />
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">No vendors found</h3>
                  <p className="mt-2 text-sm text-slate-600">
                    There are no vendors to manage at the moment.
                  </p>
                </div>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {vendors.map((vendor) => (
                  <Card key={vendor.id} className="overflow-hidden">
                    <div className="aspect-video w-full overflow-hidden bg-slate-200">
                      <img
                        src="https://picsum.photos/seed/handyman/400/300"
                        alt={vendor.name}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                    <div className="p-4">
                      <div className="mb-3 flex items-center gap-3">
                        <img
                          src={`https://i.pravatar.cc/150?u=${vendor.name}`}
                          alt={vendor.name}
                          className="h-10 w-10 rounded-full"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900">{vendor.name}</h3>
                          <p className="text-xs text-slate-600">
                            {vendor.totalJobs} jobs completed
                          </p>
                        </div>
                      </div>
                      <div className="mb-4">
                        <span
                          className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(
                            vendor.status,
                          )}`}
                        >
                          {vendor.status}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="secondary"
                          onClick={() => handleApprove(vendor.id)}
                          disabled={
                            submittingId === vendor.id || vendor.status === 'verified'
                          }
                          className="flex-1"
                        >
                          {submittingId === vendor.id ? 'Approving...' : 'Approve'}
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => handleReject(vendor.id)}
                          disabled={vendor.status === 'rejected'}
                          className="flex-1"
                        >
                          Reject
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
