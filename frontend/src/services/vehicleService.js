import { getAuthHeaders } from './authService'

const API_URL = 'http://localhost:5000/api/vehicles'

const authHeaders = () => ({
  ...getAuthHeaders(),
  'Content-Type': 'application/json',
})

export const getVehicles = async () => {
  const response = await fetch(API_URL, {
    headers: authHeaders(),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch vehicles')
  }

  return data.vehicles || data
}

export const getVehicleById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    headers: authHeaders(),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Vehicle not found')
  }

  return data.vehicle || data
}

export const addVehicle = async (vehicleData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(vehicleData),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Failed to add vehicle')
  }

  return data.vehicle || data
}

export const updateVehicle = async (id, vehicleData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(vehicleData),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Failed to update vehicle')
  }

  return data.vehicle || data
}

export const deleteVehicle = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Failed to delete vehicle')
  }

  return true
}

export const purchaseVehicle = async (id) => {
  const response = await fetch(`${API_URL}/${id}/purchase`, {
    method: 'POST',
    headers: authHeaders(),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Failed to purchase vehicle')
  }

  return data
}
