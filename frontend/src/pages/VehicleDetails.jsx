import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  getVehicleById,
  purchaseVehicle,
} from '../services/vehicleService'

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

  const [vehicle, setVehicle] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [purchased, setPurchased] = useState(false)

  useEffect(() => {
    const loadVehicle = async () => {
      const data = await getVehicleById(id)
      setVehicle(data)
      setLoading(false)
    }

    loadVehicle()
  }, [id])

  const handlePurchase = async () => {
    if (!vehicle) return

    const result = await purchaseVehicle(vehicle.id)

    if (result.success) {
      setVehicle((current) => ({
        ...current,
        available: false,
      }))

      setPurchased(true)
    }
  }

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
      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
          <h1 className="text-2xl font-bold">
            Vehicle not found
          </h1>

          <Link
            to="/"
            className="mt-6 inline-block rounded-lg bg-black px-5 py-3 font-semibold text-white"
          >
            Back to Inventory
          </Link>
        </div>
      </main>
    )
  }

  const carFolder = vehicle.model
    .toLowerCase()
    .replaceAll(' ', '-')
    .replaceAll('–', '-')

  const images = [
    `/cars/${carFolder}/1.png`,
    `/cars/${carFolder}/2.png`,
    `/cars/${carFolder}/3.png`,
    `/cars/${carFolder}/4.png`,
  ]

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">

      {/* BACK */}
      <Link
        to="/"
        className="mb-8 inline-flex items-center text-sm font-medium text-gray-600 hover:text-black"
      >
        ← Back to Inventory
      </Link>

      <div className="grid gap-10 lg:grid-cols-2">

        {/* IMAGE SECTION */}
        <section>

          {/* Main Image */}
          <div className="relative overflow-hidden rounded-2xl bg-gray-100">
            <img
              src={images[selectedImage]}
              alt={`${vehicle.make} ${vehicle.model}`}
              className="h-[500px] w-full object-cover"
            />

            <span
              className={`absolute left-4 top-4 rounded-full px-4 py-2 text-sm font-semibold ${
                vehicle.condition === 'New'
                  ? 'bg-green-600 text-white'
                  : 'bg-black text-white'
              }`}
            >
              {vehicle.condition === 'New'
                ? 'NEW'
                : 'PRE-OWNED'}
            </span>
          </div>

          {/* Thumbnails */}
          <div className="mt-4 grid grid-cols-4 gap-3">
            {images.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setSelectedImage(index)}
                className={`overflow-hidden rounded-lg border-2 ${
                  selectedImage === index
                    ? 'border-black'
                    : 'border-transparent'
                }`}
              >
                <img
                  src={image}
                  alt={`${vehicle.model} ${index + 1}`}
                  className="h-24 w-full object-cover"
                />
              </button>
            ))}
          </div>
        </section>

        {/* DETAILS */}
        <section>

          <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            {vehicle.condition === 'New'
              ? 'New Vehicle'
              : 'Pre-Owned Vehicle'}
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900">
            {vehicle.make} {vehicle.model}
          </h1>

          <p className="mt-3 text-gray-500">
            {vehicle.year} • {vehicle.bodyType}
          </p>

          <p className="mt-6 text-4xl font-bold">
            {formatPrice(vehicle.price)}
          </p>

          {/* SPECS */}
          <div className="mt-8 grid grid-cols-2 gap-4">

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-xs text-gray-400">
                Fuel Type
              </p>

              <p className="mt-1 font-semibold">
                {vehicle.fuelType}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-xs text-gray-400">
                Transmission
              </p>

              <p className="mt-1 font-semibold">
                {vehicle.transmission}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-xs text-gray-400">
                Odometer
              </p>

              <p className="mt-1 font-semibold">
                {Number(
                  vehicle.odometer || 0
                ).toLocaleString()} km
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-xs text-gray-400">
                Mileage / Range
              </p>

              <p className="mt-1 font-semibold">
                {vehicle.mileage}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-xs text-gray-400">
                Body Type
              </p>

              <p className="mt-1 font-semibold">
                {vehicle.bodyType}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-xs text-gray-400">
                Location
              </p>

              <p className="mt-1 font-semibold">
                {vehicle.location}
              </p>
            </div>

          </div>

          {/* COLOURS */}
          <div className="mt-8">

            <p className="mb-3 text-sm font-semibold">
              Available Colours
            </p>

            <div className="flex flex-wrap gap-2">
              {(vehicle.colors || []).map(
                (color) => (
                  <span
                    key={color}
                    className={`rounded-full border px-3 py-2 text-sm ${
                      color === vehicle.color
                        ? 'border-black bg-black text-white'
                        : 'border-gray-200 bg-gray-50 text-gray-700'
                    }`}
                  >
                    {color}
                  </span>
                )
              )}
            </div>

          </div>

          {/* PURCHASE */}
          <div className="mt-8">

            {!vehicle.available || purchased ? (
              <div className="rounded-xl bg-gray-100 p-4 text-center font-semibold text-gray-600">
                Vehicle Sold
              </div>
            ) : (
              <button
                type="button"
                onClick={handlePurchase}
                className="w-full rounded-xl bg-black px-6 py-4 text-lg font-semibold text-white transition hover:bg-gray-800"
              >
                Purchase Vehicle
              </button>
            )}

          </div>

        </section>

      </div>
    </main>
  )
}

export default VehicleDetails