import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import Dashboard from '../pages/Dashboard'
import {
  getVehicles,
  purchaseVehicle,
} from '../services/vehicleService'

vi.mock('../services/vehicleService', () => ({
  getVehicles: vi.fn(),
  purchaseVehicle: vi.fn(),
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
  {
    id: 2,
    make: 'Honda',
    model: 'Civic',
    year: 2023,
    price: 24500,
    mileage: 18000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    available: true,
  },
]

describe('Dashboard', () => {
  it('should display available vehicles', async () => {
    getVehicles.mockResolvedValue(mockVehicles)

    render(<Dashboard />)

    await waitFor(() => {
        expect(
            screen.getByRole('heading', {
                name: /find your next car/i,
            })
        ).toBeInTheDocument()

      expect(
        screen.getByText('Toyota Camry')
      ).toBeInTheDocument()

      expect(
        screen.getByText('Honda Civic')
      ).toBeInTheDocument()
    })
  })

  it('should search vehicles by make or model', async () => {
    getVehicles.mockResolvedValue(mockVehicles)

    const user = userEvent.setup()

    render(<Dashboard />)

    await waitFor(() => {
      expect(
        screen.getByText('Toyota Camry')
      ).toBeInTheDocument()
    })

    const searchInput = screen.getByPlaceholderText(
      /search vehicles/i
    )

    await user.type(searchInput, 'Honda')

    expect(
      screen.getByText('Honda Civic')
    ).toBeInTheDocument()

    expect(
      screen.queryByText('Toyota Camry')
    ).not.toBeInTheDocument()
  })

  it('should purchase an available vehicle', async () => {
    getVehicles.mockResolvedValue(mockVehicles)

    purchaseVehicle.mockResolvedValue({
      success: true,
      vehicle: mockVehicles[0],
    })

    const user = userEvent.setup()

    render(<Dashboard />)

    await waitFor(() => {
      expect(
        screen.getByText('Toyota Camry')
      ).toBeInTheDocument()
    })

    const purchaseButtons = screen.getAllByRole(
      'button',
      {
        name: /purchase/i,
      }
    )

    await user.click(purchaseButtons[0])

    expect(purchaseVehicle).toHaveBeenCalledWith(1)
  })
})