# PROMPTS.md

# AutoVault — AI-Assisted Development Prompts & Chat Log

This document records the AI-assisted development interactions used during
the implementation of the AutoVault Car Dealership Inventory System.

AI Tool Used:

- ChatGPT

The AI assistant was used as a development support tool for architecture,
implementation, debugging, UI development, API integration, documentation,
and Git workflow guidance.

The developer reviewed and tested the generated suggestions before integrating
them into the project.

---

# 1. Project Initialization & Architecture

## User

We need to build a full-stack Car Dealership Inventory System as a TDD Kata.

The system should have:

- User registration and login
- JWT authentication
- MongoDB database
- Vehicle inventory
- Vehicle search and filtering
- Vehicle purchase
- Admin vehicle management
- Vehicle restocking
- React frontend
- Backend REST API
- Testing
- Git/GitHub workflow
- Professional documentation

The backend will use Node.js/TypeScript with Express and MongoDB.

The frontend will use React.

## AI Assistant

Provided guidance for structuring the project into separate frontend and
backend applications, including:

- Express backend
- TypeScript
- MongoDB/Mongoose
- JWT authentication
- React frontend
- Authentication services
- Vehicle services
- Controllers
- Routes
- Models
- Middleware
- Validators
- Tests

Recommended a modular architecture separating routes, controllers, services,
models, and database access.

---

# 2. Backend Project Structure

## User

The backend should have a structure similar to:

backend/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── validators/
│   ├── app.ts
│   └── server.ts
├── tests/
├── createAdmin.ts
├── seedVehicles.ts
├── package.json
└── tsconfig.json

## AI Assistant

Helped organize the backend into modular layers:

Routes
↓
Controllers
↓
Services
↓
Models
↓
MongoDB

The structure was designed to improve maintainability, testability, and
separation of responsibilities.

---

# 3. MongoDB Vehicle Model

## User

The vehicle model needs to support:

- make
- model
- category
- price
- quantity
- year
- condition
- mileage
- fuelType
- transmission
- bodyType
- location
- image

## AI Assistant

Helped implement a Mongoose Vehicle model using TypeScript.

The model includes required fields for:

- make
- model
- category
- price
- quantity

Optional vehicle information includes:

- year
- condition
- mileage
- fuelType
- transmission
- bodyType
- location
- image

The quantity field is used to determine inventory availability.

---

# 4. Authentication

## User

I need registration and login functionality with JWT authentication.

## AI Assistant

Helped implement authentication using:

- User registration
- User login
- Password hashing
- JWT token generation
- JWT token storage on the frontend
- Authorization headers
- Authentication middleware
- Role-based authorization

The frontend stores authentication information using localStorage.

Authenticated API requests use:

Authorization: Bearer <JWT_TOKEN>

---

# 5. Admin Authentication

## User

I need an admin login for the AutoVault application.

## AI Assistant

Helped configure the application to support an administrator account and
role-based access.

The administrator can access protected inventory-management operations.

The admin account is created through the backend admin creation script.

Real credentials are intentionally not stored in the repository or README.

---

# 6. Vehicle REST API

## User

The application needs these vehicle endpoints:

POST /api/vehicles

GET /api/vehicles

GET /api/vehicles/search

PUT /api/vehicles/:id

DELETE /api/vehicles/:id

POST /api/vehicles/:id/purchase

POST /api/vehicles/:id/restock

## AI Assistant

Helped implement the REST API using Express routes and controller functions.

The routes were protected using authentication middleware.

Administrative operations such as delete and restock require admin
authorization.

---

# 7. Vehicle Controller

## User

The vehicle controller should support creating, reading, updating, deleting,
purchasing, searching, and restocking vehicles.

## AI Assistant

Helped implement controller operations including:

- createVehicle
- getVehicles
- searchVehicles
- updateVehicle
- deleteVehicle
- purchaseVehicle
- restockVehicle

The GET endpoint returns vehicles whose quantity is greater than zero.

Vehicle search supports:

- make
- model
- category
- minimum price
- maximum price

---

# 8. Inventory Quantity

## User

Vehicle availability should be controlled through quantity.

## AI Assistant

Helped implement inventory logic where:

quantity > 0

means that a vehicle is available.

Purchasing a vehicle decreases quantity by one.

Restocking a vehicle increases quantity by the requested amount.

MongoDB atomic update operations are used for purchase and restock operations.

---

# 9. Authentication Error

## User

I received:

{"success":false,"message":"Authentication required"}

## AI Assistant

Helped identify that the API request was reaching a protected endpoint
without a valid JWT authorization header.

The frontend authentication service was updated to retrieve the stored token
and provide:

Authorization: Bearer <token>

for authenticated requests.

---

# 10. Frontend Authentication Service

## User

The frontend needs login and registration services.

## AI Assistant

Helped implement frontend authentication functions including:

- registerUser()
- loginUser()
- getCurrentUser()
- getToken()
- logoutUser()
- getAuthHeaders()

The authentication token is stored using:

autovault_token

The logged-in user is stored using:

autovault_current_user

---

# 11. Login UI

## User

I want a professional AutoVault login interface with:

- User login
- Admin login option
- Create account
- Professional automotive design
- Responsive layout

## AI Assistant

Helped develop and refine the React login interface, including layout,
authentication forms, visual hierarchy, responsive styling, and navigation
between login and registration.

The UI was repeatedly adjusted based on the developer's visual feedback.

---

# 12. Register Page

## User

The application needs a user registration page connected to the backend
authentication API.

## AI Assistant

Helped connect the React registration form to:

POST /api/auth/register

The registration flow sends:

- name
- email
- password

to the backend and stores the returned authentication information after
successful registration.

---

# 13. Customer Dashboard

## User

The dashboard should display available vehicles and allow users to search
and filter the inventory.

## AI Assistant

Helped implement the React Dashboard with:

- Vehicle inventory
- Search
- Fuel-type filtering
- Condition filtering
- Body-type filtering
- Vehicle cards
- Vehicle images
- Vehicle pricing
- Vehicle specifications
- Vehicle location
- View Details navigation

The dashboard retrieves vehicles from:

GET /api/vehicles

---

# 14. Dashboard Inventory Issue

## User

The dashboard was showing:

VEHICLE INVENTORY

Available vehicles

0 vehicles

No vehicles found

Try changing your search or filters.

## AI Assistant

Helped investigate the mismatch between the backend vehicle response and the
frontend filtering logic.

The frontend was checking the availability property while the backend
inventory model primarily uses quantity.

The inventory logic was adjusted to align frontend availability with backend
inventory state.

---

# 15. Admin Dashboard

## User

I need an Admin Dashboard where an administrator can:

- Add vehicles
- Edit vehicles
- Delete vehicles
- View inventory
- Upload vehicle images
- See inventory statistics

## AI Assistant

Helped implement the AdminDashboard React page.

The dashboard includes:

- Total inventory
- New vehicles
- Used vehicles
- Available vehicles
- Add Vehicle form
- Edit Vehicle form
- Delete functionality
- Vehicle image upload
- Drag-and-drop image upload
- Vehicle cards
- Inventory management
- Logout functionality

---

# 16. Vehicle Add Functionality

## User

While adding a vehicle I received:

{"success":false,"message":"Authentication required"}

## AI Assistant

Helped identify that adding a vehicle is a protected API operation.

The frontend vehicle service was updated to send the authentication token
with the request.

The request uses:

POST /api/vehicles

with:

Authorization: Bearer <JWT_TOKEN>

After authentication was corrected, vehicle creation worked successfully.

---

# 17. Vehicle Update / Edit

## User

The Edit/Update vehicle functionality was not working.

## AI Assistant

Helped debug the update flow between the React Admin Dashboard and the
Express backend.

The frontend uses:

updateVehicle(id, vehicleData)

and the backend uses:

PUT /api/vehicles/:id

The update request sends the authentication token and vehicle data.

The Admin Dashboard also tracks the selected vehicle using an editing ID and
switches the form between:

Add Vehicle

and

Edit Vehicle

states.

---

# 18. Vehicle Card Key Issue

## User

Where is the card key?

## AI Assistant

Helped identify the React list rendering requirement.

Each vehicle card should use a unique React key based on the vehicle ID:

key={vehicle.id}

This prevents React list-rendering warnings and provides stable identity for
vehicle cards.

---

# 19. Admin Dashboard JSX Parse Error

## User

The application produced this Vite error:

[PARSE_ERROR] Expected `:` but found `,`

The error was related to a conditional expression around:

? 'Updating vehicle:',

## AI Assistant

Helped identify the JavaScript ternary syntax error.

A ternary expression requires:

condition ? valueIfTrue : valueIfFalse

The incorrect comma was replaced with the correct conditional syntax.

The AdminDashboard.jsx file then compiled successfully.

---

# 20. Vehicle Inventory Showing Zero

## User

The inventory page was showing:

0 vehicles

No vehicles found

even though vehicles had been added successfully.

## AI Assistant

Helped investigate the issue by checking the relationship between:

- MongoDB vehicle documents
- Backend API response
- Frontend vehicle service
- Dashboard filtering
- Authentication
- Availability logic

The backend GET endpoint returns vehicles with:

quantity > 0

The frontend was updated to consume the backend response correctly.

---

# 21. MongoDB Debugging

## User

I tried checking MongoDB using:

npx tsx -e "import mongoose from 'mongoose'; import dotenv from 'dotenv';
import Vehicle from './src/models/Vehicle'; dotenv.config();
mongoose.connect(process.env.MONGO_URI!).then(async()=>{
console.log('VEHICLES:', await Vehicle.find());
process.exit();
})"

but received:

TypeError: Cannot read properties of undefined (reading 'find')

## AI Assistant

Helped identify that the one-line TypeScript execution/import approach was
not correctly resolving the Mongoose model import.

The debugging approach was adjusted toward checking the existing compiled
application/model configuration rather than assuming that the database was
empty.

---

# 22. Vehicle Service

## User

The frontend vehicle service needs functions for:

- getVehicles
- getVehicleById
- addVehicle
- updateVehicle
- deleteVehicle
- purchaseVehicle

## AI Assistant

Helped implement the frontend API service using fetch().

The service communicates with:

http://localhost:5000/api/vehicles

The service supports:

GET
POST
PUT
DELETE

and the purchase endpoint:

POST /api/vehicles/:id/purchase

Authentication headers are included for protected operations.

---

# 23. Purchase Functionality

## User

The application should allow users to purchase vehicles.

## AI Assistant

Helped implement vehicle purchasing through:

POST /api/vehicles/:id/purchase

The backend checks that the vehicle exists and has quantity greater than
zero.

On successful purchase, the vehicle quantity is decreased by one.

The frontend provides purchase functionality through the vehicle details and
purchase flow.

---

# 24. Restock Functionality

## User

Admins should be able to restock vehicles.

## AI Assistant

Helped implement:

POST /api/vehicles/:id/restock

The endpoint is protected by authentication and admin authorization.

The restock amount is validated to ensure it is greater than zero.

The vehicle quantity is increased using a MongoDB update operation.

---

# 25. Vehicle Deletion

## User

Admins should be able to delete vehicles.

## AI Assistant

Helped implement:

DELETE /api/vehicles/:id

The endpoint requires:

- Authentication
- Admin authorization

The frontend Admin Dashboard provides a Delete button and confirmation
dialog before deleting a vehicle.

---

# 26. Vehicle Image Upload

## User

The Admin Dashboard should support uploading a vehicle image.

## AI Assistant

Helped implement an image upload UI supporting:

- File selection
- Drag and drop
- Image preview
- PNG
- JPG/JPEG
- WEBP
- Maximum file size validation
- Image removal

The selected image is converted into a data URL before being sent with the
vehicle information.

---

# 27. Professional UI Improvements

## User

The application UI should look like a professional senior-developer-built
car dealership application rather than a basic student project.

## AI Assistant

Helped improve:

- Visual hierarchy
- Spacing
- Typography
- Vehicle cards
- Login interface
- Admin dashboard
- Inventory sections
- Buttons
- Form layout
- Responsive behavior
- Empty states
- Image presentation
- Navigation

The UI was refined iteratively based on visual feedback.

---

# 28. Backend Authentication Routes

## User

The backend should provide:

POST /api/auth/register

POST /api/auth/login

## AI Assistant

Helped organize authentication routes through a dedicated auth router and
controller layer.

The authentication system validates credentials, creates users, authenticates
existing users, and returns JWT tokens.

---

# 29. Protected Vehicle Routes

## User

The vehicle routes currently use:

router.get('/search', authenticate, searchVehicles)

router.get('/', authenticate, getVehicles)

router.post('/', authenticate, createVehicle)

router.put('/:id', authenticate, updateVehicle)

router.delete('/:id', authenticate, requireAdmin, deleteVehicle)

router.post('/:id/purchase', authenticate, purchaseVehicle)

router.post('/:id/restock', authenticate, requireAdmin, restockVehicle)

## AI Assistant

Reviewed the route structure and confirmed the intended authorization model:

Authenticated users:

- View vehicles
- Search vehicles
- Add vehicles according to the current implementation
- Update vehicles according to the current implementation
- Purchase vehicles

Admins:

- Delete vehicles
- Restock vehicles

The route middleware separates authentication from admin authorization.

---

# 30. Testing

## User

The project needs backend tests.

The backend contains:

backend/tests/auth.test.ts

backend/tests/vehicle.test.ts

## AI Assistant

Helped structure backend tests around authentication and vehicle functionality.

Test areas include authentication behavior and vehicle API behavior.

The goal is to verify protected endpoints, vehicle operations, and
authentication behavior before final submission.

---

# 31. Git Repository Cleanup

## User

Git status showed generated JavaScript and TypeScript declaration files:

*.js

*.js.map

*.d.ts

*.d.ts.map

inside backend/src.

## AI Assistant

Helped clean the Git staging area so generated build artifacts could be
excluded and TypeScript source files could be tracked.

The generated files were removed from Git tracking using:

git rm --cached -r backend/src

The TypeScript source files were then staged separately.

---

# 32. Git Line Ending Warning

## User

Git displayed warnings such as:

LF will be replaced by CRLF the next time Git touches it.

## AI Assistant

Explained that the warning is related to Git's line-ending handling on
Windows and does not represent a TypeScript or application error.

The source files could continue to be committed.

---

# 33. README Documentation

## User

The project requires a professional README containing:

- Project overview
- Project structure
- Authentication
- Authorization
- REST API
- Vehicle model
- Environment variables
- Installation
- Database setup
- Admin setup
- Vehicle seeding
- Running the application
- Security considerations
- Testing
- Development principles
- Future enhancements
- Project status
- Contributing
- Git commit convention
- License
- Author

## AI Assistant

Helped create a professional README structure documenting the AutoVault
application, its architecture, API, setup instructions, authentication,
inventory management, testing, security, and development workflow.

---

# 34. Assignment Requirement Review

## User

The project task requires:

- Node.js/TypeScript backend
- MongoDB database
- JWT authentication
- React frontend
- Vehicle CRUD
- Search/filter
- Purchase
- Restock
- Admin authorization
- TDD
- Git history
- AI usage documentation
- Screenshots
- Test report
- PROMPTS.md

Does the README need to be changed according to these requirements?

## AI Assistant

Recommended updating the README so that it explicitly documents the
requirements of the assignment, particularly:

- TDD workflow
- AI usage
- Authentication
- Authorization
- REST API
- Testing
- Screenshots
- PROMPTS.md
- Project setup
- Environment variables
- Git workflow

The README should clearly communicate which requirements have been
implemented.

---

# 35. PROMPTS.md Requirement

## User

The assignment requires a root PROMPTS.md containing raw, unedited AI chat
logs or public chat links.

## AI Assistant

Explained that PROMPTS.md should be located at the repository root:

car-dealership-inventory/
└── PROMPTS.md

The file should contain the actual AI-assisted development conversations or
public links rather than only an AI-generated summary.

---

# 36. GitHub Preparation

## User

The project is complete and should be pushed to GitHub.

## AI Assistant

Helped prepare the repository for GitHub by recommending:

1. Verify the project works.
2. Check git status.
3. Verify .gitignore.
4. Ensure .env is not committed.
5. Stage the required files.
6. Create meaningful commits.
7. Add the required AI co-author information to AI-assisted commits.
8. Push the repository to GitHub.
9. Verify the repository contents online.

---

# 37. Final Project Review

## User

Is the project finished?

## AI Assistant

Reviewed the implemented functionality and identified the major completed
areas:

- Authentication
- JWT authorization
- User registration
- User login
- MongoDB persistence
- Vehicle inventory
- Vehicle search/filtering
- Vehicle details
- Vehicle purchasing
- Admin dashboard
- Vehicle creation
- Vehicle editing
- Vehicle deletion
- Vehicle restocking
- Vehicle image upload
- Responsive UI
- Backend tests
- README documentation
- Git/GitHub preparation

The remaining submission-specific requirements include verifying the final
test report, screenshots, PROMPTS.md, AI usage documentation, and Git commit
history.

---

# 38. AI Usage Reflection

The AI assistant was primarily used as a development support tool.

It helped accelerate:

- Debugging
- Code structure decisions
- React implementation
- API integration
- Authentication troubleshooting
- UI refinement
- Documentation
- Git workflow

The developer remained responsible for integrating the code, testing the
application, identifying issues, and deciding which changes were appropriate
for the final implementation.

AI suggestions were reviewed and adapted to the project's existing
architecture rather than being blindly copied.

---

# 39. Development Workflow

The overall development workflow was:

Requirement Analysis
        ↓
Project Architecture
        ↓
Backend Setup
        ↓
MongoDB Integration
        ↓
Authentication
        ↓
Vehicle API
        ↓
Frontend Setup
        ↓
Dashboard
        ↓
Admin Dashboard
        ↓
Purchase / Inventory
        ↓
Testing
        ↓
Debugging
        ↓
UI Refinement
        ↓
Documentation
        ↓
Git/GitHub

---

