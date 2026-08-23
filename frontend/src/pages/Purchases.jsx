import { Link } from 'react-router-dom'
import './Purchases.css'

function Purchases() {
  const purchases = JSON.parse(
    localStorage.getItem('purchases') || '[]'
  )

  return (
    <div className="purchases-page">
      <div className="purchases-container">

        <div className="purchases-header">
          <div>
            <span className="purchases-label">YOUR GARAGE</span>
            <h1>My Purchases</h1>
            <p>View and manage the vehicles you have purchased.</p>
          </div>

          <Link to="/" className="browse-btn">
            Browse Inventory
          </Link>
        </div>

        {purchases.length === 0 ? (
          <div className="empty-purchases">
            <div className="empty-icon">🚗</div>

            <h2>No purchases yet</h2>

            <p>
              You haven't purchased any vehicles yet.
              Explore our inventory and find your perfect car.
            </p>

            <Link to="/" className="empty-btn">
              Explore Inventory
            </Link>
          </div>
        ) : (
          <>
            <div className="purchase-count">
              {purchases.length} {purchases.length === 1 ? 'Vehicle' : 'Vehicles'} Purchased
            </div>

            <div className="purchase-grid">
              {purchases.map((purchase, index) => (
                <div
                  className="purchase-card"
                  key={purchase.id || index}
                >
                  <div className="purchase-image">
                    {purchase.image ? (
                      <img
                        src={purchase.image}
                        alt={purchase.name || 'Vehicle'}
                      />
                    ) : (
                      <div className="no-image">
                        🚗
                      </div>
                    )}

                    <span className="success-badge">
                      ✓ Purchased
                    </span>
                  </div>

                  <div className="purchase-content">

                    <div className="vehicle-title-row">
                      <div>
                        <span className="vehicle-label">
                          VEHICLE
                        </span>

                        <h2>
                          {purchase.name || 'Vehicle'}
                        </h2>
                      </div>

                      {purchase.price && (
                        <strong className="vehicle-price">
                          ₹{Number(purchase.price).toLocaleString('en-IN')}
                        </strong>
                      )}
                    </div>

                    <div className="vehicle-details">

                      {purchase.brand && (
                        <div>
                          <span>Brand</span>
                          <strong>{purchase.brand}</strong>
                        </div>
                      )}

                      {purchase.year && (
                        <div>
                          <span>Year</span>
                          <strong>{purchase.year}</strong>
                        </div>
                      )}

                      {purchase.fuelType && (
                        <div>
                          <span>Fuel</span>
                          <strong>{purchase.fuelType}</strong>
                        </div>
                      )}

                      {purchase.transmission && (
                        <div>
                          <span>Transmission</span>
                          <strong>{purchase.transmission}</strong>
                        </div>
                      )}

                    </div>

                    {purchase.date && (
                      <div className="purchase-date">
                        <span>Purchase Date</span>
                        <strong>{purchase.date}</strong>
                      </div>
                    )}

                    <div className="purchase-status">
                      <span className="status-dot"></span>
                      Purchase completed successfully
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  )
}

export default Purchases