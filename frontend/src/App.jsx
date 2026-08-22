import { Link, Route, Routes } from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/AdminDashboard'
import VehicleDetails from './pages/VehicleDetails'
import Purchase from './pages/Purchase'
import Purchases from './pages/Purchases'

function App() {
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

            <Link
              to="/purchases"
              className="text-gray-700 hover:text-black"
            >
              My Purchases
            </Link>

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

        {/* INVENTORY */}
        <Route
          path="/"
          element={<Dashboard />}
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* REGISTER */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        {/* VEHICLE DETAILS */}
        <Route
          path="/vehicles/:id"
          element={<VehicleDetails />}
        />

        {/* PURCHASE FORM */}
        <Route
          path="/purchase"
          element={<Purchase />}
        />

        {/* PURCHASE HISTORY */}
        <Route
          path="/purchases"
          element={<Purchases />}
        />

      </Routes>

    </div>
  )
}

export default App