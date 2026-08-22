import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Purchase() {
  const location = useLocation()
  const navigate = useNavigate()

  const vehicle = location.state?.vehicle

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  })

  const [error, setError] = useState('')

  // If no vehicle was selected
  if (!vehicle) {
    return (
      <div className="min-h-screen bg-gray-100 px-6 py-10">
        <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 text-center shadow">
          <h1 className="text-2xl font-bold text-gray-900">
            Vehicle Not Found
          </h1>

          <p className="mt-2 text-gray-600">
            Please select a vehicle from the inventory first.
          </p>

          <button
            type="button"
            onClick={() => navigate('/')}
            className="mt-6 rounded-lg bg-black px-6 py-3 font-semibold text-white hover:bg-gray-800"
          >
            Back to Inventory
          </button>
        </div>
      </div>
    )
  }

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  // Handle purchase
  const handleSubmit = (event) => {
    event.preventDefault()

    // Validate form
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.address.trim()
    ) {
      setError('Please fill in all the fields.')
      return
    }

    setError('')

    // Get previous purchases
    const existingPurchases = JSON.parse(
      localStorage.getItem('purchases') || '[]'
    )

    // Create new purchase
    const newPurchase = {
      id: vehicle.id,
      name: vehicle.name,
      price: vehicle.price,
      image: vehicle.image,
      brand: vehicle.brand,
      year: vehicle.year,
      fuelType: vehicle.fuelType,
      transmission: vehicle.transmission,

      customerName: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,

      date: new Date().toLocaleString(),
    }

    // Save purchase
    localStorage.setItem(
      'purchases',
      JSON.stringify([
        ...existingPurchases,
        newPurchase,
      ])
    )

    // Show success message
    alert('Vehicle purchased successfully!')

    // Go to purchases page
    navigate('/purchases')
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">

        {/* VEHICLE INFORMATION */}
        <div className="rounded-xl bg-white p-6 shadow-sm">

          {vehicle.image && (
            <img
              src={vehicle.image}
              alt={vehicle.name}
              className="mb-6 h-72 w-full rounded-lg object-cover"
            />
          )}

          <h1 className="text-3xl font-bold text-gray-900">
            {vehicle.name}
          </h1>

          <p className="mt-3 text-2xl font-bold text-gray-900">
            ₹{vehicle.price}
          </p>

          {vehicle.brand && (
            <p className="mt-6 text-gray-600">
              <span className="font-semibold text-gray-900">
                Brand:
              </span>{' '}
              {vehicle.brand}
            </p>
          )}

          {vehicle.year && (
            <p className="mt-3 text-gray-600">
              <span className="font-semibold text-gray-900">
                Year:
              </span>{' '}
              {vehicle.year}
            </p>
          )}

          {vehicle.fuelType && (
            <p className="mt-3 text-gray-600">
              <span className="font-semibold text-gray-900">
                Fuel:
              </span>{' '}
              {vehicle.fuelType}
            </p>
          )}

          {vehicle.transmission && (
            <p className="mt-3 text-gray-600">
              <span className="font-semibold text-gray-900">
                Transmission:
              </span>{' '}
              {vehicle.transmission}
            </p>
          )}

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-8 w-full rounded-lg border border-gray-300 px-4 py-3 font-semibold text-gray-700 hover:bg-gray-100"
          >
            Back
          </button>

        </div>

        {/* PURCHASE FORM */}
        <div className="rounded-xl bg-white p-6 shadow-sm">

          <h2 className="text-2xl font-bold text-gray-900">
            Complete Your Purchase
          </h2>

          <p className="mt-2 text-gray-600">
            Enter your details to purchase this vehicle.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-5"
          >

            {/* NAME */}
            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
              />
            </div>

            {/* PHONE */}
            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Phone Number
              </label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
              />
            </div>

            {/* ADDRESS */}
            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Address
              </label>

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                rows="4"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
              />
            </div>

            {/* ERROR */}
            {error && (
              <p className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-600">
                {error}
              </p>
            )}

            {/* CONFIRM PURCHASE */}
            <button
              type="submit"
              className="w-full rounded-lg bg-black px-4 py-3 font-semibold text-white hover:bg-gray-800"
            >
              Confirm Purchase
            </button>

            {/* CANCEL */}
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 font-semibold text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>

          </form>
        </div>

      </div>
    </div>
  )
}

export default Purchase

