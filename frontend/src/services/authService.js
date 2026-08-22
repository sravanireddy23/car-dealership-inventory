export const registerUser = async (userData) => {
  return {
    success: true,
    user: userData,
  }
}

export const loginUser = async (credentials) => {
  return {
    success: true,
    user: {
      email: credentials.email,
    },
  }
}