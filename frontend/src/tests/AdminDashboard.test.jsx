import { useEffect, useState } from "react";
import {
  getVehicles,
  addVehicle,
  updateVehicle,
  deleteVehicle,
} from "../services/vehicleService";

import "./AdminDashboard.css";

function AdminDashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    price: "",
    mileage: "",
    fuelType: "Petrol",
    transmission: "Automatic",
  });

  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadVehicles = async () => {
      const data = await getVehicles();
      setVehicles(data);
    };

    loadVehicles();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      make: "",
      model: "",
      year: "",
      price: "",
      mileage: "",
      fuelType: "Petrol",
      transmission: "Automatic",
    });

    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const vehicleData = {
      make: formData.make,
      model: formData.model,
      year: Number(formData.year),
      price: Number(formData.price),
      mileage: formData.mileage,
      fuelType: formData.fuelType,
      transmission: formData.transmission,
    };

    if (editingId !== null) {
      const updatedVehicle = await updateVehicle(
        editingId,
        vehicleData
      );

      if (updatedVehicle) {
        setVehicles((previousVehicles) =>
          previousVehicles.map((vehicle) =>
            vehicle.id === editingId
              ? updatedVehicle
              : vehicle
          )
        );

        setMessage("Vehicle updated successfully");
      }
    } else {
      const newVehicle = await addVehicle(vehicleData);

      setVehicles((previousVehicles) => [
        ...previousVehicles,
        newVehicle,
      ]);

      setMessage("Vehicle added successfully");
    }

    resetForm();

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const handleEdit = (vehicle) => {
    setEditingId(vehicle.id);

    setFormData({
      make: vehicle.make || "",
      model: vehicle.model || "",
      year: String(vehicle.year || ""),
      price: String(vehicle.price || ""),
      mileage: String(vehicle.mileage || ""),
      fuelType: vehicle.fuelType || "Petrol",
      transmission: vehicle.transmission || "Automatic",
    });

    setMessage(
      `Editing ${vehicle.make} ${vehicle.model}`
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this vehicle?"
    );

    if (!confirmed) {
      return;
    }

    const deleted = await deleteVehicle(id);

    if (deleted) {
      setVehicles((previousVehicles) =>
        previousVehicles.filter(
          (vehicle) => vehicle.id !== id
        )
      );

      setMessage("Vehicle deleted successfully");

      if (editingId === id) {
        resetForm();
      }

      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  const filteredVehicles = vehicles.filter((vehicle) => {
    const searchText = search.toLowerCase();

    return (
      vehicle.make
        .toLowerCase()
        .includes(searchText) ||
      vehicle.model
        .toLowerCase()
        .includes(searchText)
    );
  });

  return (
    <div className="admin-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="admin-container">

        <div className="admin-header">

          <div>
            <div className="admin-eyebrow">
              AUTORA / ADMINISTRATION
            </div>

            <h1>
              Admin Dashboard
            </h1>

            <p>
              Manage your vehicle inventory and marketplace listings.
            </p>
          </div>

          <div className="admin-status">
            <span></span>
            System Online
          </div>

        </div>


        {/* =====================================================
            SUCCESS MESSAGE
        ===================================================== */}

        {message && (
          <div className="admin-message">
            <span>✓</span>
            {message}
          </div>
        )}


        {/* =====================================================
            INVENTORY OVERVIEW
        ===================================================== */}

        <div className="admin-stats">

          <div className="admin-stat-card">

            <div className="stat-icon">
              ◆
            </div>

            <div>
              <span>Total Vehicles</span>
              <strong>{vehicles.length}</strong>
            </div>

          </div>


          <div className="admin-stat-card">

            <div className="stat-icon">
              ◇
            </div>

            <div>
              <span>Available Listings</span>
              <strong>{vehicles.length}</strong>
            </div>

          </div>


          <div className="admin-stat-card">

            <div className="stat-icon">
              ₹
            </div>

            <div>
              <span>Inventory Value</span>

              <strong>
                ₹
                {vehicles
                  .reduce(
                    (total, vehicle) =>
                      total + Number(vehicle.price || 0),
                    0
                  )
                  .toLocaleString("en-IN")}
              </strong>

            </div>

          </div>

        </div>


        {/* =====================================================
            ADD / EDIT VEHICLE
        ===================================================== */}

        <section className="admin-form-card">

          <div className="section-heading">

            <div>

              <span>
                {editingId !== null
                  ? "INVENTORY UPDATE"
                  : "INVENTORY MANAGEMENT"}
              </span>

              <h2>
                {editingId !== null
                  ? "Edit Vehicle"
                  : "Add New Vehicle"}
              </h2>

            </div>

            {editingId !== null && (
              <button
                type="button"
                className="cancel-top-button"
                onClick={resetForm}
              >
                Cancel Edit
              </button>
            )}

          </div>


          <form
            onSubmit={handleSubmit}
            className="vehicle-form"
          >

            {/* MAKE */}

            <div className="form-field">

              <label htmlFor="make">
                Make
              </label>

              <input
                id="make"
                name="make"
                type="text"
                value={formData.make}
                onChange={handleChange}
                placeholder="e.g. Hyundai"
                required
              />

            </div>


            {/* MODEL */}

            <div className="form-field">

              <label htmlFor="model">
                Model
              </label>

              <input
                id="model"
                name="model"
                type="text"
                value={formData.model}
                onChange={handleChange}
                placeholder="e.g. Creta"
                required
              />

            </div>


            {/* YEAR */}

            <div className="form-field">

              <label htmlFor="year">
                Year
              </label>

              <input
                id="year"
                name="year"
                type="number"
                value={formData.year}
                onChange={handleChange}
                placeholder="2026"
                required
              />

            </div>


            {/* PRICE */}

            <div className="form-field">

              <label htmlFor="price">
                Price
              </label>

              <div className="input-prefix">

                <span>₹</span>

                <input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="1000000"
                  required
                />

              </div>

            </div>


            {/* MILEAGE */}

            <div className="form-field">

              <label htmlFor="mileage">
                Mileage
              </label>

              <input
                id="mileage"
                name="mileage"
                type="text"
                value={formData.mileage}
                onChange={handleChange}
                placeholder="e.g. 18 km/l"
                required
              />

            </div>


            {/* FUEL */}

            <div className="form-field">

              <label htmlFor="fuelType">
                Fuel Type
              </label>

              <select
                id="fuelType"
                name="fuelType"
                value={formData.fuelType}
                onChange={handleChange}
              >

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


            {/* TRANSMISSION */}

            <div className="form-field">

              <label htmlFor="transmission">
                Transmission
              </label>

              <select
                id="transmission"
                name="transmission"
                value={formData.transmission}
                onChange={handleChange}
              >

                <option value="Automatic">
                  Automatic
                </option>

                <option value="Manual">
                  Manual
                </option>

              </select>

            </div>


            {/* BUTTON */}

            <div className="form-actions">

              <button
                type="submit"
                className="primary-admin-button"
              >

                {editingId !== null
                  ? "Update Vehicle"
                  : "Add Vehicle"}

                <span>
                  →
                </span>

              </button>

            </div>

          </form>

        </section>


        {/* =====================================================
            VEHICLE MANAGEMENT
        ===================================================== */}

        <section className="vehicle-management">

          <div className="management-header">

            <div>

              <span className="section-label">
                INVENTORY
              </span>

              <h2>
                Vehicle Management
              </h2>

            </div>

            <div className="vehicle-count">
              {filteredVehicles.length}
              <span> vehicles</span>
            </div>

          </div>


          {/* SEARCH */}

          <div className="search-container">

            <span className="search-icon">
              ⌕
            </span>

            <input
              type="text"
              placeholder="Search by make or model..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />

            {search && (
              <button
                type="button"
                className="clear-search"
                onClick={() => setSearch("")}
              >
                ×
              </button>
            )}

          </div>


          {/* VEHICLES */}

          <div className="vehicle-grid">

            {filteredVehicles.map((vehicle) => (

              <article
                key={vehicle.id}
                className="vehicle-card"
              >

                {/* IMAGE */}

                {vehicle.image ? (

                  <div className="vehicle-image-wrapper">

                    <img
                      src={vehicle.image}
                      alt={`${vehicle.make} ${vehicle.model}`}
                      className="vehicle-image"
                    />

                    <div className="vehicle-tag">
                      AVAILABLE
                    </div>

                  </div>

                ) : (

                  <div className="vehicle-image-placeholder">

                    <span>
                      AUTORA
                    </span>

                    <small>
                      PREMIUM VEHICLE
                    </small>

                  </div>

                )}


                {/* CONTENT */}

                <div className="vehicle-content">

                  <div className="vehicle-title-row">

                    <div>

                      <span className="vehicle-make">
                        {vehicle.make}
                      </span>

                      <h3>
                        {vehicle.model}
                      </h3>

                    </div>

                    <span className="vehicle-year">
                      {vehicle.year}
                    </span>

                  </div>


                  {/* PRICE */}

                  <div className="vehicle-price">

                    ₹
                    {Number(
                      vehicle.price
                    ).toLocaleString("en-IN")}

                  </div>


                  {/* DETAILS */}

                  <div className="vehicle-details">

                    <div>
                      <span>FUEL</span>
                      <strong>
                        {vehicle.fuelType}
                      </strong>
                    </div>

                    <div>
                      <span>TRANSMISSION</span>
                      <strong>
                        {vehicle.transmission}
                      </strong>
                    </div>

                    <div>
                      <span>MILEAGE</span>
                      <strong>
                        {vehicle.mileage}
                      </strong>
                    </div>

                  </div>


                  {/* ACTIONS */}

                  <div className="vehicle-actions">

                    <button
                      type="button"
                      className="edit-button"
                      onClick={() =>
                        handleEdit(vehicle)
                      }
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="delete-button"
                      onClick={() =>
                        handleDelete(vehicle.id)
                      }
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </article>

            ))}

          </div>


          {/* EMPTY */}

          {filteredVehicles.length === 0 && (

            <div className="empty-state">

              <div>
                ⌕
              </div>

              <h3>
                No vehicles found
              </h3>

              <p>
                Try changing your search or add a new vehicle.
              </p>

            </div>

          )}

        </section>

      </div>

    </div>
  );
}

export default AdminDashboard;