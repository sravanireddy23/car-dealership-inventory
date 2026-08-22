import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  getVehicles,
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

/*
  Converts the vehicle model into the folder name
  inside public/cars.

  Examples:
  Creta       -> creta
  Scorpio-N   -> scorpio-n
  3 Series    -> 3-series
  ZS EV       -> zs-ev
*/
function getCarFolder(vehicle) {
  const folderMap = {
    'Hyundai Creta': 'creta',
    'Tata Nexon': 'nexon',
    'Tata Nexon EV': 'nexon-ev',
    'Toyota Innova Hycross': 'innova-hycross',
    'Maruti Suzuki Grand Vitara': 'grand-vitara',
    'Kia Seltos': 'seltos',
    'Mahindra Scorpio-N': 'scorpio-n',
    'Toyota Fortuner': 'fortuner',
    'Hyundai i20': 'i20',
    'Maruti Suzuki Baleno': 'baleno',
    'Honda City': 'city',
    'Honda Civic': 'civic',
    'Tata Harrier': 'harrier',
    'BMW 3 Series': 'bmw-3-series',
    'Ford Mustang': 'mustang',
    'MG ZS EV': 'zs-ev',
    'Toyota Camry': 'camry',
  }

  const key = `${vehicle.make} ${vehicle.model}`

  return folderMap[key] || vehicle.model
    .toLowerCase()
    .replaceAll(' ', '-')
}

/*
  Every car has four images:

  /public/cars/creta/1.png
  /public/cars/creta/2.png
  /public/cars/creta/3.png
  /public/cars/creta/4.png

  We use image number 1 for the dashboard card.
*/
function getVehicleImage(vehicle) {
  const folder = getCarFolder(vehicle)

  return `/cars/${folder}/1.png`
}

function Dashboard() {
  const [vehicles, setVehicles] = useState([])
  const [search, setSearch] = useState('')
  const [fuelFilter, setFuelFilter] = useState('All')
  const [conditionFilter, setConditionFilter] =
    useState('All')
  const [bodyFilter, setBodyFilter] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadVehicles()
  }, [])

  const loadVehicles = async () => {
    try {
      const data = await getVehicles()
      setVehicles(data)
    } catch (error) {
      console.error(
        'Failed to load vehicles:',
        error
      )
    } finally {
      setLoading(false)
    }
  }

  const handlePurchase = async (event, id) => {
    /*
      Prevent the click from opening
      the Vehicle Details page.
    */
    event.preventDefault()
    event.stopPropagation()

    const result = await purchaseVehicle(id)

    if (result.success) {
      setVehicles((currentVehicles) =>
        currentVehicles.map((vehicle) =>
          vehicle.id === id
            ? {
                ...vehicle,
                available: false,
              }
            : vehicle
        )
      )

      alert('Vehicle purchased successfully!')
    } else {
      alert(
        result.message ||
          'Vehicle is no longer available.'
      )
    }
  }

  const filteredVehicles = vehicles.filter(
    (vehicle) => {
      const searchText = search
        .toLowerCase()
        .trim()

      const make =
        vehicle.make?.toLowerCase() || ''

      const model =
        vehicle.model?.toLowerCase() || ''

      const matchesSearch =
        make.includes(searchText) ||
        model.includes(searchText)

      const matchesFuel =
        fuelFilter === 'All' ||
        vehicle.fuelType === fuelFilter

      const matchesCondition =
        conditionFilter === 'All' ||
        vehicle.condition === conditionFilter

      const matchesBody =
        bodyFilter === 'All' ||
        vehicle.bodyType === bodyFilter

      return (
        matchesSearch &&
        matchesFuel &&
        matchesCondition &&
        matchesBody &&
        vehicle.available
      )
    }
  )

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-gray-500">
          Loading vehicles...
        </p>
      </div>
    )
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">

      {/* =========================
          HERO
      ========================== */}

      <section className="mb-10">

        <div className="mb-6">

          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-500">
            Premium inventory
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Find your next car
          </h1>

          <p className="mt-3 max-w-2xl text-gray-600">
            Browse new and pre-owned cars from
            our multi-brand dealership.
          </p>

        </div>

        {/* =========================
            FILTERS
        ========================== */}

        <div className="grid gap-4 rounded-2xl bg-white p-5 shadow-sm md:grid-cols-4">

          {/* SEARCH */}

          <input
            type="search"
            placeholder="Search vehicles"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
          />

          {/* FUEL */}

          <select
            value={fuelFilter}
            onChange={(event) =>
              setFuelFilter(event.target.value)
            }
            className="rounded-lg border border-gray-300 px-4 py-3 outline-none"
          >
            <option value="All">
              All fuel types
            </option>

            <option value="Petrol">
              Petrol
            </option>

            <option value="Diesel">
              Diesel
            </option>

            <option value="Electric">
              Electric
            </option>

            <option value="Hybrid">
              Hybrid
            </option>
          </select>

          {/* CONDITION */}

          <select
            value={conditionFilter}
            onChange={(event) =>
              setConditionFilter(
                event.target.value
              )
            }
            className="rounded-lg border border-gray-300 px-4 py-3 outline-none"
          >
            <option value="All">
              New & Used
            </option>

            <option value="New">
              New
            </option>

            <option value="Used">
              Used
            </option>
          </select>

          {/* BODY TYPE */}

          <select
            value={bodyFilter}
            onChange={(event) =>
              setBodyFilter(event.target.value)
            }
            className="rounded-lg border border-gray-300 px-4 py-3 outline-none"
          >
            <option value="All">
              All body types
            </option>

            <option value="SUV">
              SUV
            </option>

            <option value="Sedan">
              Sedan
            </option>

            <option value="Hatchback">
              Hatchback
            </option>

            <option value="Coupe">
              Coupe
            </option>

            <option value="MPV">
              MPV
            </option>
          </select>

        </div>

      </section>

      {/* =========================
          INVENTORY
      ========================== */}

      <section>

        <div className="mb-5 flex items-center justify-between">

          <h2 className="text-2xl font-bold">
            Available vehicles
          </h2>

          <span className="text-sm text-gray-500">
            {filteredVehicles.length} vehicles
          </span>

        </div>

        {/* NO VEHICLES */}

        {filteredVehicles.length === 0 ? (

          <div className="rounded-2xl bg-white p-12 text-center shadow-sm">

            <h3 className="text-xl font-semibold">
              No vehicles found
            </h3>

            <p className="mt-2 text-gray-500">
              Try changing your search or filters.
            </p>

          </div>

        ) : (

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {filteredVehicles.map(
              (vehicle) => (

                /*
                  Entire card is clickable.
                */

                <Link
                  to={`/vehicle/${vehicle.id}`}
                  key={vehicle.id}
                  className="group block overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >

                  {/* =====================
                      IMAGE
                  ====================== */}

                  <div className="relative flex h-52 items-center justify-center overflow-hidden bg-gray-100">

                    <img
                      src={getVehicleImage(vehicle)}
                      alt={`${vehicle.make} ${vehicle.model}`}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      onError={(event) => {
                        event.currentTarget.style.display =
                          'none'

                        event.currentTarget.parentElement
                          .querySelector(
                            '.image-fallback'
                          )
                          ?.classList.remove(
                            'hidden'
                          )
                      }}
                    />

                    {/* FALLBACK */}

                    <div className="image-fallback absolute inset-0 hidden items-center justify-center bg-gray-100 text-center">

                      <div>
                        <p className="text-5xl">
                          🚗
                        </p>

                        <p className="mt-2 text-sm text-gray-400">
                          Image unavailable
                        </p>
                      </div>

                    </div>

                    {/* CONDITION */}

                    <span
                      className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
                        vehicle.condition ===
                        'New'
                          ? 'bg-green-600 text-white'
                          : 'bg-black text-white'
                      }`}
                    >
                      {vehicle.condition === 'New'
                        ? 'NEW'
                        : 'PRE-OWNED'}
                    </span>

                    {/* FUEL */}

                    <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-800">
                      {vehicle.fuelType}
                    </span>

                  </div>

                  {/* =====================
                      DETAILS
                  ====================== */}

                  <div className="p-6">

                    {/* NAME */}

                    <div className="mb-4">

                      <h3 className="text-xl font-bold text-gray-900">
                        {vehicle.make}{' '}
                        {vehicle.model}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {vehicle.year} •{' '}
                        {vehicle.bodyType}
                      </p>

                    </div>

                    {/* PRICE */}

                    <p className="mb-5 text-2xl font-bold text-gray-900">
                      {formatPrice(
                        vehicle.price
                      )}
                    </p>

                    {/* SPECIFICATIONS */}

                    <div className="mb-5 grid grid-cols-2 gap-4 text-sm">

                      {/* ODOMETER */}

                      <div>

                        <p className="text-xs text-gray-400">
                          Odometer
                        </p>

                        <p className="font-medium text-gray-700">
                          {Number(
                            vehicle.odometer ||
                              0
                          ).toLocaleString()}{' '}
                          km
                        </p>

                      </div>

                      {/* MILEAGE */}

                      <div>

                        <p className="text-xs text-gray-400">
                          Mileage / Range
                        </p>

                        <p className="font-medium text-gray-700">
                          {vehicle.mileage}
                        </p>

                      </div>

                      {/* TRANSMISSION */}

                      <div>

                        <p className="text-xs text-gray-400">
                          Transmission
                        </p>

                        <p className="font-medium text-gray-700">
                          {vehicle.transmission}
                        </p>

                      </div>

                      {/* BODY */}

                      <div>

                        <p className="text-xs text-gray-400">
                          Body
                        </p>

                        <p className="font-medium text-gray-700">
                          {vehicle.bodyType}
                        </p>

                      </div>

                    </div>

                    {/* COLOURS */}

                    <div className="mb-5">

                      <p className="mb-2 text-xs text-gray-400">
                        Available colours
                      </p>

                      <div className="flex flex-wrap gap-2">

                        {(vehicle.colors || [])
                          .map(
                            (color) => (

                              <span
                                key={color}
                                className={`rounded-full border px-2.5 py-1 text-xs ${
                                  color ===
                                  vehicle.color
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

                    {/* LOCATION */}

                    <p className="mb-5 text-sm text-gray-500">
                      📍 {vehicle.location}
                    </p>

                    {/* PURCHASE BUTTON */}

                    <button
                      type="button"
                      onClick={(event) =>
                        handlePurchase(
                          event,
                          vehicle.id
                        )
                      }
                      className="w-full rounded-lg bg-black px-4 py-3 font-semibold text-white transition hover:bg-gray-800"
                    >
                      Purchase Vehicle
                    </button>

                  </div>

                </Link>

              )
            )}

          </div>

        )}

      </section>

    </main>
  )
}

export default Dashboard