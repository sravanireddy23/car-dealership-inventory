import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

import carImage from "../assets/car.jpg";

import { loginUser } from "../services/authService";

const Login = () => {
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  // ============================================
  // LOGIN FUNCTION
  // ============================================

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const result = await loginUser({
        email: email,
        password: password,
      });


      // ========================================
      // LOGIN SUCCESS
      // ========================================

      if (result.success) {

        if (result.user.role === "admin") {

          navigate("/admin");

        } else {

          navigate("/");

        }

        return;
      }


      // ========================================
      // LOGIN FAILED
      // ========================================

      setError(
        result.message || "Invalid email or password"
      );

    } catch (err) {

      console.error("Login error:", err);

      setError(
        "Something went wrong. Please try again."
      );

    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="login-page">


      {/* =====================================================
          LEFT SIDE - LANDING SECTION
      ===================================================== */}

      <section className="hero-section">

        {/* TOP BAR */}

        <header className="hero-top">

          <div className="brand">

            <div className="brand-icon">
              A
            </div>

            <span>
              AUTORA
            </span>

          </div>


          <div className="hero-badge">

            <span className="status-dot"></span>

            Smart Car Marketplace

          </div>

        </header>


        {/* HERO CONTENT */}

        <div className="hero-content">


          {/* CAR IMAGE */}

          <div className="car-image-wrapper">

            <img
              src={carImage}
              alt="Premium luxury car"
              className="car-image"
            />

            <div className="car-overlay">

              <span>
                PREMIUM COLLECTION
              </span>

            </div>

          </div>


          {/* HERO TEXT */}

          <div className="hero-text">

            <span className="eyebrow">
              THE FUTURE OF CAR BUYING
            </span>


            <h1>

              Your journey to the

              <span>
                {" "}perfect car{" "}
              </span>

              starts here.

            </h1>


            <p>
              Discover, compare and choose your next car
              with a smarter, simpler and more personalized
              experience.
            </p>


            {/* STATS */}

            <div className="hero-stats">

              <div className="stat-item">

                <strong>
                  10K+
                </strong>

                <span>
                  Cars Listed
                </span>

              </div>


              <div className="stat-divider"></div>


              <div className="stat-item">

                <strong>
                  5K+
                </strong>

                <span>
                  Happy Customers
                </span>

              </div>


              <div className="stat-divider"></div>


              <div className="stat-item">

                <strong>
                  4.9
                </strong>

                <span>
                  Customer Rating
                </span>

              </div>

            </div>

          </div>

        </div>


        {/* FOOTER */}

        <footer className="hero-footer">

          <span>
            © 2026 AUTORA
          </span>

          <span>
            Drive smarter. Live better.
          </span>

        </footer>

      </section>



      {/* =====================================================
          RIGHT SIDE - AUTHENTICATION
      ===================================================== */}

      <section className="auth-section">

        <div className="auth-container">


          {/* MOBILE BRAND */}

          <div className="mobile-brand">

            <div className="brand-icon">
              A
            </div>

            <span>
              AUTORA
            </span>

          </div>



          {/* AUTH HEADER */}

          <div className="auth-header">

            <div className="auth-label">

              {isAdmin
                ? "ADMIN PORTAL"
                : "WELCOME BACK"}

            </div>


            <h2>

              {isAdmin
                ? "Admin Sign In"
                : "Sign in to Autora"}

            </h2>


            <p>

              {isAdmin
                ? "Access the administration dashboard securely."
                : "Continue your journey to find the perfect car."}

            </p>

          </div>



          {/* LOGIN FORM */}

          <form
            className="login-form"
            onSubmit={handleLogin}
          >


            {/* EMAIL */}

            <div className="input-group">

              <label>

                {isAdmin
                  ? "Admin Email"
                  : "Email Address"}

              </label>


              <div className="input-wrapper">


                {/* EMAIL ICON */}

                <svg
                  viewBox="0 0 24 24"
                  className="input-icon"
                >

                  <path
                    d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />

                  <path
                    d="m22 6-10 7L2 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />

                </svg>


                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder={
                    isAdmin
                      ? "Enter admin email"
                      : "you@example.com"
                  }
                  required
                />

              </div>

            </div>



            {/* PASSWORD */}

            <div className="input-group">


              <div className="password-label">

                <label>
                  Password
                </label>


                {!isAdmin && (

                  <button
                    type="button"
                    className="forgot-password"
                  >
                    Forgot password?
                  </button>

                )}

              </div>


              <div className="input-wrapper">


                {/* LOCK ICON */}

                <svg
                  viewBox="0 0 24 24"
                  className="input-icon"
                >

                  <rect
                    x="4"
                    y="10"
                    width="16"
                    height="11"
                    rx="2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />

                  <path
                    d="M8 10V7a4 4 0 0 1 8 0v3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />

                </svg>


                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter your password"
                  required
                />


                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >

                  {showPassword
                    ? "Hide"
                    : "Show"}

                </button>

              </div>

            </div>



            {/* REMEMBER ME */}

            {!isAdmin && (

              <div className="remember-row">

                <label className="remember">

                  <input
                    type="checkbox"
                  />

                  <span>
                    Remember me
                  </span>

                </label>

              </div>

            )}



            {/* ERROR MESSAGE */}

            {error && (

              <div className="login-error">
                {error}
              </div>

            )}



            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >

              <span>

                {loading
                  ? "Signing in..."
                  : isAdmin
                    ? "Sign in as Admin"
                    : "Sign in"}

              </span>


              <span className="arrow">
                →
              </span>

            </button>

          </form>



          {/* =================================================
              USER MODE
          ================================================= */}

          {!isAdmin ? (

            <>

              {/* DIVIDER */}

              <div className="divider">
                <span>
                  OR
                </span>
              </div>



              {/* CREATE ACCOUNT */}

              <div className="signup-text">

                Don't have an account?

                <button
                  type="button"
                  onClick={() =>
                    navigate("/register")
                  }
                >
                  Create account
                </button>

              </div>



              {/* ADMIN LOGIN */}

              <button
                className="admin-login"
                type="button"
                onClick={() => {

                  setIsAdmin(true);

                  setShowPassword(false);

                  setEmail("");

                  setPassword("");

                  setError("");

                }}
              >

                <span className="admin-icon">
                  ◆
                </span>

                Sign in as Admin

              </button>

            </>

          ) : (

            /* =================================================
               ADMIN MODE
            ================================================= */

            <button
              className="back-user"
              type="button"
              onClick={() => {

                setIsAdmin(false);

                setShowPassword(false);

                setEmail("");

                setPassword("");

                setError("");

              }}
            >

              ← Back to user sign in

            </button>

          )}



          {/* SECURITY MESSAGE */}

          <div className="security-note">

            <span>
              ✓
            </span>

            Your information is protected with secure authentication

          </div>

        </div>

      </section>

    </div>
  );
};

export default Login;