const USERS_KEY = 'autovault_users'
const CURRENT_USER_KEY = 'autovault_current_user'

export const registerUser = async (userData) => {
  const users = JSON.parse(
    localStorage.getItem(USERS_KEY) || '[]'
  )

  const existingUser = users.find(
    (user) => user.email.toLowerCase() === userData.email.toLowerCase()
  )

  if (existingUser) {
    return {
      success: false,
      message: 'User already exists',
    }
  }

  const newUser = {
    id: Date.now(),
    name: userData.name,
    email: userData.email,
    password: userData.password,
    role: 'user',
  }

  users.push(newUser)

  localStorage.setItem(
    USERS_KEY,
    JSON.stringify(users)
  )

  return {
    success: true,
    user: newUser,
  }
}

export const loginUser = async (credentials) => {
  const email = credentials.email.trim().toLowerCase()
  const password = credentials.password

  // ADMIN LOGIN
  if (
    email === 'admin@autovault.com' &&
    password === 'admin123'
  ) {
    const adminUser = {
      id: 1,
      name: 'AutoVault Admin',
      email: 'admin@autovault.com',
      role: 'admin',
    }

    localStorage.setItem(
      CURRENT_USER_KEY,
      JSON.stringify(adminUser)
    )

    return {
      success: true,
      user: adminUser,
    }
  }

  // NORMAL USER LOGIN
  const users = JSON.parse(
    localStorage.getItem(USERS_KEY) || '[]'
  )

  const user = users.find(
    (item) =>
      item.email.toLowerCase() === email &&
      item.password === password
  )

  if (!user) {
    return {
      success: false,
      message: 'Invalid email or password',
    }
  }

  localStorage.setItem(
    CURRENT_USER_KEY,
    JSON.stringify(user)
  )

  return {
    success: true,
    user,
  }
}

export const getCurrentUser = () => {
  const currentUser = localStorage.getItem(
    CURRENT_USER_KEY
  )

  if (!currentUser) {
    return null
  }

  return JSON.parse(currentUser)
}

export const logoutUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY)
}