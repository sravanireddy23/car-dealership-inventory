# AutoVault — Car Dealership Inventory Management System

<p align="center">
  <strong>AutoVault</strong> is a full-stack vehicle inventory and dealership management platform designed to manage vehicle listings, authentication, inventory operations, and customer purchases through a modern web interface.
</p>

<p align="center">
  React • TypeScript • Node.js • Express • MongoDB • JWT • Mongoose
</p>

---

## Overview

AutoVault is a full-stack car dealership inventory management system built with a modern frontend and RESTful backend architecture.

The application provides separate experiences for customers and administrators:

- Customers can browse available vehicles, search and filter inventory, view vehicle details, and purchase vehicles.
- Administrators can securely manage dealership inventory by adding, editing, deleting, and restocking vehicles.
- Authentication and authorization are handled using JWT-based authentication with role-based access control.

The project focuses on clean architecture, reusable components, API-driven communication, and maintainable code organization.

---

## Key Features

### Customer Features

- User registration and login
- JWT-based authentication
- Browse available vehicle inventory
- Search vehicles by make and model
- Filter vehicles by:
  - Fuel type
  - Condition
  - Body type
- View detailed vehicle information
- Purchase available vehicles
- View purchase-related information
- Responsive and modern user interface

### Admin Features

- Secure administrator authentication
- Admin dashboard
- Inventory statistics
- Add new vehicles
- Edit existing vehicle information
- Delete vehicles
- Restock vehicles
- Upload vehicle images
- Vehicle condition management
- Inventory availability tracking
- Real-time inventory refresh after operations

### Backend Features

- RESTful API architecture
- JWT authentication
- Role-based authorization
- MongoDB database integration
- Mongoose ODM
- Request validation
- Centralized error handling
- Vehicle search and filtering
- Inventory quantity management
- Purchase transaction handling
- Admin-only inventory operations

---

## Technology Stack

### Frontend

- React
- React Router
- JavaScript / JSX
- CSS
- Vite
- Fetch API

### Backend

- Node.js
- Express.js
- TypeScript
- JWT
- bcrypt
- Mongoose

### Database

- MongoDB
- MongoDB Atlas

### Development Tools

- Git
- GitHub
- VS Code
- npm
- TypeScript
- Vite

---

## System Architecture

```text
                         ┌──────────────────────┐
                         │      AutoVault       │
                         │    React Frontend    │
                         └──────────┬───────────┘
                                    │
                              REST API / HTTP
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │     Express API      │
                         │      TypeScript      │
                         └──────────┬───────────┘
                                    │
                    ┌───────────────┼────────────────┐
                    │               │                │
                    ▼               ▼                ▼
              Authentication    Vehicle API     Purchase API
                    │               │                │
                    └───────────────┼────────────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │       MongoDB        │
                         │       Mongoose       │
                         └──────────────────────┘




                         Project Structure
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
Authentication & Authorization

AutoVault uses JWT-based authentication.

Authentication Flow
User
 │
 ▼
Login / Register
 │
 ▼
Backend Authentication API
 │
 ▼
Credentials Validation
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

Authenticated requests use:

Authorization: Bearer <JWT_TOKEN>
Roles

The system supports role-based access:

USER
 ├── Browse vehicles
 ├── Search / filter vehicles
 ├── View vehicle details
 └── Purchase vehicles

ADMIN
 ├── All user capabilities
 ├── Add vehicles
 ├── Update vehicles
 ├── Delete vehicles
 └── Restock vehicles
REST API
Authentication
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Authenticate user
Vehicles
Method	Endpoint	Access	Description
GET	/api/vehicles	Authenticated	Get available vehicles
GET	/api/vehicles/search	Authenticated	Search vehicles
POST	/api/vehicles	Authenticated	Add a vehicle
PUT	/api/vehicles/:id	Authenticated	Update vehicle
DELETE	/api/vehicles/:id	Admin	Delete vehicle
POST	/api/vehicles/:id/purchase	Authenticated	Purchase vehicle
POST	/api/vehicles/:id/restock	Admin	Restock vehicle
Vehicle Data Model

A vehicle contains information such as:

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

Inventory availability is controlled using the quantity field.

Vehicles with:

quantity > 0

are considered available inventory.

Environment Variables

Create a .env file inside the backend directory.

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
Important

Do not commit .env files or production secrets to GitHub.

Use:

.env

inside .gitignore.

Installation
1. Clone the repository
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd car-dealership-inventory
2. Install backend dependencies
cd backend
npm install
3. Configure environment variables

Create:

backend/.env

and add:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
4. Start the backend
npm run dev

The backend will run on:

http://localhost:5000
Frontend Setup

Open a new terminal:

cd frontend
npm install

Start the frontend:

npm run dev

The frontend will typically run on:

http://localhost:5173
Database Setup

AutoVault uses MongoDB.

Make sure MongoDB is running and the connection string is correctly configured in:

backend/.env

Example:

MONGO_URI=mongodb+srv://<username>:<password>@<cluster>/<database>
Admin Setup

An administrator can be created using the backend admin creation script.

cd backend
npx tsx createAdmin.ts

Use the credentials configured by the administrator creation script.

Never publish real administrator passwords or secrets in the repository.

Vehicle Seeding

Sample vehicle inventory can be inserted using:

cd backend
npx tsx seedVehicles.ts

This can be useful for development and testing.

Running the Application

Start the backend:

cd backend
npm run dev

Then start the frontend in another terminal:

cd frontend
npm run dev

Application flow:

Frontend
   ↓
Login / Register
   ↓
Dashboard
   ↓
Vehicle Inventory
   ↓
Vehicle Details
   ↓
Purchase

Admin flow:

Admin Login
   ↓
Admin Dashboard
   ↓
Inventory Management
   ├── Add Vehicle
   ├── Edit Vehicle
   ├── Delete Vehicle
   └── Restock Vehicle
Security Considerations

The project follows several security practices:

Passwords are hashed before storage.
Authentication is handled using JWT.
Protected API endpoints require authentication.
Administrative operations require admin authorization.
Environment variables are used for sensitive configuration.
Database credentials should never be committed to source control.

For production deployment, additional measures should be considered, including:

HTTPS
Secure cookies
Refresh-token rotation
Rate limiting
Input sanitization
CORS restrictions
Security headers
Production secret management
Comprehensive API validation
Testing

Backend tests are located under:

backend/tests/

Current test areas include:

auth.test.ts
vehicle.test.ts

Run the configured test command from the backend directory:

npm test
Development Principles

The project follows a modular architecture separating:

Routes
   ↓
Controllers
   ↓
Services
   ↓
Models
   ↓
Database

This separation improves:

Maintainability
Testability
Scalability
Code readability
Separation of responsibilities

The frontend follows a component/page/service-based structure so API communication remains separated from UI logic.

Future Enhancements

Potential improvements for future versions include:

Advanced vehicle search
Price range filtering
Pagination
Vehicle comparison
Wishlist functionality
Customer profiles
Purchase history
Payment gateway integration
Email notifications
Cloud image storage
Admin analytics
Sales reports
Dashboard charts
Audit logging
Deployment using Docker
CI/CD pipeline
Automated testing and code coverage
Project Status

Status: Completed — Development Version

The current implementation includes:

Authentication
Authorization
Customer dashboard
Admin dashboard
Vehicle CRUD operations
Inventory management
Vehicle search and filtering
Vehicle purchase functionality
Vehicle restocking
MongoDB persistence
Responsive UI
Backend validation and middleware
Contributing

Contributions are welcome.

To contribute:

git clone <YOUR_GITHUB_REPOSITORY_URL>
cd car-dealership-inventory

Create a feature branch:

git checkout -b feature/your-feature

Make your changes, test them, and commit:

git add .
git commit -m "feat: add your feature"

Push the branch:

git push origin feature/your-feature

Then open a Pull Request.

Git Commit Convention

Recommended commit prefixes:

feat:     New functionality
fix:      Bug fix
refactor: Code restructuring
style:    UI / formatting changes
docs:     Documentation
test:     Tests
chore:    Maintenance

Example:

git commit -m "feat: implement vehicle inventory management"
License

This project is intended for educational, portfolio, and development purposes.

Add an appropriate open-source license before distributing the project publicly.

Author

Sravani Reddy Gavinolla

B.Tech — Computer Science & Engineering

GitHub: sravanireddy23
