import { Link } from 'react-router-dom'

function Purchases() {
  const purchases = JSON.parse(
    localStorage.getItem('purchases') || '[]'
  )

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-6xl">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            My Purchases
          </h1>

          <p className="mt-2 text-gray-600">
            View your purchased vehicles.
          </p>
        </div>

        {purchases.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">
              No purchases yet
            </h2>

            <p className="mt-2 text-gray-500">
              You haven't purchased any vehicles yet.
            </p>

            <Link
              to="/"
              className="mt-6 inline-block rounded-lg bg-black px-5 py-3 font-semibold text-white hover:bg-gray-800"
            >
              Browse Inventory
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {purchases.map((purchase, index) => (
              <div
                key={purchase.id || index}
                className="overflow-hidden rounded-xl bg-white shadow-sm"
              >

                {purchase.image && (
                  <img
                    src={purchase.image}
                    alt={purchase.name || 'Vehicle'}
                    className="h-52 w-full object-cover"
                  />
                )}

                <div className="p-5">

                  <h2 className="text-xl font-bold text-gray-900">
                    {purchase.name || 'Vehicle'}
                  </h2>

                  {purchase.price && (
                    <p className="mt-2 text-lg font-semibold text-gray-900">
                      ₹{purchase.price}
                    </p>
                  )}

                  <p className="mt-3 font-medium text-green-600">
                    ✓ Purchase successful
                  </p>

                  {purchase.date && (
                    <p className="mt-1 text-sm text-gray-500">
                      Purchased on: {purchase.date}
                    </p>
                  )}

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default Purchases
