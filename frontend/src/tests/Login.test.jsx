import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import Login from '../pages/Login'
import { loginUser } from '../services/authService'

vi.mock('../services/authService', () => ({
  loginUser: vi.fn(),
}))

describe('Login', () => {
  it('should display the login form', () => {
    render(<Login />)

    expect(
      screen.getByLabelText(/email/i)
    ).toBeInTheDocument()

    expect(
      screen.getByLabelText(/^password$/i)
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: /login/i })
    ).toBeInTheDocument()
  })

  it('should show validation errors for empty fields', async () => {
    const user = userEvent.setup()

    render(<Login />)

    await user.click(
      screen.getByRole('button', { name: /login/i })
    )

    expect(
      screen.getByText('Email is required')
    ).toBeInTheDocument()

    expect(
      screen.getByText('Password is required')
    ).toBeInTheDocument()
  })

  it('should call loginUser with valid credentials', async () => {
    const user = userEvent.setup()

    loginUser.mockResolvedValue({
      success: true,
    })

    render(<Login />)

    await user.type(
      screen.getByLabelText(/email/i),
      'sravani@example.com'
    )

    await user.type(
      screen.getByLabelText(/^password$/i),
      'Password123'
    )

    await user.click(
      screen.getByRole('button', { name: /login/i })
    )

    expect(loginUser).toHaveBeenCalledWith({
      email: 'sravani@example.com',
      password: 'Password123',
    })
  })
})