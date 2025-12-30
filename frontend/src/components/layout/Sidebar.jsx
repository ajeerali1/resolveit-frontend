import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export default function Sidebar() {
  const { user } = useAuth()
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  if (user?.role === 'customer') {
    return (
      <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-white p-4 text-sm md:block">
        <div className="mb-6 flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-sky-600 to-indigo-600 flex items-center justify-center text-white font-bold">RI</div>
          <div>
            <div className="text-sm font-semibold text-slate-900">Customer</div>
            <div className="text-xs text-slate-500">Welcome back</div>
          </div>
        </div>

        <nav>
          <ul className="space-y-2">
            {[
              { to: '/customer', label: 'Dashboard' },
              { to: '/customer/book-service', label: 'Book a Service' },
              { to: '/customer/bookings', label: 'My Bookings' },
              { to: '/customer/payments', label: 'Payments' },
              { to: '/customer/support', label: 'Messages / Support' },
              { to: '/customer/profile', label: 'Profile' },
            ].map((it) => (
              <li key={it.to}>
                <Link
                  to={it.to}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive(it.to) ? 'bg-sky-50 text-sky-700 font-medium' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="h-6 w-6 rounded-md bg-slate-100 text-center text-xs leading-6">{it.label[0]}</span>
                  <span>{it.label}</span>
                </Link>
              </li>
            ))}

            <li>
              <button
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.location.href = '/auth/login'
                  }
                }}
                className="mt-4 w-full rounded-lg bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700 hover:bg-rose-100"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>
    )
  }

  if (user?.role === 'vendor') {
    return (
      <aside className="hidden w-64 border-r border-slate-200 bg-slate-50 p-4 text-sm md:block">
        <div className="mb-6 font-semibold text-slate-900">Navigation</div>
        <ul className="space-y-2">
          <li>
            <Link
              to="/vendor"
              className={`block rounded-md px-3 py-2 ${
                isActive('/vendor')
                  ? 'bg-sky-100 text-sky-700 font-medium'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/vendor/jobs"
              className={`block rounded-md px-3 py-2 ${
                isActive('/vendor/jobs')
                  ? 'bg-sky-100 text-sky-700 font-medium'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              All Jobs
            </Link>
          </li>
          <li>
            <Link
              to="/vendor/profile"
              className={`block rounded-md px-3 py-2 ${
                isActive('/vendor/profile')
                  ? 'bg-sky-100 text-sky-700 font-medium'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              Profile
            </Link>
          </li>
        </ul>
      </aside>
    )
  }

  if (user?.role === 'admin') {
    return (
      <aside className="hidden w-64 border-r border-slate-200 bg-slate-50 p-4 text-sm md:block">
        <div className="mb-6 font-semibold text-slate-900">Navigation</div>
        <ul className="space-y-2">
          <li>
            <Link
              to="/admin"
              className={`block rounded-md px-3 py-2 ${
                isActive('/admin')
                  ? 'bg-sky-100 text-sky-700 font-medium'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/admin/vendors"
              className={`block rounded-md px-3 py-2 ${
                isActive('/admin/vendors')
                  ? 'bg-sky-100 text-sky-700 font-medium'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              Vendors
            </Link>
          </li>
          <li>
            <Link
              to="/admin/complaints"
              className={`block rounded-md px-3 py-2 ${
                isActive('/admin/complaints')
                  ? 'bg-sky-100 text-sky-700 font-medium'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              Complaints
            </Link>
          </li>
          <li>
            <Link
              to="/admin/profile"
              className={`block rounded-md px-3 py-2 ${
                isActive('/admin/profile')
                  ? 'bg-sky-100 text-sky-700 font-medium'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              Profile
            </Link>
          </li>
        </ul>
      </aside>
    )
  }

  return null
}
