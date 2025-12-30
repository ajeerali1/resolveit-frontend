import { useMemo, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Card from '../../components/ui/Card'
import Loader from '../../components/ui/Loader'

export default function AuthPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, register } = useAuth()
  const [isLogin, setIsLogin] = useState(
    location.pathname === '/auth/login',
  )
  const params = new URLSearchParams(location.search)
  const initialRole = params.get('role') || 'customer'
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
  })
  const [fieldErrors, setFieldErrors] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const passwordTooShort = form.password && form.password.length > 0 && form.password.length < 8
  const [showPassword, setShowPassword] = useState(false)
  const [role, setRole] = useState(initialRole)

  const emailRegex = useMemo(
    () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    [],
  )

  const validate = () => {
    const nextErrors = {}

    if (!form.email.trim()) {
      nextErrors.email = 'Email is required.'
    } else if (!emailRegex.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.'
    }

    if (!isLogin && !form.name.trim()) {
      nextErrors.name = 'Username is required.'
    }

    if (!form.password) {
      nextErrors.password = 'Password is required.'
    } else if (form.password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters long.'
    }

    return nextErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors)
      return
    }

    setLoading(true)

    try {
      let loggedUser = null
      if (isLogin) {
        loggedUser = await login({ email: form.email, password: form.password })
      } else {
        await register({
          email: form.email,
          password: form.password,
          name: form.name,
          role: role,
        })
        // After registration, also log them in and capture returned user
        loggedUser = await login({ email: form.email, password: form.password })
      }

      // Redirect logic: prefer original intended path, otherwise route by role
      const intended = location.state?.from?.pathname
      if (intended) {
        navigate(intended, { replace: true })
      } else {
        const r = (loggedUser && loggedUser.role) || 'customer'
        if (r === 'admin') navigate('/admin', { replace: true })
        else if (r === 'vendor') navigate('/vendor', { replace: true })
        else navigate('/customer', { replace: true })
      }
    } catch (err) {
      console.error('Auth error:', err)
      console.error('Error response:', err.response)
      console.error('Error message:', err.message)
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        (isLogin
          ? 'Login failed. Please check your credentials.'
          : 'Registration failed. Please try again.')

      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-50 to-slate-100 px-4 py-12">
      <Card className="w-full max-w-md animate-fade-up">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">
            {isLogin ? 'Login' : 'Register'}
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            {isLogin
              ? 'Sign in to your account'
              : 'Create a new account to get started'}
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {loading ? (
          <Loader label={isLogin ? 'Logging in...' : 'Registering...'} />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-1">
                <Input
                  label="Username"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="username"
                  required
                />
                {fieldErrors.name && (
                  <p className="text-xs text-red-600">{fieldErrors.name}</p>
                )}
              </div>
            )}

            <div className="space-y-1">
              <Input
                label={isLogin ? 'Email or Username' : 'Email'}
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
              {fieldErrors.email && (
                <p className="text-xs text-red-600">{fieldErrors.email}</p>
              )}
            </div>

            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange}
                  autoComplete={isLogin ? 'current-password' : 'new-password'}
                  required
                  className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2 pr-10 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded px-2 py-1 text-slate-500 hover:text-slate-700 focus:outline-none"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.96 9.96 0 013.162-7.225M6.1 6.1L17.9 17.9" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {(fieldErrors.password || passwordTooShort) && (
                <p className="text-xs text-red-600">
                  {fieldErrors.password || 'Password must be at least 8 characters long.'}
                </p>
              )}
            </div>

            {!isLogin && (
              <div className="space-y-3">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-slate-700">Role</p>
                  <div className="flex gap-3">
                    <label className={`inline-flex items-center gap-2 rounded-md px-3 py-2 ${role === 'customer' ? 'bg-sky-50 ring-1 ring-sky-200' : 'bg-white ring-1 ring-slate-100'}`}>
                      <input type="radio" name="role" value="customer" checked={role === 'customer'} onChange={() => setRole('customer')} className="accent-sky-600" />
                      <span className="text-sm">Customer</span>
                    </label>
                    <label className={`inline-flex items-center gap-2 rounded-md px-3 py-2 ${role === 'vendor' ? 'bg-sky-50 ring-1 ring-sky-200' : 'bg-white ring-1 ring-slate-100'}`}>
                      <input type="radio" name="role" value="vendor" checked={role === 'vendor'} onChange={() => setRole('vendor')} className="accent-sky-600" />
                      <span className="text-sm">Vendor</span>
                    </label>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={
                    loading ||
                    !form.email ||
                    !form.password ||
                    passwordTooShort ||
                    (!isLogin && !form.name)
                  }
                >
                  Register
                </Button>
              </div>
            )}

            {isLogin && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <a href="#" className="text-sm font-medium text-sky-600 hover:text-sky-700">Forgot password?</a>
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading || !form.email || !form.password || passwordTooShort}
                >
                  Login
                </Button>
              </div>
            )}

            {/* ensure role used for register */}
            <input type="hidden" name="role" value={role} />
          </form>
        )}

        <div className="mt-6 text-center text-sm">
          {isLogin ? (
            <p className="text-slate-600">
              Don&apos;t have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(false)
                  setError(null)
                  navigate('/auth/register')
                }}
                className="font-semibold text-sky-600 hover:text-sky-700"
              >
                Register here
              </button>
            </p>
          ) : (
            <p className="text-slate-600">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(true)
                  setError(null)
                  navigate('/auth/login')
                }}
                className="font-semibold text-sky-600 hover:text-sky-700"
              >
                Login here
              </button>
            </p>
          )}
        </div>
      </Card>
    </div>
  )
}


