import React from 'react'

export default function UpcomingBookings({ items = [] }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <h3 className="text-sm font-semibold text-slate-900">Upcoming Bookings</h3>
      <div className="mt-3 space-y-3">
        {items.length === 0 ? (
          <p className="text-sm text-slate-500">No upcoming bookings</p>
        ) : (
          items.map((b) => (
            <div key={b.id} className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-slate-900">{b.service}</p>
                <p className="text-xs text-slate-500">{b.date} • {b.time}</p>
              </div>
              <div className="text-sm text-slate-500">{b.status}</div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
