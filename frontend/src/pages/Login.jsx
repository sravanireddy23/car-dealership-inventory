
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../services/authService'

function Login() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))

    setError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!formData.email.trim() || !formData.password) {
      setError('Please enter your email and password.')
      return
    }

    setLoading(true)

    const result = await loginUser({
      email: formData.email,
      password: formData.password,
    })

    setLoading(false)

    if (!result.success) {
      setError(result.message)
      return
    }

    navigate('/')
    window.location.reload()
  }

  return (
    <div className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-gray-100 px-6 py-10">

      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">

        <h1 className="text-3xl font-bold text-gray-900">
          Welcome Back
        </h1>

        <p className="mt-2 text-gray-600">
          Login to your AutoVault account.
        </p>

        {error && (
          <div className="mt-5 rounded-lg bg-red-50 p-3 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-5"
        >

          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-black px-4 py-3 font-semibold text-white hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

        </form>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="font-semibold text-black hover:underline"
          >
            Register
          </Link>
        </p>

      </div>

    </div>
  )
}

export default Login
