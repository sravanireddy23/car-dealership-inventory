
import { Link, Route, Routes, useNavigate } from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/AdminDashboard'
import VehicleDetails from './pages/VehicleDetails'
import Purchase from './pages/Purchase'
import Purchases from './pages/Purchases'

import {
  getCurrentUser,
  logoutUser,
} from './services/authService'

function App() {
  const navigate = useNavigate()
  const currentUser = getCurrentUser()

  const handleLogout = () => {
    logoutUser()
    navigate('/')
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* NAVBAR */}
      <nav className="border-b bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          {/* LOGO */}
          <Link
            to="/"
            className="text-2xl font-bold text-gray-900"
          >
            AutoVault
          </Link>

          {/* NAVIGATION */}
          <div className="flex items-center gap-6">

            <Link
              to="/"
              className="text-gray-700 hover:text-black"
            >
              Inventory
            </Link>

            {currentUser && (
              <Link
                to="/purchases"
                className="text-gray-700 hover:text-black"
              >
                My Purchases
              </Link>
            )}

            {!currentUser && (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-black"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="rounded-lg bg-black px-4 py-2 text-white transition hover:bg-gray-800"
                >
                  Register
                </Link>
              </>
            )}

            {currentUser && (
              <>
                <span className="font-medium text-gray-700">
                  Hi, {currentUser.name}
                </span>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </>
            )}

            <Link
              to="/admin"
              className="text-gray-700 hover:text-black"
            >
              Admin
            </Link>

          </div>
        </div>
      </nav>

      {/* ROUTES */}
      <Routes>

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/vehicles/:id"
          element={<VehicleDetails />}
        />

        <Route
          path="/purchase"
          element={<Purchase />}
        />

        <Route
          path="/purchases"
          element={<Purchases />}
        />

      </Routes>

    </div>
  )
}

export default App
