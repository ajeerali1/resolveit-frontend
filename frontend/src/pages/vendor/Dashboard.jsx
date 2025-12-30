import { useMemo, useState } from 'react'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import VendorLayout from '../../components/vendor/VendorLayout'

const initialPending = [
  { id: 'C-3011', title: 'Water leakage', customer: 'Sara', service: 'Plumbing', priority: 'High' },
  { id: 'C-3010', title: 'AC not cooling', customer: 'Imran', service: 'AC Repair', priority: 'Medium' },
]

const initialAssigned = [
  { id: 'B-4021', title: 'Install ceiling fan', customer: 'Ali', status: 'In Progress' },
  { id: 'B-4019', title: 'Kitchen rewiring', customer: 'Anaya', status: 'Scheduled' },
]

const vendorNotifications = [
  { id: 1, message: 'New complaint C-3011 assigned to you', time: '1h ago' },
  { id: 2, message: 'Reminder: booking B-4021 is due tomorrow', time: '6h ago' },
]

export default function VendorDashboard() {
  const [pendingComplaints, setPendingComplaints] = useState(initialPending)
  const [assignedBookings, setAssignedBookings] = useState(initialAssigned)
  const [notifications] = useState(vendorNotifications)

  const statusBadge = useMemo(
    () => ({
      Pending: 'bg-yellow-100 text-yellow-800',
      'In Progress': 'bg-blue-100 text-blue-800',
      Scheduled: 'bg-indigo-100 text-indigo-800',
      Completed: 'bg-green-100 text-green-800',
      Rejected: 'bg-red-100 text-red-700',
      Accepted: 'bg-blue-100 text-blue-800',
    }),
    [],
  )

  const handleAccept = (id) => {
    setPendingComplaints((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'Accepted' } : c)),
    )
  }

  const handleReject = (id) => {
    setPendingComplaints((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'Rejected' } : c)),
    )
  }

  const updateBookingStatus = (id, status) => {
    setAssignedBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)))
  }

  return (
    <VendorLayout>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Vendor Dashboard</h1>
              <p className="text-sm text-slate-600">Handle complaints, bookings, and updates</p>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary">View Profile</Button>
              <Button>Go Online</Button>
            </div>
          </div>

          <Card>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Pending Complaints</h2>
              <span className="text-xs text-slate-500">Dummy data</span>
            </div>
            <div className="mt-4 space-y-3">
              {pendingComplaints.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                      <p className="text-xs text-slate-500">
                        {item.service} • {item.customer} • Priority: {item.priority}
                      </p>
                    </div>
                    {item.status && (
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          item.status === 'Accepted'
                            ? 'bg-blue-100 text-blue-800'
                            : item.status === 'Rejected'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {item.status}
                      </span>
                    )}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" onClick={() => handleAccept(item.id)}>
                      Accept
                    </Button>
                    <Button size="sm" variant="secondary" onClick={() => handleReject(item.id)}>
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Assigned Bookings</h2>
              <span className="text-xs text-slate-500">Update status</span>
            </div>
            <div className="mt-4 space-y-3">
              {assignedBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{booking.title}</p>
                    <p className="text-xs text-slate-500">
                      ID: {booking.id} • Customer: {booking.customer}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={booking.status}
                      onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                      className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-200"
                    >
                      <option>Scheduled</option>
                      <option>In Progress</option>
                      <option>Completed</option>
                    </select>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        statusBadge[booking.status] || 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Notifications</h2>
              <Button variant="ghost" size="sm">
                Mark all read
              </Button>
            </div>
            <div className="mt-3 space-y-3">
              {notifications.map((note) => (
                <div
                  key={note.id}
                  className="flex items-start justify-between rounded-lg border border-slate-200 bg-slate-50/60 px-4 py-3"
                >
                  <p className="text-sm text-slate-800">{note.message}</p>
                  <span className="text-xs text-slate-500">{note.time}</span>
                </div>
              ))}
            </div>
          </Card>
    </VendorLayout>
  )
}
