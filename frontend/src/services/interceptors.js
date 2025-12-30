export function attachInterceptors(client) {
  // Attach token from localStorage on each request
  client.interceptors.request.use(
    (config) => {
      if (typeof window !== 'undefined') {
        const token = window.localStorage.getItem('authToken')
        if (token) {
          config.headers = config.headers || {}
          config.headers.Authorization = `Bearer ${token}`
        }
      }
      return config
    },
    (error) => Promise.reject(error),
  )

  // Handle 401 responses and generic errors
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error?.response?.status

      if (status === 401) {
        // Basic logout behavior: clear token and redirect to login.
        if (typeof window !== 'undefined') {
          window.localStorage.removeItem('authToken')
          // Adjust path as needed for your router setup.
          window.location.href = '/login'
        }
      }

      // Generic error handling hook
      // You can replace this with a toast/notification system later.
      if (typeof window !== 'undefined') {
        // eslint-disable-next-line no-console
        console.error('API error:', error)
      }

      return Promise.reject(error)
    },
  )

  return client
}

