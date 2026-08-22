import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import AdminDashboard from '../pages/AdminDashboard'
import {
  getVehicles,
  addVehicle,
  deleteVehicle,
} from '../services/vehicleService'

vi.mock('../services/vehicleService', () => ({
  getVehicles: vi.fn(),
  addVehicle: vi.fn(),
  updateVehicle: vi.fn(),
  deleteVehicle: vi.fn(),
}))

const mockVehicles = [
  {
    id: 1,
    make: 'Toyota',
    model: 'Camry',
    year: 2024,
    price: 28500,
    mileage: 12000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    available: true,
  },
]

describe('Admin Dashboard', () => {
  it('should display vehicle management', async () => {
    getVehicles.mockResolvedValue(mockVehicles)

    render(<AdminDashboard />)

    expect(
      screen.getByRole('heading', {
        name: /admin dashboard/i,
      })
    ).toBeInTheDocument()

    await waitFor(() => {
      expect(
        screen.getByText('Toyota Camry')
      ).toBeInTheDocument()
    })
  })

  it('should add a new vehicle', async () => {
    getVehicles.mockResolvedValue([])

    addVehicle.mockResolvedValue({
      id: 2,
      make: 'Audi',
      model: 'A4',
      year: 2024,
      price: 40000,
      mileage: 5000,
      fuelType: 'Petrol',
      transmission: 'Automatic',
      available: true,
    })

    const user = userEvent.setup()

    render(<AdminDashboard />)

    await user.type(
      screen.getByLabelText(/make/i),
      'Audi'
    )

    await user.type(
      screen.getByLabelText(/model/i),
      'A4'
    )

    await user.type(
      screen.getByLabelText(/year/i),
      '2024'
    )

    await user.type(
      screen.getByLabelText(/price/i),
      '40000'
    )

    await user.type(
      screen.getByLabelText(/mileage/i),
      '5000'
    )

    await user.click(
      screen.getByRole('button', {
        name: /add vehicle/i,
      })
    )

    await waitFor(() => {
      expect(addVehicle).toHaveBeenCalledWith({
        make: 'Audi',
        model: 'A4',
        year: 2024,
        price: 40000,
        mileage: 5000,
        fuelType: 'Petrol',
        transmission: 'Automatic',
      })
    })
  })

  it('should delete a vehicle', async () => {
    getVehicles.mockResolvedValue(mockVehicles)

    deleteVehicle.mockResolvedValue(true)

    const user = userEvent.setup()

    render(<AdminDashboard />)

    await waitFor(() => {
      expect(
        screen.getByText('Toyota Camry')
      ).toBeInTheDocument()
    })

    await user.click(
      screen.getByRole('button', {
        name: /delete/i,
      })
    )

    expect(deleteVehicle).toHaveBeenCalledWith(1)
  })
})