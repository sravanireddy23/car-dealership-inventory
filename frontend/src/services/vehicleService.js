const API_URL = 'http://localhost:5000/api/vehicles'

const getAuthHeaders = () => {
  const token = localStorage.getItem('autovault_token')

  return token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {}
}

// GET ALL VEHICLES
export const getVehicles = async () => {
  const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      ...getAuthHeaders(),
    },
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.message || 'Failed to fetch vehicles'
    )
  }

  return data.vehicles || data
}

// GET VEHICLE BY ID
export const getVehicleById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'GET',
    headers: {
      ...getAuthHeaders(),
    },
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.message || 'Vehicle not found'
    )
  }

  return data.vehicle || data
}

// ADD VEHICLE
export const addVehicle = async (vehicleData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(vehicleData),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.message || 'Failed to add vehicle'
    )
  }

  return data.vehicle || data
}

// UPDATE VEHICLE
export const updateVehicle = async (
  id,
  vehicleData
) => {
  const response = await fetch(
    `${API_URL}/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(vehicleData),
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.message || 'Failed to update vehicle'
    )
  }

  return data.vehicle || data
}

// DELETE VEHICLE
export const deleteVehicle = async (id) => {
  const response = await fetch(
    `${API_URL}/${id}`,
    {
      method: 'DELETE',
      headers: {
        ...getAuthHeaders(),
      },
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.message || 'Failed to delete vehicle'
    )
  }

  return true
}

// PURCHASE VEHICLE
export const purchaseVehicle = async (id) => {
  const response = await fetch(
    `${API_URL}/${id}/purchase`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.message || 'Failed to purchase vehicle'
    )
  }

  return data
}