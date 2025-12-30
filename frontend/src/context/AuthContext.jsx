import { createContext, useContext, useEffect, useState } from 'react'
import api from '../services/api'

const AuthContext = createContext(null)
const TOKEN_KEY = 'authToken'
const USER_KEY = 'authUser'
const USERS_KEY = 'authUsers'

// (legacy helpers kept for compatibility with older mock-style flows)
function loadUsers() {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(USERS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveUsers(users) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  // Hydrate auth state from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return

    const storedToken = window.localStorage.getItem(TOKEN_KEY)
    const storedUser = window.localStorage.getItem(USER_KEY)

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setToken(storedToken)
        setUser(parsedUser)
      } catch {
        window.localStorage.removeItem(TOKEN_KEY)
        window.localStorage.removeItem(USER_KEY)
      }
    }
  }, [])

  const login = async (credentials) => {
    // Use API (mocked by axios-mock-adapter in development)
    try {
      const res = await api.post('/auth/login', credentials)
      const data = res.data
      const nextToken = data.token || `mock-token-${Date.now()}`
      const nextUser = data.user || { email: credentials.email }

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(TOKEN_KEY, nextToken)
        window.localStorage.setItem(USER_KEY, JSON.stringify(nextUser))
      }

      setToken(nextToken)
      setUser(nextUser)

      return nextUser
    } catch (err) {
      // Fallback to local storage mock if API fails
      const { email, password } = credentials
      const identifier = email?.trim().toLowerCase()
      const users = loadUsers()
      const matchedUser = users.find(
        (u) => (u.email?.toLowerCase() === identifier || u.name?.toLowerCase() === identifier) && u.password === password,
      )
      if (!matchedUser) throw err
      const nextToken = `mock-token-${matchedUser.id || matchedUser.email}`
      const nextUser = { ...matchedUser }
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(TOKEN_KEY, nextToken)
        window.localStorage.setItem(USER_KEY, JSON.stringify(nextUser))
      }
      setToken(nextToken)
      setUser(nextUser)
      return nextUser
    }
  }

  const register = async (data) => {
    // Use API register when available (mock supports this)
    try {
      const res = await api.post('/auth/register', data)
      // mock returns created user object
      return res.data
    } catch (err) {
      // Fallback to localStorage mock
      const users = loadUsers()
      const emailExists = users.some((u) => u.email?.toLowerCase() === data.email.trim().toLowerCase())
      if (emailExists) throw new Error('An account with this email already exists.')
      const usernameExists = users.some((u) => u.name?.toLowerCase() === data.name.trim().toLowerCase())
      if (usernameExists) throw new Error('This username is already taken. Please choose another.')
      const newUser = {
        id: Date.now(),
        email: data.email.trim(),
        name: data.name.trim(),
        role: data.role || 'customer',
        password: data.password,
      }
      const nextUsers = [newUser, ...users]
      saveUsers(nextUsers)
      return { user: newUser }
    }
  }

  const logout = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(TOKEN_KEY)
      window.localStorage.removeItem(USER_KEY)
    }
    setToken(null)
    setUser(null)
  }

  const value = {
    user,
    token,
    isAuthenticated: Boolean(token && user),
    login,
    logout,
    register,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return ctx
}

// Backwards-compatible hook name used across the app.
export function useAuth() {
  return useAuthContext()
}

export default AuthContext

