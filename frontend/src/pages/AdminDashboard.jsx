import { useEffect, useState } from 'react'
import {
  getVehicles,
  addVehicle,
  updateVehicle,
  deleteVehicle,
} from '../services/vehicleService'

function AdminDashboard() {
  const [vehicles, setVehicles] = useState([])

  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    price: '',
    mileage: '',
    fuelType: 'Petrol',
    transmission: 'Automatic',
  })

  const [editingId, setEditingId] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const loadVehicles = async () => {
      const data = await getVehicles()
      setVehicles(data)
    }

    loadVehicles()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }))
  }

  const resetForm = () => {
    setFormData({
      make: '',
      model: '',
      year: '',
      price: '',
      mileage: '',
      fuelType: 'Petrol',
      transmission: 'Automatic',
    })

    setEditingId(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const vehicleData = {
      make: formData.make,
      model: formData.model,
      year: Number(formData.year),
      price: Number(formData.price),
      mileage: Number(formData.mileage),
      fuelType: formData.fuelType,
      transmission: formData.transmission,
    }

    if (editingId) {
      const updatedVehicle = await updateVehicle(
        editingId,
        vehicleData
      )

      setVehicles((previousVehicles) =>
        previousVehicles.map((vehicle) =>
          vehicle.id === editingId
            ? updatedVehicle
            : vehicle
        )
      )

      setMessage('Vehicle updated successfully')
    } else {
      const newVehicle = await addVehicle(vehicleData)

      setVehicles((previousVehicles) => [
        ...previousVehicles,
        newVehicle,
      ])

      setMessage('Vehicle added successfully')
    }

    resetForm()
  }

  const handleEdit = (vehicle) => {
    setEditingId(vehicle.id)

    setFormData({
      make: vehicle.make,
      model: vehicle.model,
      year: String(vehicle.year),
      price: String(vehicle.price),
      mileage: String(vehicle.mileage),
      fuelType: vehicle.fuelType,
      transmission: vehicle.transmission,
    })
  }

  const handleDelete = async (id) => {
    const deleted = await deleteVehicle(id)

    if (deleted) {
      setVehicles((previousVehicles) =>
        previousVehicles.filter(
          (vehicle) => vehicle.id !== id
        )
      )

      setMessage('Vehicle deleted successfully')
    }
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>

      {message && <p>{message}</p>}

      <section>
        <h2>
          {editingId ? 'Edit Vehicle' : 'Add Vehicle'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="make">Make</label>

            <input
              id="make"
              name="make"
              type="text"
              value={formData.make}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="model">Model</label>

            <input
              id="model"
              name="model"
              type="text"
              value={formData.model}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="year">Year</label>

            <input
              id="year"
              name="year"
              type="number"
              value={formData.year}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="price">Price</label>

            <input
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="mileage">Mileage</label>

            <input
              id="mileage"
              name="mileage"
              type="number"
              value={formData.mileage}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="fuelType">Fuel Type</label>

            <select
              id="fuelType"
              name="fuelType"
              value={formData.fuelType}
              onChange={handleChange}
            >
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div>
            <label htmlFor="transmission">
              Transmission
            </label>

            <select
              id="transmission"
              name="transmission"
              value={formData.transmission}
              onChange={handleChange}
            >
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>

          <button type="submit">
            {editingId ? 'Update Vehicle' : 'Add Vehicle'}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
            >
              Cancel
            </button>
          )}
        </form>
      </section>

      <section>
        <h2>Vehicle Management</h2>

        {vehicles.length === 0 ? (
          <p>No vehicles available</p>
        ) : (
          vehicles.map((vehicle) => (
            <article key={vehicle.id}>
              <h3>
                {vehicle.make} {vehicle.model}
              </h3>

              <p>Year: {vehicle.year}</p>

              <p>
                Price: $
                {vehicle.price.toLocaleString()}
              </p>

              <button
                type="button"
                onClick={() => handleEdit(vehicle)}
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() => handleDelete(vehicle.id)}
              >
                Delete
              </button>
            </article>
          ))
        )}
      </section>
    </div>
  )
}

export default AdminDashboard