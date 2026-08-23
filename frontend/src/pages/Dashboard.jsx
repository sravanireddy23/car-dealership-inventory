import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getVehicles } from '../services/vehicleService'
import './Dashboard.css'

function formatPrice(price) {
  const numericPrice = Number(price)

  if (!Number.isFinite(numericPrice)) {
    return 'Price unavailable'
  }

  if (numericPrice >= 10000000) {
    return `₹${(numericPrice / 10000000).toFixed(2)} Cr`
  }

  return `₹${(numericPrice / 100000).toFixed(2)} Lakh`
}

function Dashboard() {
  const [vehicles, setVehicles] = useState([])
  const [search, setSearch] = useState('')
  const [fuelFilter, setFuelFilter] = useState('All')
  const [conditionFilter, setConditionFilter] = useState('All')
  const [bodyFilter, setBodyFilter] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadVehicles()
  }, [])

  const loadVehicles = async () => {
    try {
      setLoading(true)

      const data = await getVehicles()

      console.log('Vehicles received from backend:', data)

      if (Array.isArray(data)) {
        setVehicles(data)
      } else {
        setVehicles([])
      }
    } catch (error) {
      console.error('Failed to load vehicles:', error)
      setVehicles([])
    } finally {
      setLoading(false)
    }
  }

  const filteredVehicles = vehicles.filter((vehicle) => {
    const searchText = search.toLowerCase().trim()

    const make = String(
      vehicle.make || ''
    ).toLowerCase()

    const model = String(
      vehicle.model || ''
    ).toLowerCase()

    const matchesSearch =
      searchText === '' ||
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

    // MongoDB backend uses quantity for stock
    const isAvailable =
      Number(vehicle.quantity ?? 1) > 0

    return (
      matchesSearch &&
      matchesFuel &&
      matchesCondition &&
      matchesBody &&
      isAvailable
    )
  })

  if (loading) {
    return (
      <div className="dashboard-loading">
        <p>Loading vehicles...</p>
      </div>
    )
  }

  return (
    <main className="dashboard-page">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="dashboard-hero">

        <div className="hero-content">

          <span className="hero-label">
            PREMIUM INVENTORY
          </span>

          <h1>
            Find your next car
          </h1>

          <p>
            Browse new and pre-owned cars from our
            multi-brand dealership.
          </p>

        </div>

        {/* =================================================
            FILTERS
        ================================================== */}

        <div className="filter-panel">

          <div className="filter-field">

            <label>
              Search
            </label>

            <input
              type="search"
              placeholder="Search vehicles"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />

          </div>

          <div className="filter-field">

            <label>
              Fuel Type
            </label>

            <select
              value={fuelFilter}
              onChange={(event) =>
                setFuelFilter(event.target.value)
              }
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

          </div>

          <div className="filter-field">

            <label>
              Condition
            </label>

            <select
              value={conditionFilter}
              onChange={(event) =>
                setConditionFilter(event.target.value)
              }
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

          </div>

          <div className="filter-field">

            <label>
              Body Type
            </label>

            <select
              value={bodyFilter}
              onChange={(event) =>
                setBodyFilter(event.target.value)
              }
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

        </div>

      </section>

      {/* =====================================================
          INVENTORY
      ====================================================== */}

      <section className="inventory-section">

        <div className="inventory-heading">

          <div>

            <span className="inventory-label">
              VEHICLE INVENTORY
            </span>

            <h2>
              Available vehicles
            </h2>

          </div>

          <span className="vehicle-count">
            {filteredVehicles.length} vehicles
          </span>

        </div>

        {/* =================================================
            EMPTY STATE
        ================================================== */}

        {filteredVehicles.length === 0 ? (

          <div className="empty-inventory">

            <h3>
              No vehicles found
            </h3>

            <p>
              {vehicles.length === 0
                ? 'There are currently no vehicles in the inventory.'
                : 'Try changing your search or filters.'}
            </p>

          </div>

        ) : (

          /* =================================================
             VEHICLE GRID
          ================================================== */

          <div className="vehicle-grid">

            {filteredVehicles.map((vehicle) => {

              const vehicleId =
                vehicle._id || vehicle.id

              return (

                <article
                  key={vehicleId}
                  className="vehicle-card"
                >

                  {/* =================================================
                      IMAGE
                  ================================================== */}

                  <div className="vehicle-image-container">

                    <img
                      src={
                        vehicle.image ||
                        '/cars/default-car.png'
                      }
                      alt={`${vehicle.make || ''} ${vehicle.model || ''}`}
                      className="vehicle-image"
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
                        vehicle.condition === 'New'
                          ? 'condition-badge new'
                          : 'condition-badge used'
                      }
                    >
                      {vehicle.condition === 'New'
                        ? 'NEW'
                        : 'PRE-OWNED'}
                    </span>

                    <span className="fuel-badge">
                      {vehicle.fuelType || 'Petrol'}
                    </span>

                  </div>

                  {/* =================================================
                      CONTENT
                  ================================================== */}

                  <div className="vehicle-content">

                    <div className="vehicle-heading">

                      <div>

                        <h3>
                          {vehicle.make}{' '}
                          {vehicle.model}
                        </h3>

                        <p>
                          {vehicle.year || 'Year N/A'} •{' '}
                          {vehicle.bodyType ||
                            'Vehicle'}
                        </p>

                      </div>

                    </div>

                    {/* PRICE */}

                    <div className="vehicle-price">
                      {formatPrice(vehicle.price)}
                    </div>

                    {/* =================================================
                        SPECS
                    ================================================== */}

                    <div className="vehicle-specs">

                      <div className="spec-item">

                        <span>
                          Odometer
                        </span>

                        <strong>
                          {Number(
                            vehicle.odometer || 0
                          ).toLocaleString(
                            'en-IN'
                          )}{' '}
                          km
                        </strong>

                      </div>

                      <div className="spec-item">

                        <span>
                          Mileage
                        </span>

                        <strong>
                          {vehicle.mileage ||
                            'N/A'}
                        </strong>

                      </div>

                      <div className="spec-item">

                        <span>
                          Transmission
                        </span>

                        <strong>
                          {vehicle.transmission ||
                            'N/A'}
                        </strong>

                      </div>

                      <div className="spec-item">

                        <span>
                          Body
                        </span>

                        <strong>
                          {vehicle.bodyType ||
                            'N/A'}
                        </strong>

                      </div>

                    </div>

                    {/* =================================================
                        COLORS
                    ================================================== */}

                    {Array.isArray(vehicle.colors) &&
                      vehicle.colors.length > 0 && (

                        <div className="colors-section">

                          <span>
                            Available colours
                          </span>

                          <div className="color-list">

                            {vehicle.colors
                              .slice(0, 3)
                              .map((color) => (

                                <span
                                  key={color}
                                  className={
                                    color ===
                                    vehicle.color
                                      ? 'color-tag active'
                                      : 'color-tag'
                                  }
                                >
                                  {color}
                                </span>

                              ))}

                          </div>

                        </div>

                      )}

                    {/* =================================================
                        LOCATION
                    ================================================== */}

                    <div className="vehicle-location">

                      <span>
                        📍
                      </span>

                      {vehicle.location ||
                        'Hyderabad'}

                    </div>

                    {/* =================================================
                        DETAILS BUTTON
                    ================================================== */}

                    <Link
                      to={`/vehicles/${vehicleId}`}
                      className="details-button"
                    >
                      View Details
                    </Link>

                  </div>

                </article>

              )
            })}

          </div>

        )}

      </section>

    </main>
  )
}

export default Dashboard