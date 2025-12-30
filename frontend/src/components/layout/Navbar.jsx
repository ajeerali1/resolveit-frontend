import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import Button from '../ui/Button'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Solutions', to: '/solutions' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Support', to: '/support' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      const confirmed = window.confirm('Are you sure you want to logout?')
      if (!confirmed) return
    }
    logout()
    navigate('/')
  }

  const dashboardPath =
    (user?.role === 'customer' && '/customer') ||
    (user?.role === 'vendor' && '/vendor') ||
    (user?.role === 'admin' && '/admin') ||
    null

  return (
    <header className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <a
        href="#main-content"
        className="sr-only absolute left-4 top-4 z-50 rounded-md bg-sky-600 px-3 py-2 text-xs font-semibold text-white focus:not-sr-only"
      >
        Skip to main content
      </a>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-lg font-semibold tracking-tight text-slate-900" aria-label="ResolveIt home">
          ResolveIt
        </Link>

        <nav className="flex items-center gap-8 text-sm font-medium text-slate-700" aria-label="Main navigation">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = link.to === '/' ? location.pathname === '/' : location.pathname.startsWith(link.to)
              return (
                <li key={link.to} className="list-none">
                  <Link
                    to={link.to}
                    aria-current={isActive ? 'page' : undefined}
                    className={`pb-1 text-sm transition hover:text-sky-700 inline-block cursor-pointer pointer-events-auto ${
                      isActive ? 'border-b-2 border-sky-600 text-sky-700' : ''
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-3">
            {!isAuthenticated && (
              <>
                <Link
                  to="/auth/login"
                  className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:border-sky-300 hover:text-sky-700"
                >
                  Login
                </Link>
                <Link to="/auth/register">
                  <Button className="h-9 rounded-full px-4 text-sm">Register</Button>
                </Link>
              </>
            )}

            {isAuthenticated && (
              <>
                {dashboardPath && (
                  <Link
                    to={dashboardPath}
                    className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:border-sky-300 hover:text-sky-700"
                  >
                    Dashboard
                  </Link>
                )}
                <div className="flex items-center gap-2 rounded-full bg-slate-100 px-2 py-1">
                  <img
                    src={`https://i.pravatar.cc/150?u=${user?.email || 'user'}`}
                    alt={user?.name || 'User'}
                    className="h-8 w-8 rounded-full border border-white object-cover"
                  />
                  <span className="text-xs font-semibold text-slate-800">{user?.name || 'User'}</span>
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="text-xs text-slate-700 hover:text-sky-700"
                  >
                    Logout
                  </Button>
                </div>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
