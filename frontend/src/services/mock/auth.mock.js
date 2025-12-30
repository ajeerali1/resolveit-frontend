export default function setupAuthMock(mock) {
  // POST /auth/login
  mock.onPost('/auth/login').reply((config) => {
    console.log('✅ Login mock matched! URL:', config.url, 'Data:', config.data)
    try {
      const body = JSON.parse(config.data || '{}')

      // Validate required fields
      if (!body.email || !body.password) {
        return [
          400,
          {
            message: 'Email and password are required.',
          },
        ]
      }

      // In a real app, this would verify credentials against a database
      // For mocks, we accept any email/password combination
      const isAdmin = body.email === 'admin@example.com'
      const userName = isAdmin ? 'Admin User' : body.email.split('@')[0] || 'User'

      return [
        200,
        {
          token: `mock-jwt-token-${Date.now()}`,
          user: {
            id: `user_${Date.now()}`,
            name: userName,
            email: body.email,
            role: isAdmin ? 'admin' : 'customer',
          },
        },
      ]
    } catch (error) {
      return [
        500,
        {
          message: 'Login failed. Please try again.',
        },
      ]
    }
  })

  // POST /auth/register
  mock.onPost('/auth/register').reply((config) => {
    console.log('✅ Register mock matched! URL:', config.url, 'Data:', config.data)
    try {
      const body = JSON.parse(config.data || '{}')

      // Validate required fields
      if (!body.email || !body.password || !body.name) {
        return [
          400,
          {
            message: 'Missing required fields. Please provide name, email, and password.',
          },
        ]
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(body.email)) {
        return [
          400,
          {
            message: 'Invalid email format.',
          },
        ]
      }

      // Validate password length
      if (body.password.length < 6) {
        return [
          400,
          {
            message: 'Password must be at least 6 characters long.',
          },
        ]
      }

      // Simulate successful registration
      return [
        201,
        {
          id: `user_${Date.now()}`,
          name: body.name,
          email: body.email,
          role: body.role || 'customer',
          createdAt: new Date().toISOString(),
        },
      ]
    } catch (error) {
      return [
        500,
        {
          message: 'Registration failed. Please try again.',
        },
      ]
    }
  })
}
