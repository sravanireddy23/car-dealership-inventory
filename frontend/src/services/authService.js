const API_URL = 'http://localhost:5000/api'

const TOKEN_KEY = 'autovault_token'
const CURRENT_USER_KEY = 'autovault_current_user'

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
        password: userData.password,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Registration failed',
      }
    }

    localStorage.setItem(TOKEN_KEY, data.token)
    localStorage.setItem(
      CURRENT_USER_KEY,
      JSON.stringify(data.user)
    )

    return data
  } catch (error) {
    console.error('Registration error:', error)

    return {
      success: false,
      message: 'Unable to connect to server',
    }
  }
}

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Invalid email or password',
      }
    }

    localStorage.setItem(TOKEN_KEY, data.token)
    localStorage.setItem(
      CURRENT_USER_KEY,
      JSON.stringify(data.user)
    )

    return data
  } catch (error) {
    console.error('Login error:', error)

    return {
      success: false,
      message: 'Unable to connect to server',
    }
  }
}

export const getCurrentUser = () => {
  const currentUser = localStorage.getItem(
    CURRENT_USER_KEY
  )

  if (!currentUser) {
    return null
  }

  try {
    return JSON.parse(currentUser)
  } catch {
    return null
  }
}

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY)
}

export const logoutUser = () => {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(CURRENT_USER_KEY)
}

export const getAuthHeaders = () => {
  const token = getToken()

  return token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {}
}
