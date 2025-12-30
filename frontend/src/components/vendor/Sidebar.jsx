import { NavLink } from 'react-router-dom'

const items = [
  { to: '/vendor/dashboard', label: 'Dashboard' },
  { to: '/vendor/requests', label: 'Job Requests' },
  { to: '/vendor/jobs', label: 'Active Jobs' },
  { to: '/vendor/earnings', label: 'Earnings' },
  { to: '/vendor/support', label: 'Messages / Support' },
  { to: '/vendor/profile', label: 'Profile' },
]

export default function VendorSidebar() {
  return (
    <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-white p-4 text-sm md:block">
      <div className="mb-6 flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white font-bold">V</div>
        <div>
          <div className="text-sm font-semibold text-slate-900">Vendor</div>
          <div className="text-xs text-slate-500">Welcome back</div>
        </div>
      </div>

      <nav>
        <ul className="space-y-2">
          {items.map((it) => (
            <li key={it.to}>
              <NavLink
                to={it.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive ? 'bg-rose-50 text-rose-700 font-medium' : 'text-slate-700 hover:bg-slate-50'
                  }`
                }
              >
                <span className="h-6 w-6 rounded-md bg-slate-100 text-center text-xs leading-6">{it.label[0]}</span>
                <span>{it.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
