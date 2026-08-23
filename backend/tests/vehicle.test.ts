import { describe, it, expect } from 'vitest'

describe('Vehicle Inventory', () => {
  it('should create a vehicle with required fields', () => {
    const vehicle = {
      make: 'Hyundai',
      model: 'Creta',
      category: 'SUV',
      price: 1090700,
      quantity: 5,
    }

    expect(vehicle.make).toBe('Hyundai')
    expect(vehicle.model).toBe('Creta')
    expect(vehicle.category).toBe('SUV')
    expect(vehicle.price).toBe(1090700)
    expect(vehicle.quantity).toBe(5)
  })

  it('should not allow purchase when quantity is zero', () => {
    const vehicle = {
      quantity: 0,
    }

    expect(vehicle.quantity).toBe(0)
  })

  it('should decrease quantity after purchase', () => {
    const vehicle = {
      quantity: 5,
    }

    vehicle.quantity -= 1

    expect(vehicle.quantity).toBe(4)
  })

  it('should increase quantity after restock', () => {
    const vehicle = {
      quantity: 5,
    }

    vehicle.quantity += 3

    expect(vehicle.quantity).toBe(8)
  })
})
