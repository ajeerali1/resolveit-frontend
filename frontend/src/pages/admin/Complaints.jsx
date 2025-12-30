import { useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Navbar from '../../components/layout/Navbar'
import Sidebar from '../../components/layout/Sidebar'

const INITIAL_COMPLAINTS = [
  {
    id: 'cmp_1',
    title: 'Leaky faucet in kitchen',
    status: 'open',
    customerName: 'John Doe',
    assignedVendor: null,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'cmp_2',
    title: 'Power outage in living room',
    status: 'in_progress',
    customerName: 'Jane Smith',
    assignedVendor: 'BrightSpark Electricians',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'cmp_3',
    title: 'Broken window lock',
    status: 'open',
    customerName: 'Mike Johnson',
    assignedVendor: null,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
]

const VENDORS = [
  'FixIt Plumbing Co.',
  'BrightSpark Electricians',
  'SafeHome Repairs',
  'QuickFix Services',
]

export default function AdminComplaints() {
  const [complaints, setComplaints] = useState(INITIAL_COMPLAINTS)
  const [selectedComplaintId, setSelectedComplaintId] = useState(null)
  const [selectedVendor, setSelectedVendor] = useState('')

  const selectedComplaint = complaints.find((c) => c.id === selectedComplaintId)

  const handleSelectComplaint = (id) => {
    setSelectedComplaintId(id)
    setSelectedVendor('')
  }

  const handleAssignVendor = () => {
    if (!selectedComplaint || !selectedVendor) return
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === selectedComplaint.id
          ? { ...c, assignedVendor: selectedVendor, status: 'assigned' }
          : c,
      ),
    )
    setSelectedComplaintId(null)
    setSelectedVendor('')
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'bg-yellow-100 text-yellow-800'
      case 'in_progress':
      case 'assigned':
        return 'bg-blue-100 text-blue-800'
      case 'resolved':
        return 'bg-green-100 text-green-800'
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
                <h1 className="text-2xl font-bold text-slate-900">Complaint Management</h1>
                <p className="mt-1 text-sm text-slate-600">
                  Review complaints and assign vendors
                </p>
              </div>
              <Link to="/admin">
                <Button variant="ghost">Back to Dashboard</Button>
              </Link>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <Card header="All Complaints">
                  {complaints.length === 0 ? (
                    <div className="py-12 text-center">
                      <img
                        src="https://picsum.photos/seed/handyman/400/300"
                        alt="No complaints"
                        className="mx-auto w-full max-w-md h-48 object-cover rounded-lg"
                      />
                      <h3 className="mt-4 text-lg font-semibold text-slate-900">
                        No complaints found
                      </h3>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {complaints.map((complaint) => (
                        <button
                          key={complaint.id}
                          type="button"
                          onClick={() => handleSelectComplaint(complaint.id)}
                          className={`flex w-full items-center gap-4 rounded-lg border p-4 text-left transition-colors ${
                            selectedComplaintId === complaint.id
                              ? 'border-sky-500 bg-sky-50'
                              : 'border-slate-200 bg-white hover:bg-slate-50'
                          }`}
                        >
                          <img
                            src="https://picsum.photos/seed/handyman/400/300"
                            alt={complaint.title}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <p className="font-semibold text-slate-900">{complaint.title}</p>
                            <p className="mt-1 text-xs text-slate-600">
                              Customer: {complaint.customerName}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                              {new Date(complaint.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <span
                            className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(
                              complaint.status,
                            )}`}
                          >
                            {complaint.status}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </Card>
              </div>

              <div>
                <Card header="Assign Vendor">
                  {!selectedComplaint ? (
                    <div className="py-8 text-center">
                      <img
                        src="https://picsum.photos/seed/smarthome/400/300"
                        alt="Select complaint"
                        className="mx-auto w-full max-w-md h-48 rounded-lg object-cover opacity-50"
                      />
                      <p className="mt-4 text-sm text-slate-600">
                        Select a complaint to assign a vendor
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <img
                          src="https://picsum.photos/seed/handyman/400/300"
                          alt={selectedComplaint.title}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">{selectedComplaint.title}</h3>
                        <p className="mt-1 text-xs text-slate-600">
                          Customer: {selectedComplaint.customerName}
                        </p>
                        <p className="mt-2 text-xs text-slate-600">
                          Assigned vendor:{' '}
                          <span className="font-medium">
                            {selectedComplaint.assignedVendor || 'Unassigned'}
                          </span>
                        </p>
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="vendor"
                          className="block text-xs font-medium text-slate-700"
                        >
                          Select vendor
                        </label>
                        <select
                          id="vendor"
                          value={selectedVendor}
                          onChange={(e) => setSelectedVendor(e.target.value)}
                          className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                        >
                          <option value="">Select a vendor</option>
                          {VENDORS.map((name) => (
                            <option key={name} value={name}>
                              {name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <Button
                        onClick={handleAssignVendor}
                        disabled={!selectedVendor}
                        className="w-full"
                      >
                        Assign Vendor
                      </Button>
                    </div>
                  )}
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
