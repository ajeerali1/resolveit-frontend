import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import AppRouter from './router/AppRouter.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import initMocks from './services/mock'

// Initialize mocks
initMocks()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
