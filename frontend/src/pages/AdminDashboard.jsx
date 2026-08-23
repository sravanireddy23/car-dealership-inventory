import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  getVehicles,
  addVehicle,
  updateVehicle,
  deleteVehicle,
} from '../services/vehicleService'

import { logoutUser } from '../services/authService'

import './AdminDashboard.css'

function AdminDashboard() {
  const navigate = useNavigate()

  const [vehicles, setVehicles] = useState([])

  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    price: '',
    condition: 'New',
    odometer: '0',
    mileage: '',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    bodyType: 'SUV',
    location: 'Hyderabad',
    image: '',
  })

  const [editingId, setEditingId] = useState(null)
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [imagePreview, setImagePreview] = useState('')
  const [dragActive, setDragActive] = useState(false)

  const fileInputRef = useRef(null)

  useEffect(() => {
    loadVehicles()
  }, [])

  const loadVehicles = async () => {
    try {
      const data = await getVehicles()
      setVehicles(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Unable to load vehicles:', error)
      setVehicles([])
    }
  }

  /* ================= LOGOUT ================= */

  const handleLogout = () => {
    const confirmed = window.confirm(
      'Are you sure you want to logout?'
    )

    if (!confirmed) return

    logoutUser()

    navigate('/login', {
      replace: true,
    })
  }

  /* ================= FORM ================= */

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }))
  }

  const handleConditionChange = (event) => {
    const condition = event.target.value

    setFormData((previousData) => ({
      ...previousData,
      condition,
      odometer:
        condition === 'New'
          ? '0'
          : previousData.odometer === '0'
            ? ''
            : previousData.odometer,
    }))
  }

  /* ================= IMAGE ================= */

  const processImage = (file) => {
    if (!file) return

    if (!file.type.startsWith('image/')) {
      showMessage('Please select a valid image file')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      showMessage('Image must be smaller than 5MB')
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      const imageData = reader.result

      setFormData((previousData) => ({
        ...previousData,
        image: imageData,
      }))

      setImagePreview(imageData)
    }

    reader.readAsDataURL(file)
  }

  const handleImageChange = (event) => {
    processImage(event.target.files?.[0])
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setDragActive(false)

    processImage(event.dataTransfer.files?.[0])
  }

  /* ================= RESET ================= */

  const resetForm = () => {
    setFormData({
      make: '',
      model: '',
      year: '',
      price: '',
      condition: 'New',
      odometer: '0',
      mileage: '',
      fuelType: 'Petrol',
      transmission: 'Automatic',
      bodyType: 'SUV',
      location: 'Hyderabad',
      image: '',
    })

    setImagePreview('')
    setEditingId(null)

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const showMessage = (text) => {
    setMessage(text)

    setTimeout(() => {
      setMessage('')
    }, 3000)
  }

  /* ================= ADD / UPDATE ================= */

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (submitting) return

    if (!formData.make.trim()) {
      showMessage('Please enter vehicle make')
      return
    }

    if (!formData.model.trim()) {
      showMessage('Please enter vehicle model')
      return
    }

    if (!formData.year) {
      showMessage('Please enter vehicle year')
      return
    }

    if (!formData.price) {
      showMessage('Please enter vehicle price')
      return
    }

    if (!formData.mileage.trim()) {
      showMessage('Please enter mileage')
      return
    }

    if (
      formData.condition === 'Used' &&
      (!formData.odometer ||
        Number(formData.odometer) < 0)
    ) {
      showMessage('Please enter a valid odometer reading')
      return
    }

    setSubmitting(true)

    try {
      const vehicleData = {
        make: formData.make.trim(),
        model: formData.model.trim(),
        year: Number(formData.year),
        price: Number(formData.price),
        condition: formData.condition,

        odometer:
          formData.condition === 'New'
            ? 0
            : Number(formData.odometer),

        mileage: formData.mileage.trim(),
        fuelType: formData.fuelType,
        transmission: formData.transmission,
        bodyType: formData.bodyType,
        location:
          formData.location.trim() || 'Hyderabad',

        image: formData.image || '',
      }

      /* UPDATE */

      if (editingId !== null) {
        const updatedVehicle = await updateVehicle(
          editingId,
          vehicleData
        )

        if (!updatedVehicle) {
          showMessage('Vehicle could not be updated')
          return
        }

        await loadVehicles()

        showMessage('Vehicle updated successfully')

        resetForm()

        return
      }

      /* ADD */

      const newVehicle = await addVehicle(vehicleData)

      if (!newVehicle) {
        showMessage('Vehicle could not be added')
        return
      }

      await loadVehicles()

      showMessage('Vehicle added successfully')

      resetForm()
    } catch (error) {
      console.error(
        'Admin vehicle operation failed:',
        error
      )

      showMessage(
        'Something went wrong. Please try again.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  /* ================= EDIT ================= */

  const handleEdit = (vehicle) => {
    setEditingId(vehicle.id)

    setFormData({
      make: vehicle.make || '',
      model: vehicle.model || '',
      year: String(vehicle.year || ''),
      price: String(vehicle.price || ''),
      condition: vehicle.condition || 'New',
      odometer: String(vehicle.odometer ?? 0),
      mileage: String(vehicle.mileage || ''),
      fuelType: vehicle.fuelType || 'Petrol',
      transmission:
        vehicle.transmission || 'Automatic',
      bodyType: vehicle.bodyType || 'SUV',
      location: vehicle.location || 'Hyderabad',
      image: vehicle.image || '',
    })

    setImagePreview(vehicle.image || '')

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  /* ================= DELETE ================= */

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this vehicle?'
    )

    if (!confirmed) return

    try {
      const deleted = await deleteVehicle(id)

      if (!deleted) {
        showMessage('Vehicle could not be deleted')
        return
      }

      await loadVehicles()

      if (editingId === id) {
        resetForm()
      }

      showMessage('Vehicle deleted successfully')
    } catch (error) {
      console.error('Delete failed:', error)

      showMessage('Unable to delete vehicle')
    }
  }

  /* ================= STATISTICS ================= */

  const newCount = vehicles.filter(
    (vehicle) => vehicle.condition === 'New'
  ).length

  const usedCount = vehicles.filter(
    (vehicle) => vehicle.condition === 'Used'
  ).length

  const availableCount = vehicles.filter(
    (vehicle) => vehicle.available !== false
  ).length

  /* ================= UI ================= */

  return (
    <main className="admin-page">
      <div className="admin-container">

        {/* ================= HEADER ================= */}

        <header className="admin-header">

          <div>
            <span className="admin-eyebrow">
              AUTOVAULT MANAGEMENT
            </span>

            <h1>Admin Dashboard</h1>

            <p>
              Manage your vehicle inventory, pricing
              and availability.
            </p>
          </div>

          <div className="admin-header-actions">

            <div className="admin-count-box">
              <strong>{vehicles.length}</strong>

              <span>
                Total Vehicles
              </span>
            </div>

            <button
              type="button"
              className="admin-logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>

        </header>

        {/* ================= MESSAGE ================= */}

        {message && (
          <div className="admin-message">
            <span>✓</span>

            {message}
          </div>
        )}

        {/* ================= STATS ================= */}

        <section className="stats-grid">

          <div className="stat-card">
            <span>Total Inventory</span>

            <strong>{vehicles.length}</strong>

            <small>
              Vehicles listed
            </small>
          </div>

          <div className="stat-card">
            <span>New Vehicles</span>

            <strong>{newCount}</strong>

            <small>
              Brand new cars
            </small>
          </div>

          <div className="stat-card">
            <span>Used Vehicles</span>

            <strong>{usedCount}</strong>

            <small>
              Pre-owned cars
            </small>
          </div>

          <div className="stat-card">
            <span>Available</span>

            <strong>{availableCount}</strong>

            <small>
              Ready for purchase
            </small>
          </div>

        </section>

        {/* ================= FORM ================= */}

        <section className="admin-form-section">

          <div className="section-heading">

            <div>

              <span className="section-label">
                {editingId !== null
                  ? 'UPDATE INVENTORY'
                  : 'INVENTORY MANAGEMENT'}
              </span>

              <h2>
                {editingId !== null
                  ? 'Edit Vehicle'
                  : 'Add New Vehicle'}
              </h2>

            </div>

            {editingId !== null && (
              <button
                type="button"
                className="cancel-top-button"
                onClick={resetForm}
              >
                Cancel Edit
              </button>
            )}

          </div>

          <form
            className="vehicle-form"
            onSubmit={handleSubmit}
          >

            <div className="form-section-title">
              Basic Information
            </div>

            <div className="form-field">
              <label>
                Make
              </label>

              <input
                name="make"
                type="text"
                placeholder="e.g. Hyundai"
                value={formData.make}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label>
                Model
              </label>

              <input
                name="model"
                type="text"
                placeholder="e.g. Creta"
                value={formData.model}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label>
                Year
              </label>

              <input
                name="year"
                type="number"
                min="1900"
                max="2100"
                placeholder="2026"
                value={formData.year}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label>
                Price (₹)
              </label>

              <input
                name="price"
                type="number"
                min="0"
                placeholder="1090700"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-section-title">
              Vehicle Specifications
            </div>

            <div className="form-field">
              <label>
                Condition
              </label>

              <select
                value={formData.condition}
                onChange={handleConditionChange}
              >
                <option value="New">
                  New
                </option>

                <option value="Used">
                  Used
                </option>
              </select>
            </div>

            <div className="form-field">
              <label>
                Odometer
              </label>

              <input
                name="odometer"
                type="number"
                min="0"
                placeholder="24000"
                value={
                  formData.condition === 'New'
                    ? '0'
                    : formData.odometer
                }
                onChange={handleChange}
                disabled={
                  formData.condition === 'New'
                }
                required={
                  formData.condition === 'Used'
                }
              />
            </div>

            <div className="form-field">
              <label>
                Mileage
              </label>

              <input
                name="mileage"
                type="text"
                placeholder="17.4 km/l"
                value={formData.mileage}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label>
                Fuel Type
              </label>

              <select
                name="fuelType"
                value={formData.fuelType}
                onChange={handleChange}
              >
                <option>
                  Petrol
                </option>

                <option>
                  Diesel
                </option>

                <option>
                  Electric
                </option>

                <option>
                  Hybrid
                </option>
              </select>
            </div>

            <div className="form-field">
              <label>
                Transmission
              </label>

              <select
                name="transmission"
                value={formData.transmission}
                onChange={handleChange}
              >
                <option>
                  Automatic
                </option>

                <option>
                  Manual
                </option>
              </select>
            </div>

            <div className="form-field">
              <label>
                Body Type
              </label>

              <select
                name="bodyType"
                value={formData.bodyType}
                onChange={handleChange}
              >
                <option>
                  SUV
                </option>

                <option>
                  Sedan
                </option>

                <option>
                  Hatchback
                </option>

                <option>
                  Coupe
                </option>

                <option>
                  MPV
                </option>
              </select>
            </div>

            <div className="form-field">
              <label>
                Location
              </label>

              <input
                name="location"
                type="text"
                placeholder="Hyderabad"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            {/* ================= IMAGE ================= */}

            <div className="form-section-title">
              Vehicle Image
            </div>

            <div className="image-upload-field">

              {!imagePreview ? (

                <div
                  className={`upload-box ${
                    dragActive
                      ? 'drag-active'
                      : ''
                  }`}
                  onDragOver={(event) => {
                    event.preventDefault()
                    setDragActive(true)
                  }}
                  onDragLeave={() =>
                    setDragActive(false)
                  }
                  onDrop={handleDrop}
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                >

                  <div className="upload-icon">
                    ↑
                  </div>

                  <strong>
                    Upload vehicle image
                  </strong>

                  <span>
                    Drag & drop your image here or{' '}
                    <b>
                      browse files
                    </b>
                  </span>

                  <small>
                    PNG, JPG or WEBP · Maximum 5MB
                  </small>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleImageChange}
                    hidden
                  />

                </div>

              ) : (

                <div className="selected-image">

                  <img
                    src={imagePreview}
                    alt="Vehicle preview"
                  />

                  <div className="selected-image-info">

                    <strong>
                      Vehicle image selected
                    </strong>

                    <span>
                      Image ready to upload
                    </span>

                    <button
                      type="button"
                      onClick={() => {

                        setImagePreview('')

                        setFormData(
                          (previousData) => ({
                            ...previousData,
                            image: '',
                          })
                        )

                        if (
                          fileInputRef.current
                        ) {
                          fileInputRef.current.value = ''
                        }

                      }}
                    >
                      Remove image
                    </button>

                  </div>

                </div>

              )}

            </div>

            {/* ================= ACTIONS ================= */}

            <div className="form-actions">

              <button
                type="submit"
                className="primary-button"
                disabled={submitting}
              >
                {submitting
                  ? 'Saving...'
                  : editingId !== null
                    ? 'Update Vehicle'
                    : 'Add Vehicle'}
              </button>

              {editingId !== null && (

                <button
                  type="button"
                  className="secondary-button"
                  onClick={resetForm}
                  disabled={submitting}
                >
                  Cancel
                </button>

              )}

            </div>

          </form>

        </section>

        {/* ================= INVENTORY ================= */}

        <section className="management-section">

          <div className="management-heading">

            <div>

              <span className="section-label">
                VEHICLE MANAGEMENT
              </span>

              <h2>
                Inventory
              </h2>

            </div>

            <span className="total-vehicles">
              {vehicles.length} vehicles
            </span>

          </div>

          {vehicles.length === 0 ? (

            <div className="empty-state">

              <div className="empty-icon">
                🚗
              </div>

              <h3>
                No vehicles available
              </h3>

              <p>
                Add your first vehicle using
                the form above.
              </p>

            </div>

          ) : (

            <div className="admin-vehicle-grid">

              {vehicles.map((vehicle) => (

                <article
                  className="admin-vehicle-card"
                  key={vehicle.id}
                >

                  <div className="admin-image-wrapper">

                    <img
                      src={
                        vehicle.image ||
                        '/cars/default-car.png'
                      }
                      alt={`${vehicle.make} ${vehicle.model}`}
                      className="admin-vehicle-image"
                      onError={(event) => {

                        if (
                          !event.currentTarget.src.includes(
                            'default-car.png'
                          )
                        ) {
                          event.currentTarget.src =
                            '/cars/default-car.png'
                        }

                      }}
                    />

                    <span
                      className={
                        vehicle.condition === 'Used'
                          ? 'condition-badge used'
                          : 'condition-badge'
                      }
                    >
                      {vehicle.condition ||
                        'New'}
                    </span>

                    <span className="fuel-badge">
                      {vehicle.fuelType ||
                        'Petrol'}
                    </span>

                  </div>

                  <div className="admin-card-content">

                    <div className="vehicle-title-row">

                      <div>

                        <h3>
                          {vehicle.make}{' '}
                          {vehicle.model}
                        </h3>

                        <p className="vehicle-year">
                          {vehicle.year} ·{' '}
                          {vehicle.bodyType ||
                            'Vehicle'}
                        </p>

                      </div>

                      <span
                        className={
                          vehicle.available !== false
                            ? 'availability available'
                            : 'availability sold'
                        }
                      >
                        {vehicle.available !== false
                          ? 'Available'
                          : 'Sold'}
                      </span>

                    </div>

                    <div className="vehicle-price">
                      ₹
                      {Number(
                        vehicle.price || 0
                      ).toLocaleString('en-IN')}
                    </div>

                    <div className="vehicle-specs">

                      <div>
                        <span>
                          Odometer
                        </span>

                        <strong>
                          {Number(
                            vehicle.odometer ?? 0
                          ).toLocaleString(
                            'en-IN'
                          )}{' '}
                          km
                        </strong>
                      </div>

                      <div>
                        <span>
                          Mileage
                        </span>

                        <strong>
                          {vehicle.mileage ||
                            'N/A'}
                        </strong>
                      </div>

                      <div>
                        <span>
                          Transmission
                        </span>

                        <strong>
                          {vehicle.transmission ||
                            'N/A'}
                        </strong>
                      </div>

                      <div>
                        <span>
                          Fuel
                        </span>

                        <strong>
                          {vehicle.fuelType ||
                            'N/A'}
                        </strong>
                      </div>

                    </div>

                    <div className="card-actions">

                      <button
                        type="button"
                        className="edit-button"
                        onClick={() =>
                          handleEdit(vehicle)
                        }
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="delete-button"
                        onClick={() =>
                          handleDelete(
                            vehicle.id
                          )
                        }
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </article>

              ))}

            </div>

          )}

        </section>

      </div>
    </main>
  )
}

export default AdminDashboard