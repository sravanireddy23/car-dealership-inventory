const USERS_KEY = 'autovault_users'
const CURRENT_USER_KEY = 'autovault_current_user'

export const registerUser = async (userData) => {
  const users = JSON.parse(
    localStorage.getItem(USERS_KEY) || '[]'
  )

  const existingUser = users.find(
    (user) =>
      user.email.toLowerCase() ===
      userData.email.toLowerCase()
  )

  if (existingUser) {
    return {
      success: false,
      message: 'An account with this email already exists.',
    }
  }

  const newUser = {
    id: Date.now(),
    name: userData.name,
    email: userData.email.toLowerCase(),
    password: userData.password,
  }

  users.push(newUser)

  localStorage.setItem(
    USERS_KEY,
    JSON.stringify(users)
  )

  localStorage.setItem(
    CURRENT_USER_KEY,
    JSON.stringify({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    })
  )

  return {
    success: true,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    },
  }
}

export const loginUser = async (credentials) => {
  const users = JSON.parse(
    localStorage.getItem(USERS_KEY) || '[]'
  )

  const user = users.find(
    (item) =>
      item.email.toLowerCase() ===
        credentials.email.toLowerCase() &&
      item.password === credentials.password
  )

  if (!user) {
    return {
      success: false,
      message: 'Invalid email or password.',
    }
  }

  const currentUser = {
    id: user.id,
    name: user.name,
    email: user.email,
  }

  localStorage.setItem(
    CURRENT_USER_KEY,
    JSON.stringify(currentUser)
  )

  return {
    success: true,
    user: currentUser,
  }
}

export const logoutUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY)
}

export const getCurrentUser = () => {
  const user = localStorage.getItem(CURRENT_USER_KEY)

  if (!user) {
    return null
  }

  return JSON.parse(user)
}

export const isLoggedIn = () => {
  return getCurrentUser() !== null
}
