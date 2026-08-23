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

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

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

    const existingPurchases = JSON.parse(
      localStorage.getItem('purchases') || '[]'
    )

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

    localStorage.setItem(
      'purchases',
      JSON.stringify([...existingPurchases, newPurchase])
    )

    alert('Vehicle purchased successfully!')

    navigate('/purchases')
  }

  if (!vehicle) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#f4f5f7',
          padding: '50px 24px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        <div
          style={{
            background: '#fff',
            width: '100%',
            maxWidth: '600px',
            padding: '40px',
            borderRadius: '16px',
            textAlign: 'center',
            boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
          }}
        >
          <h1>Vehicle Not Found</h1>

          <p style={{ color: '#666', marginBottom: '25px' }}>
            Please select a vehicle from the inventory first.
          </p>

          <button
            onClick={() => navigate('/')}
            style={{
              background: '#111',
              color: '#fff',
              border: 'none',
              padding: '13px 25px',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Back to Inventory
          </button>
        </div>
      </div>
    )
  }

  const inputStyle = {
    width: '100%',
    height: '48px',
    padding: '0 14px',
    boxSizing: 'border-box',
    border: '1px solid #d5d7db',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    background: '#fff',
  }

  const labelStyle = {
    display: 'block',
    marginBottom: '7px',
    fontSize: '13px',
    fontWeight: '600',
    color: '#374151',
  }

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 73px)',
        background: '#f4f5f7',
        padding: '35px 24px 50px',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1150px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '28px',
          alignItems: 'stretch',
        }}
      >

        {/* ================= VEHICLE ================= */}

        <div
          style={{
            background: '#ffffff',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid #e5e7eb',
            boxShadow: '0 6px 25px rgba(0,0,0,0.06)',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '280px',
              background: '#e5e7eb',
              overflow: 'hidden',
            }}
          >
            {vehicle.image ? (
              <img
                src={vehicle.image}
                alt={vehicle.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            ) : (
              <div
                style={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#777',
                }}
              >
                No Image Available
              </div>
            )}
          </div>

          <div style={{ padding: '28px' }}>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '20px',
                paddingBottom: '20px',
                borderBottom: '1px solid #eee',
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    letterSpacing: '1.5px',
                    color: '#777',
                    marginBottom: '7px',
                  }}
                >
                  VEHICLE DETAILS
                </div>

                <h1
                  style={{
                    margin: 0,
                    fontSize: '26px',
                    color: '#111827',
                    fontWeight: '700',
                  }}
                >
                  {vehicle.name}
                </h1>
              </div>

              <div
                style={{
                  fontSize: '22px',
                  fontWeight: '800',
                  color: '#111827',
                  whiteSpace: 'nowrap',
                }}
              >
                ₹{Number(vehicle.price).toLocaleString('en-IN')}
              </div>
            </div>

            {/* DETAILS GRID */}

            <div
              style={{
                marginTop: '20px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                border: '1px solid #e5e7eb',
                borderRadius: '10px',
                overflow: 'hidden',
              }}
            >
              {[
                ['Brand', vehicle.brand],
                ['Year', vehicle.year],
                ['Fuel Type', vehicle.fuelType],
                ['Transmission', vehicle.transmission],
              ]
                .filter((item) => item[1])
                .map(([label, value], index) => (
                  <div
                    key={label}
                    style={{
                      padding: '15px',
                      background: '#fafafa',
                      borderBottom: '1px solid #e5e7eb',
                      borderRight:
                        index % 2 === 0
                          ? '1px solid #e5e7eb'
                          : 'none',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '12px',
                        color: '#777',
                        marginBottom: '5px',
                      }}
                    >
                      {label}
                    </div>

                    <strong
                      style={{
                        fontSize: '14px',
                        color: '#111827',
                      }}
                    >
                      {value}
                    </strong>
                  </div>
                ))}
            </div>

            <button
              type="button"
              onClick={() => navigate(-1)}
              style={{
                width: '100%',
                marginTop: '25px',
                height: '46px',
                background: '#fff',
                color: '#374151',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              ← Back to Inventory
            </button>
          </div>
        </div>

        {/* ================= PURCHASE FORM ================= */}

        <div
          style={{
            background: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 6px 25px rgba(0,0,0,0.06)',
            padding: '30px',
          }}
        >
          <div
            style={{
              paddingBottom: '20px',
              borderBottom: '1px solid #eee',
            }}
          >
            <div
              style={{
                fontSize: '11px',
                fontWeight: '700',
                letterSpacing: '1.5px',
                color: '#777',
                marginBottom: '7px',
              }}
            >
              SECURE CHECKOUT
            </div>

            <h2
              style={{
                margin: 0,
                fontSize: '26px',
                color: '#111827',
              }}
            >
              Complete Your Purchase
            </h2>

            <p
              style={{
                margin: '8px 0 0',
                color: '#6b7280',
                fontSize: '14px',
              }}
            >
              Enter your details to complete your vehicle purchase.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            style={{
              marginTop: '23px',
              display: 'flex',
              flexDirection: 'column',
              gap: '17px',
            }}
          >

            {/* NAME */}

            <div>
              <label htmlFor="name" style={labelStyle}>
                Full Name
              </label>

              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                style={inputStyle}
              />
            </div>

            {/* EMAIL */}

            <div>
              <label htmlFor="email" style={labelStyle}>
                Email Address
              </label>

              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                style={inputStyle}
              />
            </div>

            {/* PHONE */}

            <div>
              <label htmlFor="phone" style={labelStyle}>
                Phone Number
              </label>

              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                style={inputStyle}
              />
            </div>

            {/* ADDRESS */}

            <div>
              <label htmlFor="address" style={labelStyle}>
                Delivery Address
              </label>

              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your complete address"
                rows="4"
                style={{
                  ...inputStyle,
                  height: '105px',
                  padding: '13px 14px',
                  resize: 'vertical',
                }}
              />
            </div>

            {/* ERROR */}

            {error && (
              <div
                style={{
                  background: '#fef2f2',
                  color: '#dc2626',
                  border: '1px solid #fecaca',
                  borderRadius: '8px',
                  padding: '12px 14px',
                  fontSize: '13px',
                  fontWeight: '600',
                }}
              >
                {error}
              </div>
            )}

            {/* CONFIRM */}

            <button
              type="submit"
              style={{
                width: '100%',
                height: '48px',
                background: '#111827',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '700',
                cursor: 'pointer',
                marginTop: '2px',
              }}
            >
              Confirm Purchase
            </button>

            {/* CANCEL */}

            <button
              type="button"
              onClick={() => navigate(-1)}
              style={{
                width: '100%',
                height: '46px',
                background: '#fff',
                color: '#374151',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
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