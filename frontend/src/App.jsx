import { Link, Route, Routes } from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/AdminDashboard'
import VehicleDetails from './pages/VehicleDetails'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">

      <nav className="border-b bg-white shadow-sm">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <Link
            to="/"
            className="text-2xl font-bold text-gray-900"
          >
            AutoVault
          </Link>

          <div className="flex items-center gap-6">

            <Link
              to="/"
              className="text-gray-700 hover:text-black"
            >
              Inventory
            </Link>

            <Link
              to="/login"
              className="text-gray-700 hover:text-black"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800"
            >
              Register
            </Link>

            <Link
              to="/admin"
              className="text-gray-700 hover:text-black"
            >
              Admin
            </Link>

          </div>

        </div>

      </nav>

      <Routes>

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/vehicle/:id"
          element={<VehicleDetails />}
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

      </Routes>

    </div>
  )
}

export default App