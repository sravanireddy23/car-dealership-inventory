// ============================================================
// vehicleService.js
// AutoVault Vehicle Inventory Service
// ============================================================

// ------------------------------------------------------------
// DEFAULT / ORIGINAL INVENTORY
// ------------------------------------------------------------

const defaultVehicles = [
  {
    id: 1,
    make: 'Hyundai',
    model: 'Creta',
    year: 2026,
    price: 1090700,
    condition: 'New',
    odometer: 0,
    fuelType: 'Petrol',
    mileage: '17.4 km/l',
    transmission: 'Manual',
    bodyType: 'SUV',
    colors: [
      'Atlas White',
      'Abyss Black',
      'Titan Grey',
      'Fiery Red',
      'Ranger Khaki',
      'Robust Emerald Pearl',
    ],
    color: 'Atlas White',
    location: 'Hyderabad',
    available: true,
    image: '/cars/creta/1.png',
    gallery: [
      '/cars/creta/1.png',
      '/cars/creta/2.png',
      '/cars/creta/3.png',
      '/cars/creta/4.png',
    ],
  },

  {
    id: 2,
    make: 'Tata',
    model: 'Nexon',
    year: 2026,
    price: 736000,
    condition: 'New',
    odometer: 0,
    fuelType: 'Petrol',
    mileage: '17.0 km/l',
    transmission: 'Manual',
    bodyType: 'SUV',
    colors: [
      'Pristine White',
      'Daytona Grey',
      'Creative Ocean',
      'Fearless Purple',
      'Flame Red',
    ],
    color: 'Pristine White',
    location: 'Hyderabad',
    available: true,
    image: '/cars/nexon/1.png',
    gallery: [
      '/cars/nexon/1.png',
      '/cars/nexon/2.png',
      '/cars/nexon/3.png',
      '/cars/nexon/4.png',
    ],
  },

  {
    id: 3,
    make: 'Tata',
    model: 'Nexon EV',
    year: 2026,
    price: 1249000,
    condition: 'New',
    odometer: 0,
    fuelType: 'Electric',
    mileage: 'Up to 489 km range',
    transmission: 'Automatic',
    bodyType: 'SUV',
    colors: [
      'Empowered Oxide',
      'Pristine White',
      'Fearless Purple',
      'Daytona Grey',
      'Flame Red',
    ],
    color: 'Empowered Oxide',
    location: 'Hyderabad',
    available: true,
    image: '/cars/nexon-ev/1.png',
    gallery: [
      '/cars/nexon-ev/1.png',
      '/cars/nexon-ev/2.png',
      '/cars/nexon-ev/3.png',
      '/cars/nexon-ev/4.png',
    ],
  },

  {
    id: 4,
    make: 'Toyota',
    model: 'Innova Hycross',
    year: 2026,
    price: 1870000,
    condition: 'New',
    odometer: 0,
    fuelType: 'Hybrid',
    mileage: 'Up to 23.24 km/l',
    transmission: 'Automatic',
    bodyType: 'MPV',
    colors: [
      'Super White',
      'Attitude Mica Black',
      'Silver Metallic',
      'Platinum White Pearl',
      'Sparkling Black Pearl',
    ],
    color: 'Super White',
    location: 'Hyderabad',
    available: true,
    image: '/cars/innova-hycross/1.png',
    gallery: [
      '/cars/innova-hycross/1.png',
      '/cars/innova-hycross/2.png',
      '/cars/innova-hycross/3.png',
      '/cars/innova-hycross/4.png',
    ],
  },

  {
    id: 5,
    make: 'Maruti Suzuki',
    model: 'Grand Vitara',
    year: 2026,
    price: 1080000,
    condition: 'New',
    odometer: 0,
    fuelType: 'Hybrid',
    mileage: 'Up to 27.97 km/l',
    transmission: 'Automatic',
    bodyType: 'SUV',
    colors: [
      'Arctic White',
      'Nexa Blue',
      'Grandeur Grey',
      'Opulent Red',
      'Chestnut Brown',
    ],
    color: 'Arctic White',
    location: 'Hyderabad',
    available: true,
    image: '/cars/grand-vitara/1.png',
    gallery: [
      '/cars/grand-vitara/1.png',
      '/cars/grand-vitara/2.png',
      '/cars/grand-vitara/3.png',
      '/cars/grand-vitara/4.png',
    ],
  },

  {
    id: 6,
    make: 'Kia',
    model: 'Seltos',
    year: 2026,
    price: 1099000,
    condition: 'New',
    odometer: 0,
    fuelType: 'Diesel',
    mileage: 'Up to 20.8 km/l',
    transmission: 'Automatic',
    bodyType: 'SUV',
    colors: [
      'Glacier White Pearl',
      'Aurora Black Pearl',
      'Intense Red',
      'Imperial Blue',
      'Gravity Grey',
    ],
    color: 'Glacier White Pearl',
    location: 'Hyderabad',
    available: true,
    image: '/cars/seltos/1.png',
    gallery: [
      '/cars/seltos/1.png',
      '/cars/seltos/2.png',
      '/cars/seltos/3.png',
      '/cars/seltos/4.png',
    ],
  },

  {
    id: 7,
    make: 'Mahindra',
    model: 'Scorpio-N',
    year: 2026,
    price: 1370000,
    condition: 'New',
    odometer: 0,
    fuelType: 'Diesel',
    mileage: 'Up to 15.4 km/l',
    transmission: 'Automatic',
    bodyType: 'SUV',
    colors: [
      'Everest White',
      'Dazzling Silver',
      'Red Rage',
      'Deep Forest',
      'Grand Canyon',
    ],
    color: 'Everest White',
    location: 'Hyderabad',
    available: true,
    image: '/cars/scorpio-n/1.png',
    gallery: [
      '/cars/scorpio-n/1.png',
      '/cars/scorpio-n/2.png',
      '/cars/scorpio-n/3.png',
      '/cars/scorpio-n/4.png',
    ],
  },

  {
    id: 8,
    make: 'Toyota',
    model: 'Fortuner',
    year: 2026,
    price: 3695000,
    condition: 'New',
    odometer: 0,
    fuelType: 'Diesel',
    mileage: '14.4 km/l',
    transmission: 'Automatic',
    bodyType: 'SUV',
    colors: [
      'Super White',
      'Platinum White Pearl',
      'Silver Metallic',
      'Attitude Mica Black',
      'Emotional Red',
    ],
    color: 'Super White',
    location: 'Hyderabad',
    available: true,
    image: '/cars/fortuner/1.png',
    gallery: [
      '/cars/fortuner/1.png',
      '/cars/fortuner/2.png',
      '/cars/fortuner/3.png',
      '/cars/fortuner/4.png',
    ],
  },

  {
    id: 9,
    make: 'Hyundai',
    model: 'i20',
    year: 2026,
    price: 729000,
    condition: 'New',
    odometer: 0,
    fuelType: 'Petrol',
    mileage: 'Up to 20.0 km/l',
    transmission: 'Manual',
    bodyType: 'Hatchback',
    colors: [
      'Atlas White',
      'Titan Grey',
      'Starry Night',
      'Fiery Red',
      'Aqua Teal',
    ],
    color: 'Atlas White',
    location: 'Hyderabad',
    available: true,
    image: '/cars/i20/1.png',
    gallery: [
      '/cars/i20/1.png',
      '/cars/i20/2.png',
      '/cars/i20/3.png',
      '/cars/i20/4.png',
    ],
  },

  {
    id: 10,
    make: 'Maruti Suzuki',
    model: 'Baleno',
    year: 2026,
    price: 599900,
    condition: 'New',
    odometer: 0,
    fuelType: 'Petrol',
    mileage: 'Up to 22.35 km/l',
    transmission: 'Manual',
    bodyType: 'Hatchback',
    colors: [
      'Nexa Blue',
      'Pearl Arctic White',
      'Grandeur Grey',
      'Opulent Red',
      'Splendid Silver',
    ],
    color: 'Nexa Blue',
    location: 'Hyderabad',
    available: true,
    image: '/cars/baleno/1.png',
    gallery: [
      '/cars/baleno/1.png',
      '/cars/baleno/2.png',
      '/cars/baleno/3.png',
      '/cars/baleno/4.png',
    ],
  },

  {
    id: 11,
    make: 'Honda',
    model: 'City',
    year: 2023,
    price: 1190000,
    condition: 'Used',
    odometer: 24000,
    fuelType: 'Petrol',
    mileage: '17.8 km/l',
    transmission: 'Automatic',
    bodyType: 'Sedan',
    colors: [
      'Platinum White',
      'Golden Brown',
      'Radiant Red',
    ],
    color: 'Platinum White',
    location: 'Hyderabad',
    available: true,
    image: '/cars/city/1.png',
    gallery: [
      '/cars/city/1.png',
      '/cars/city/2.png',
      '/cars/city/3.png',
      '/cars/city/4.png',
    ],
  },

  {
    id: 12,
    make: 'Honda',
    model: 'Civic',
    year: 2022,
    price: 1680000,
    condition: 'Used',
    odometer: 31000,
    fuelType: 'Petrol',
    mileage: '16.5 km/l',
    transmission: 'Automatic',
    bodyType: 'Sedan',
    colors: [
      'Platinum White',
      'Radiant Red',
      'Modern Steel',
    ],
    color: 'Modern Steel',
    location: 'Hyderabad',
    available: true,
    image: '/cars/civic/1.png',
    gallery: [
      '/cars/civic/1.png',
      '/cars/civic/2.png',
      '/cars/civic/3.png',
      '/cars/civic/4.png',
    ],
  },

  {
    id: 13,
    make: 'Toyota',
    model: 'Fortuner',
    year: 2022,
    price: 3150000,
    condition: 'Used',
    odometer: 42000,
    fuelType: 'Diesel',
    mileage: '14.2 km/l',
    transmission: 'Automatic',
    bodyType: 'SUV',
    colors: [
      'Super White',
      'Silver Metallic',
      'Attitude Black',
    ],
    color: 'Silver Metallic',
    location: 'Hyderabad',
    available: true,
    image: '/cars/fortuner/1.png',
    gallery: [
      '/cars/fortuner/1.png',
      '/cars/fortuner/2.png',
      '/cars/fortuner/3.png',
      '/cars/fortuner/4.png',
    ],
  },

  {
    id: 14,
    make: 'Tata',
    model: 'Harrier',
    year: 2024,
    price: 1890000,
    condition: 'Used',
    odometer: 21000,
    fuelType: 'Diesel',
    mileage: '16.8 km/l',
    transmission: 'Automatic',
    bodyType: 'SUV',
    colors: [
      'Oberon Black',
      'Daytona Grey',
      'Seaweed Green',
      'Pearl White',
    ],
    color: 'Oberon Black',
    location: 'Hyderabad',
    available: true,
    image: '/cars/harrier/1.png',
    gallery: [
      '/cars/harrier/1.png',
      '/cars/harrier/2.png',
      '/cars/harrier/3.png',
      '/cars/harrier/4.png',
    ],
  },

  {
    id: 15,
    make: 'Hyundai',
    model: 'Creta',
    year: 2023,
    price: 1375000,
    condition: 'Used',
    odometer: 28000,
    fuelType: 'Diesel',
    mileage: '21.4 km/l',
    transmission: 'Automatic',
    bodyType: 'SUV',
    colors: [
      'Polar White',
      'Titan Grey',
      'Phantom Black',
      'Typhoon Silver',
    ],
    color: 'Polar White',
    location: 'Hyderabad',
    available: true,
    image: '/cars/creta/1.png',
    gallery: [
      '/cars/creta/1.png',
      '/cars/creta/2.png',
      '/cars/creta/3.png',
      '/cars/creta/4.png',
    ],
  },

  {
    id: 16,
    make: 'BMW',
    model: '3 Series',
    year: 2023,
    price: 4650000,
    condition: 'Used',
    odometer: 19000,
    fuelType: 'Petrol',
    mileage: '16.1 km/l',
    transmission: 'Automatic',
    bodyType: 'Sedan',
    colors: [
      'Alpine White',
      'Black Sapphire',
      'Portimao Blue',
      'Mineral Grey',
    ],
    color: 'Portimao Blue',
    location: 'Hyderabad',
    available: true,
    image: '/cars/bmw-3-series/1.png',
    gallery: [
      '/cars/bmw-3-series/1.png',
      '/cars/bmw-3-series/2.png',
      '/cars/bmw-3-series/3.png',
      '/cars/bmw-3-series/4.png',
    ],
  },

  {
    id: 17,
    make: 'Ford',
    model: 'Mustang',
    year: 2022,
    price: 5900000,
    condition: 'Used',
    odometer: 17000,
    fuelType: 'Petrol',
    mileage: '10.2 km/l',
    transmission: 'Automatic',
    bodyType: 'Coupe',
    colors: [
      'Race Red',
      'Shadow Black',
      'Oxford White',
      'Grabber Blue',
    ],
    color: 'Race Red',
    location: 'Hyderabad',
    available: true,
    image: '/cars/mustang/1.png',
    gallery: [
      '/cars/mustang/1.png',
      '/cars/mustang/2.png',
      '/cars/mustang/3.png',
      '/cars/mustang/4.png',
    ],
  },

  {
    id: 18,
    make: 'MG',
    model: 'ZS EV',
    year: 2024,
    price: 1850000,
    condition: 'Used',
    odometer: 18000,
    fuelType: 'Electric',
    mileage: 'Up to 461 km range',
    transmission: 'Automatic',
    bodyType: 'SUV',
    colors: [
      'Arctic White',
      'Glaze Red',
      'Starry Black',
      'Metallic Silver',
    ],
    color: 'Arctic White',
    location: 'Hyderabad',
    available: true,
    image: '/cars/zs-ev/1.png',
    gallery: [
      '/cars/zs-ev/1.png',
      '/cars/zs-ev/2.png',
      '/cars/zs-ev/3.png',
      '/cars/zs-ev/4.png',
    ],
  },

  {
    id: 19,
    make: 'Toyota',
    model: 'Camry',
    year: 2024,
    price: 3650000,
    condition: 'Used',
    odometer: 12000,
    fuelType: 'Hybrid',
    mileage: 'Up to 25.49 km/l',
    transmission: 'Automatic',
    bodyType: 'Sedan',
    colors: [
      'Platinum White Pearl',
      'Attitude Black',
      'Graphite Metallic',
      'Silver Metallic',
    ],
    color: 'Platinum White Pearl',
    location: 'Hyderabad',
    available: true,
    image: '/cars/camry/1.png',
    gallery: [
      '/cars/camry/1.png',
      '/cars/camry/2.png',
      '/cars/camry/3.png',
      '/cars/camry/4.png',
    ],
  },

  {
    id: 20,
    make: 'Maruti Suzuki',
    model: 'Grand Vitara',
    year: 2024,
    price: 1425000,
    condition: 'Used',
    odometer: 26000,
    fuelType: 'Hybrid',
    mileage: 'Up to 27.97 km/l',
    transmission: 'Automatic',
    bodyType: 'SUV',
    colors: [
      'Arctic White',
      'Nexa Blue',
      'Grandeur Grey',
      'Opulent Red',
    ],
    color: 'Nexa Blue',
    location: 'Hyderabad',
    available: true,
    image: '/cars/grand-vitara/1.png',
    gallery: [
      '/cars/grand-vitara/1.png',
      '/cars/grand-vitara/2.png',
      '/cars/grand-vitara/3.png',
      '/cars/grand-vitara/4.png',
    ],
  },
]

// ============================================================
// LOCAL STORAGE
// ============================================================

const STORAGE_KEY = 'autovault_vehicles'

// ------------------------------------------------------------
// Load vehicles from localStorage
// ------------------------------------------------------------

function loadVehicles() {
  try {
    const savedVehicles =
      localStorage.getItem(STORAGE_KEY)

    // First installation
    if (!savedVehicles) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(defaultVehicles)
      )

      return [...defaultVehicles]
    }

    const parsedVehicles =
      JSON.parse(savedVehicles)

    // Safety check
    if (!Array.isArray(parsedVehicles)) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(defaultVehicles)
      )

      return [...defaultVehicles]
    }

    return parsedVehicles
  } catch (error) {
    console.error(
      'Unable to load vehicles:',
      error
    )

    return [...defaultVehicles]
  }
}

// ============================================================
// VEHICLE STATE
// ============================================================

let vehicles = loadVehicles()

// ============================================================
// SAVE VEHICLES
// ============================================================

function saveVehicles() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(vehicles)
    )
  } catch (error) {
    console.error(
      'Unable to save vehicles:',
      error
    )
  }
}

// ============================================================
// NORMALIZE VEHICLE
// ============================================================

function normalizeVehicle(vehicle) {
  const condition =
    vehicle.condition === 'Used'
      ? 'Used'
      : 'New'

  let odometer = Number(
    vehicle.odometer
  )

  if (!Number.isFinite(odometer)) {
    odometer = 0
  }

  // New cars should always show 0 km
  if (condition === 'New') {
    odometer = 0
  }

  const colors =
    Array.isArray(vehicle.colors)
      ? vehicle.colors
      : vehicle.color
        ? [vehicle.color]
        : []

  return {
    ...vehicle,

    condition,

    odometer,

    colors,

    color:
      vehicle.color ||
      colors[0] ||
      '',

    location:
      vehicle.location ||
      'Hyderabad',

    available:
      vehicle.available !== false,

    image:
      vehicle.image ||
      '/cars/default-car.png',

    gallery:
      Array.isArray(vehicle.gallery)
        ? vehicle.gallery
        : [],
  }
}

// ============================================================
// GET ALL VEHICLES
// ============================================================

export const getVehicles = async () => {
  vehicles = loadVehicles()

  return [...vehicles]
}

// ============================================================
// GET VEHICLE BY ID
// ============================================================

export const getVehicleById = async (id) => {
  vehicles = loadVehicles()

  return vehicles.find(
    (vehicle) =>
      vehicle.id === Number(id)
  )
}

// ============================================================
// PURCHASE VEHICLE
// ============================================================

export const purchaseVehicle = async (id) => {
  vehicles = loadVehicles()

  const vehicle = vehicles.find(
    (item) =>
      item.id === Number(id)
  )

  if (!vehicle || !vehicle.available) {
    return {
      success: false,
      message:
        'Vehicle is not available',
    }
  }

  vehicle.available = false

  saveVehicles()

  return {
    success: true,
    vehicle,
  }
}

// ============================================================
// ADD VEHICLE
// ============================================================

export const addVehicle = async (
  vehicleData
) => {
  vehicles = loadVehicles()

  // ----------------------------------------------------------
  // Generate a completely unique ID
  // ----------------------------------------------------------

  const maxId =
    vehicles.length > 0
      ? Math.max(
          ...vehicles.map(
            (vehicle) =>
              Number(vehicle.id) || 0
          )
        )
      : 0

  const newId = maxId + 1

  // ----------------------------------------------------------
  // Normalize condition
  // ----------------------------------------------------------

  const condition =
    vehicleData.condition === 'Used'
      ? 'Used'
      : 'New'

  // ----------------------------------------------------------
  // Odometer
  // ----------------------------------------------------------

  let odometer = Number(
    vehicleData.odometer
  )

  if (!Number.isFinite(odometer)) {
    odometer = 0
  }

  if (condition === 'New') {
    odometer = 0
  }

  // ----------------------------------------------------------
  // Colors
  // ----------------------------------------------------------

  const colors =
    Array.isArray(vehicleData.colors)
      ? vehicleData.colors
      : vehicleData.color
        ? [vehicleData.color]
        : []

  // ----------------------------------------------------------
  // Image
  // ----------------------------------------------------------

  const image =
    vehicleData.image ||
    '/cars/default-car.png'

  // ----------------------------------------------------------
  // Gallery
  // ----------------------------------------------------------

  const gallery =
    Array.isArray(vehicleData.gallery)
      ? vehicleData.gallery
      : image
        ? [image]
        : []

  // ----------------------------------------------------------
  // Create vehicle
  // ----------------------------------------------------------

  const newVehicle = {
    ...vehicleData,

    id: newId,

    make:
      vehicleData.make || '',

    model:
      vehicleData.model || '',

    year:
      Number(vehicleData.year) || 0,

    price:
      Number(vehicleData.price) || 0,

    condition,

    odometer,

    mileage:
      vehicleData.mileage || '',

    fuelType:
      vehicleData.fuelType ||
      'Petrol',

    transmission:
      vehicleData.transmission ||
      'Automatic',

    bodyType:
      vehicleData.bodyType ||
      'SUV',

    colors,

    color:
      vehicleData.color ||
      colors[0] ||
      '',

    location:
      vehicleData.location ||
      'Hyderabad',

    available: true,

    image,

    gallery,
  }

  // ----------------------------------------------------------
  // Add ONCE
  // ----------------------------------------------------------

  vehicles.push(newVehicle)

  // ----------------------------------------------------------
  // Save immediately
  // ----------------------------------------------------------

  saveVehicles()

  // Return a copy
  return {
    ...newVehicle,
  }
}

// ============================================================
// UPDATE VEHICLE
// ============================================================

export const updateVehicle = async (
  id,
  vehicleData
) => {
  vehicles = loadVehicles()

  const numericId = Number(id)

  const index =
    vehicles.findIndex(
      (vehicle) =>
        vehicle.id === numericId
    )

  if (index === -1) {
    return null
  }

  const existingVehicle =
    vehicles[index]

  const mergedVehicle =
    normalizeVehicle({
      ...existingVehicle,
      ...vehicleData,

      id: existingVehicle.id,

      // Never accidentally reset availability
      available:
        vehicleData.available ??
        existingVehicle.available,
    })

  vehicles[index] =
    mergedVehicle

  saveVehicles()

  return {
    ...mergedVehicle,
  }
}

// ============================================================
// DELETE VEHICLE
// ============================================================

export const deleteVehicle = async (
  id
) => {
  vehicles = loadVehicles()

  const numericId = Number(id)

  const initialLength =
    vehicles.length

  vehicles =
    vehicles.filter(
      (vehicle) =>
        vehicle.id !== numericId
    )

  const deleted =
    vehicles.length <
    initialLength

  if (deleted) {
    saveVehicles()
  }

  return deleted
}

// ============================================================
// OPTIONAL: RESET INVENTORY
// ============================================================
// Use this only if you want to completely remove all
// locally-added vehicles and restore the original 20.
//
// You can call:
// resetVehicleInventory()
// from the browser console if needed.
// ============================================================

export const resetVehicleInventory =
  async () => {
    vehicles = [
      ...defaultVehicles,
    ]

    saveVehicles()

    return [
      ...vehicles,
    ]
  }