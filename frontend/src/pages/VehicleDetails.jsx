import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getVehicleById } from '../services/vehicleService'

function formatPrice(price) {
  if (!Number.isFinite(Number(price))) {
    return 'Price unavailable'
  }

  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} Cr`
  }

  return `₹${(price / 100000).toFixed(2)} Lakh`
}

function VehicleDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [vehicle, setVehicle] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadVehicle = async () => {
      try {
        const data = await getVehicleById(id)
        setVehicle(data)
      } finally {
        setLoading(false)
      }
    }

    loadVehicle()
  }, [id])

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-gray-500">
          Loading vehicle...
        </p>
      </div>
    )
  }

  if (!vehicle) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Vehicle not found
        </h1>

        <button
          type="button"
          onClick={() => navigate('/')}
          className="mt-6 rounded-lg bg-black px-5 py-3 font-semibold text-white"
        >
          Back to Inventory
        </button>
      </div>
    )
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      {/* Back */}
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-6 text-sm font-medium text-gray-600 hover:text-black"
      >
        ← Back to Inventory
      </button>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Image */}
        <div className="overflow-hidden rounded-2xl bg-gray-100">
          {vehicle.image ? (
            <img
              src={vehicle.image}
              alt={`${vehicle.make} ${vehicle.model}`}
              className="h-[450px] w-full object-cover"
            />
          ) : (
            <div className="flex h-[450px] items-center justify-center">
              <div className="text-center text-gray-400">
                <p className="text-6xl">🚗</p>
                <p className="mt-3">
                  Vehicle image coming soon
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                vehicle.condition === 'New'
                  ? 'bg-green-600 text-white'
                  : 'bg-black text-white'
              }`}
            >
              {vehicle.condition === 'New'
                ? 'NEW'
                : 'PRE-OWNED'}
            </span>

            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
              {vehicle.fuelType}
            </span>
          </div>

          <h1 className="text-4xl font-bold text-gray-900">
            {vehicle.make} {vehicle.model}
          </h1>

          <p className="mt-2 text-gray-500">
            {vehicle.year} • {vehicle.bodyType}
          </p>

          <p className="mt-6 text-3xl font-bold text-gray-900">
            {formatPrice(vehicle.price)}
          </p>

          {/* Specifications */}
          <div className="mt-8 grid grid-cols-2 gap-5 rounded-2xl bg-gray-50 p-6">
            <div>
              <p className="text-xs text-gray-400">
                Odometer
              </p>

              <p className="mt-1 font-semibold text-gray-800">
                {Number(
                  vehicle.odometer || 0
                ).toLocaleString()}{' '}
                km
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">
                Mileage / Range
              </p>

              <p className="mt-1 font-semibold text-gray-800">
                {vehicle.mileage}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">
                Transmission
              </p>

              <p className="mt-1 font-semibold text-gray-800">
                {vehicle.transmission}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">
                Body Type
              </p>

              <p className="mt-1 font-semibold text-gray-800">
                {vehicle.bodyType}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">
                Colour
              </p>

              <p className="mt-1 font-semibold text-gray-800">
                {vehicle.color}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">
                Location
              </p>

              <p className="mt-1 font-semibold text-gray-800">
                {vehicle.location}
              </p>
            </div>
          </div>

          {/* Purchase */}
          {vehicle.available ? (
            <button
              type="button"
              onClick={() =>
                navigate('/purchase', {
                  state: {
                    vehicle,
                  },
                })
              }
              className="mt-8 w-full rounded-lg bg-black px-4 py-4 font-semibold text-white transition hover:bg-gray-800"
            >
              Purchase Vehicle
            </button>
          ) : (
            <div className="mt-8 rounded-lg bg-gray-200 px-4 py-4 text-center font-semibold text-gray-600">
              Vehicle Sold
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default VehicleDetails