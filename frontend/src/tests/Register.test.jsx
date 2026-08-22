import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import Register from '../pages/Register'
import { registerUser } from '../services/authService'

vi.mock('../services/authService', () => ({
  registerUser: vi.fn(),
}))

describe('Registration', () => {
  it('should display all registration fields', () => {
    render(<Register />)

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument()
    expect(
      screen.getByLabelText(/confirm password/i)
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: /register/i })
    ).toBeInTheDocument()
  })

  it('should show validation errors for empty fields', async () => {
    const user = userEvent.setup()

    render(<Register />)

    await user.click(
      screen.getByRole('button', { name: /register/i })
    )

    expect(
      screen.getByText('Name is required')
    ).toBeInTheDocument()

    expect(
      screen.getByText('Email is required')
    ).toBeInTheDocument()

    expect(
      screen.getByText('Password is required')
    ).toBeInTheDocument()

    expect(
      screen.getByText('Confirm Password is required')
    ).toBeInTheDocument()
  })

  it('should show an error when passwords do not match', async () => {
    const user = userEvent.setup()

    render(<Register />)

    await user.type(
      screen.getByLabelText(/name/i),
      'Sravani'
    )

    await user.type(
      screen.getByLabelText(/email/i),
      'sravani@example.com'
    )

    await user.type(
      screen.getByLabelText(/^password$/i),
      'Password123'
    )

    await user.type(
      screen.getByLabelText(/confirm password/i),
      'Different123'
    )

    await user.click(
      screen.getByRole('button', { name: /register/i })
    )

    expect(
      screen.getByText('Passwords do not match')
    ).toBeInTheDocument()
  })

  it('should call registerUser with valid registration details', async () => {
    const user = userEvent.setup()

    registerUser.mockResolvedValue({
      success: true,
    })

    render(<Register />)

    await user.type(
      screen.getByLabelText(/name/i),
      'Sravani'
    )

    await user.type(
      screen.getByLabelText(/email/i),
      'sravani@example.com'
    )

    await user.type(
      screen.getByLabelText(/^password$/i),
      'Password123'
    )

    await user.type(
      screen.getByLabelText(/confirm password/i),
      'Password123'
    )

    await user.click(
      screen.getByRole('button', { name: /register/i })
    )

    expect(registerUser).toHaveBeenCalledWith({
      name: 'Sravani',
      email: 'sravani@example.com',
      password: 'Password123',
    })
  })
})