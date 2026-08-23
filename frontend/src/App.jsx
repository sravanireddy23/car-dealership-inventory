import { useEffect, useState } from "react";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import VehicleDetails from "./pages/VehicleDetails";
import Purchase from "./pages/Purchase";
import Purchases from "./pages/Purchases";

import AdminRoute from "./components/AdminRoute";

import {
  getCurrentUser,
  logoutUser,
} from "./services/authService";


function App() {

  const navigate = useNavigate();
  const location = useLocation();

  const [currentUser, setCurrentUser] = useState(null);


  useEffect(() => {

    const user = getCurrentUser();

    setCurrentUser(user);

  }, []);


  const handleLogout = () => {

    logoutUser();

    setCurrentUser(null);

    navigate("/login");

  };


  /*
   * Do not show the main application navbar
   * on the AUTORA login page.
   */

  const isLoginPage = location.pathname === "/login";


  return (
    <div className="min-h-screen bg-gray-100">

      {/* =========================================
          MAIN NAVBAR
          Hidden on Login page
      ========================================= */}

      {!isLoginPage && (

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
                className="text-gray-700 transition hover:text-black"
              >
                Inventory
              </Link>


              <Link
                to="/purchases"
                className="text-gray-700 transition hover:text-black"
              >
                My Purchases
              </Link>


              {currentUser ? (

                <>

                  <span className="font-medium text-gray-700">
                    Hi, {currentUser.name}
                  </span>


                  <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 transition hover:bg-gray-100"
                  >
                    Logout
                  </button>

                </>

              ) : (

                <>

                  <Link
                    to="/login"
                    className="text-gray-700 transition hover:text-black"
                  >
                    Login
                  </Link>


                  <Link
                    to="/register"
                    className="rounded-lg bg-black px-4 py-2 font-semibold text-white transition hover:bg-gray-800"
                  >
                    Register
                  </Link>

                </>

              )}


              {currentUser?.role === 'admin' && (
                <Link
                  to="/admin"
                  className="text-gray-700 transition hover:text-black"
                >
                  Admin
                </Link>
              )}
              

            </div>

          </div>

        </nav>

      )}


      {/* =========================================
          ROUTES
      ========================================= */}

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
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />


        {/* VEHICLE DETAILS */}

        <Route
          path="/vehicles/:id"
          element={<VehicleDetails />}
        />


        {/* PURCHASE */}

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
  );
}

export default App;