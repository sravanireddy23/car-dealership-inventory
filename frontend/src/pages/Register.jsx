import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../services/authService'
import './Register.css'

function Register() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError('Please fill in all the fields.')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setLoading(true)

    const result = await registerUser({
      name: formData.name,
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
    <div className="register-page">

      <div className="register-card">

        {/* HEADER */}
        <div className="register-header">
          <div className="register-logo">
            AV
          </div>

          <span className="register-label">
            AUTOVAULT
          </span>

          <h1>Create Account</h1>

          <p>
            Create your AutoVault account.
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="register-error">
            {error}
          </div>
        )}

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="register-form"
        >

          {/* NAME */}
          <div className="register-field">
            <label htmlFor="name">
              Full Name
            </label>

            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              autoComplete="name"
            />
          </div>

          {/* EMAIL */}
          <div className="register-field">
            <label htmlFor="email">
              Email Address
            </label>

            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              autoComplete="email"
            />
          </div>

          {/* PASSWORD */}
          <div className="register-field">
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Minimum 6 characters"
              autoComplete="new-password"
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="register-field">
            <label htmlFor="confirmPassword">
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              autoComplete="new-password"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="register-button"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

        </form>

        {/* LOGIN */}
        <div className="register-footer">
          <span>
            Already have an account?
          </span>

          <Link to="/login">
            Login
          </Link>
        </div>

      </div>

    </div>
  )
}

export default Register