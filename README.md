# AutoVault — Car Dealership Inventory Management System

> A full-stack vehicle inventory and dealership management platform built with React, Node.js, Express, TypeScript, and MongoDB.

---

## 📌 Overview

**AutoVault** is a full-stack car dealership inventory management system designed to provide a modern and efficient platform for managing vehicle inventory and customer purchases.

The application provides separate experiences for **customers** and **administrators**.

Customers can browse vehicles, search and filter inventory, view detailed vehicle information, and purchase available vehicles.

Administrators can securely manage the dealership inventory by adding, editing, deleting, and restocking vehicles.

The project follows a modular architecture with a React frontend, RESTful Express backend, JWT authentication, role-based authorization, and MongoDB persistence.

---

## ✨ Key Features

### 👤 Customer Features

- User registration and login
- JWT-based authentication
- Browse available vehicles
- Search vehicles by make and model
- Filter vehicles by:
  - Fuel type
  - Condition
  - Body type
- View detailed vehicle information
- Purchase available vehicles
- Inventory availability tracking
- Responsive user interface

### 👨‍💼 Admin Features

- Secure administrator authentication
- Admin dashboard
- Inventory statistics
- Add new vehicles
- Edit existing vehicles
- Delete vehicles
- Restock vehicles
- Upload vehicle images
- Manage vehicle condition
- Manage pricing and specifications
- Track vehicle availability

### ⚙️ Backend Features

- RESTful API architecture
- JWT authentication
- Role-based authorization
- MongoDB integration
- Mongoose ODM
- Request validation
- Authentication middleware
- Admin authorization middleware
- Vehicle search and filtering
- Inventory quantity management
- Vehicle purchase handling
- Centralized error handling

---

# 🛠️ Technology Stack

## Frontend

- React
- React Router
- JavaScript / JSX
- CSS
- Vite
- Fetch API

## Backend

- Node.js
- Express.js
- TypeScript
- JWT
- bcrypt
- Mongoose

## Database

- MongoDB
- MongoDB Atlas

## Development Tools

- Git
- GitHub
- VS Code
- npm
- TypeScript
- Vite

---

# 🏗️ Project Architecture

```text
                         ┌─────────────────────────┐
                         │        AutoVault        │
                         │      React Frontend     │
                         └────────────┬────────────┘
                                      │
                                      │ REST API
                                      ▼
                         ┌─────────────────────────┐
                         │      Express Server     │
                         │       TypeScript        │
                         └────────────┬────────────┘
                                      │
                    ┌─────────────────┼─────────────────┐
                    │                 │                 │
                    ▼                 ▼                 ▼
             Authentication      Vehicle API      Purchase API
                    │                 │                 │
                    └─────────────────┼─────────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │        MongoDB          │
                         │        Mongoose         │
                         └─────────────────────────┘
```

---

# 📁 Project Structure

```text
car-dealership-inventory/
│
├── backend/
│   │
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts
│   │   │
│   │   ├── controllers/
│   │   │   ├── authController.ts
│   │   │   └── vehicleController.ts
│   │   │
│   │   ├── middleware/
│   │   │   ├── authMiddleware.ts
│   │   │   └── errorMiddleware.ts
│   │   │
│   │   ├── models/
│   │   │   ├── User.ts
│   │   │   ├── Vehicle.ts
│   │   │   └── Purchase.ts
│   │   │
│   │   ├── routes/
│   │   │   ├── authRoutes.ts
│   │   │   └── vehicleRoutes.ts
│   │   │
│   │   ├── services/
│   │   │   ├── authService.ts
│   │   │   └── vehicleService.ts
│   │   │
│   │   ├── validators/
│   │   │   ├── authValidator.ts
│   │   │   └── vehicleValidator.ts
│   │   │
│   │   ├── app.ts
│   │   └── server.ts
│   │
│   ├── tests/
│   │   ├── auth.test.ts
│   │   └── vehicle.test.ts
│   │
│   ├── createAdmin.ts
│   ├── seedVehicles.ts
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   │
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── VehicleDetails.jsx
│   │   │   ├── Purchase.jsx
│   │   │   └── Purchases.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   └── vehicleService.js
│   │   │
│   │   └── App.jsx
│   │
│   └── package.json
│
├── .gitignore
└── README.md
```

---

# 🔐 Authentication & Authorization

AutoVault uses **JWT-based authentication** to secure protected resources.

## Authentication Flow

```text
User
 │
 ▼
Login / Register
 │
 ▼
Backend Authentication API
 │
 ▼
Credential Validation
 │
 ▼
JWT Token Generated
 │
 ▼
Frontend Stores Token
 │
 ▼
Authorization Header
 │
 ▼
Protected API Routes
```

Authenticated requests use:

```http
Authorization: Bearer <JWT_TOKEN>
```

---

# 👥 User Roles

The system supports role-based access control.

## USER

```text
USER
 ├── Browse vehicles
 ├── Search vehicles
 ├── Filter inventory
 ├── View vehicle details
 └── Purchase vehicles
```

## ADMIN

```text
ADMIN
 ├── All user capabilities
 ├── Add vehicles
 ├── Update vehicles
 ├── Delete vehicles
 └── Restock vehicles
```

---

# 🌐 REST API

## Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Authenticate user |

## Vehicles

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/vehicles` | Authenticated | Get available vehicles |
| GET | `/api/vehicles/search` | Authenticated | Search vehicles |
| POST | `/api/vehicles` | Authenticated | Add a vehicle |
| PUT | `/api/vehicles/:id` | Authenticated | Update vehicle |
| DELETE | `/api/vehicles/:id` | Admin | Delete vehicle |
| POST | `/api/vehicles/:id/purchase` | Authenticated | Purchase vehicle |
| POST | `/api/vehicles/:id/restock` | Admin | Restock vehicle |

---

# 🚗 Vehicle Data Model

A vehicle contains information such as:

```text
make
model
category
price
quantity
year
condition
mileage
fuelType
transmission
bodyType
location
image
createdAt
updatedAt
```

Inventory availability is controlled using the `quantity` field.

Vehicles with:

```text
quantity > 0
```

are considered available inventory.

---

# 🔑 Environment Variables

Create a `.env` file inside the `backend` directory.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
```

### ⚠️ Important

Never commit `.env` files, database credentials, JWT secrets, or production credentials to GitHub.

Your `.gitignore` should include:

```gitignore
node_modules/
.env
.env.*
!.env.example
dist/
coverage/
*.log
```

---

# 🚀 Installation

## 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd car-dealership-inventory
```

---

## 2. Install Backend Dependencies

```bash
cd backend
npm install
```

---

## 3. Configure Environment Variables

Create:

```text
backend/.env
```

Add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
```

---

## 4. Start the Backend

```bash
npm run dev
```

Backend:

```text
http://localhost:5000
```

---

# 💻 Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
```

Start the frontend:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# 🗄️ Database Setup

AutoVault uses **MongoDB** for persistent data storage.

Make sure MongoDB is configured and the connection string is available in:

```text
backend/.env
```

Example:

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>/<database>
```

---

# 👨‍💼 Admin Setup

An administrator can be created using the backend admin creation script.

```bash
cd backend
npx tsx createAdmin.ts
```

Use the credentials configured by the administrator creation script.

> Never publish real administrator passwords or secrets in the repository.

---

# 🌱 Vehicle Seeding

Sample vehicle inventory can be inserted using:

```bash
cd backend
npx tsx seedVehicles.ts
```

This is useful for development and testing.

---

# ▶️ Running the Application

Start the backend:

```bash
cd backend
npm run dev
```

Then open another terminal and start the frontend:

```bash
cd frontend
npm run dev
```

---

# 🔄 Customer Application Flow

```text
Frontend
   ↓
Login / Register
   ↓
Dashboard
   ↓
Vehicle Inventory
   ↓
Search / Filter
   ↓
Vehicle Details
   ↓
Purchase
```

---

# 🔄 Admin Application Flow

```text
Admin Login
   ↓
Admin Dashboard
   ↓
Inventory Management
   ├── Add Vehicle
   ├── Edit Vehicle
   ├── Delete Vehicle
   └── Restock Vehicle
```

---

# 🛡️ Security Considerations

The project implements several security practices:

- Password hashing
- JWT-based authentication
- Protected API endpoints
- Role-based authorization
- Admin-only inventory operations
- Environment variables for sensitive configuration
- MongoDB authentication
- Request validation

For production deployment, additional security measures should be considered:

- HTTPS
- Secure cookies
- Refresh-token rotation
- Rate limiting
- Input sanitization
- Strict CORS configuration
- Security headers
- Production secret management
- Comprehensive API validation
- Logging and monitoring

---

# 🧪 Testing

Backend tests are located under:

```text
backend/tests/
```

Current test files include:

```text
auth.test.ts
vehicle.test.ts
```

Run:

```bash
npm test
```

from the backend directory.

---

# 🧩 Development Architecture

The backend follows a modular architecture:

```text
Routes
   ↓
Controllers
   ↓
Services
   ↓
Models
   ↓
Database
```

This separation improves:

- Maintainability
- Testability
- Scalability
- Code readability
- Separation of responsibilities

The frontend follows a page/service-based architecture where API communication is separated from UI components.

---

# 🔮 Future Enhancements

Potential improvements include:

- Advanced vehicle search
- Price range filtering
- Pagination
- Vehicle comparison
- Wishlist functionality
- Customer profiles
- Purchase history
- Payment gateway integration
- Email notifications
- Cloud image storage
- Admin analytics
- Sales reports
- Dashboard charts
- Audit logging
- Docker deployment
- CI/CD pipeline
- Automated testing
- Code coverage
- Production deployment

---

# 📊 Project Status

**Status: Completed — Development Version**

Current implementation includes:

- ✅ User authentication
- ✅ Admin authentication
- ✅ JWT authorization
- ✅ Customer dashboard
- ✅ Admin dashboard
- ✅ Vehicle CRUD operations
- ✅ Inventory management
- ✅ Vehicle search
- ✅ Vehicle filtering
- ✅ Vehicle purchase functionality
- ✅ Vehicle restocking
- ✅ MongoDB persistence
- ✅ Vehicle image upload
- ✅ Responsive UI
- ✅ Backend validation
- ✅ Authentication middleware
- ✅ Admin authorization middleware
- ✅ Error handling

---

# 🤝 Contributing

Contributions are welcome.

Clone the repository:

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd car-dealership-inventory
```

Create a feature branch:

```bash
git checkout -b feature/your-feature
```

Make your changes and test them.

Commit:

```bash
git add .
git commit -m "feat: add your feature"
```

Push:

```bash
git push origin feature/your-feature
```

Then create a Pull Request.

---

# 📝 Git Commit Convention

Recommended commit prefixes:

```text
feat:      New functionality
fix:       Bug fix
refactor:  Code restructuring
style:     UI / formatting
docs:      Documentation
test:      Tests
chore:     Maintenance
```

Example:

```bash
git commit -m "feat: implement vehicle inventory management"
```

---

# 📄 License

This project is intended for educational, portfolio, and development purposes.

Add an appropriate open-source license before distributing the project publicly.

---

# 👩‍💻 Author

## Sravani Reddy Gavinolla

**B.Tech — Computer Science & Engineering**

GitHub:

```text
sravanireddy23
```

---

<p align="center">
  <strong>AutoVault</strong>
  <br>
  Modern vehicle inventory management for a smarter dealership experience.
</p>