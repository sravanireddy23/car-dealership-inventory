let vehicles = [
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
  },
]


/* ---------------------------------------
   IMAGE PATH GENERATOR
---------------------------------------- */

const imageFolderMap = {
  'Hyundai Creta': 'creta',
  'Tata Nexon': 'nexon',
  'Tata Nexon EV': 'nexon-ev',
  'Toyota Innova Hycross': 'innova-hycross',
  'Maruti Suzuki Grand Vitara': 'grand-vitara',
  'Kia Seltos': 'seltos',
  'Mahindra Scorpio-N': 'scorpio-n',
  'Toyota Fortuner': 'fortuner',
  'Hyundai i20': 'i20',
  'Maruti Suzuki Baleno': 'baleno',
  'Honda City': 'city',
  'Honda Civic': 'civic',
  'Tata Harrier': 'harrier',
  'BMW 3 Series': 'bmw-3-series',
  'Ford Mustang': 'mustang',
  'Toyota Camry': 'camry',
  'MG ZS EV': 'zs-ev',
}


function getImagePaths(make, model) {
  const key = `${make} ${model}`
  const folder = imageFolderMap[key]

  if (!folder) {
    return {
      image: '',
      gallery: [],
    }
  }

  return {
    image: `/cars/${folder}/1.png`,
    gallery: [
      `/cars/${folder}/1.png`,
      `/cars/${folder}/2.png`,
      `/cars/${folder}/3.png`,
      `/cars/${folder}/4.png`,
    ],
  }
}


/* ---------------------------------------
   ADD IMAGES TO ALL VEHICLES
---------------------------------------- */

vehicles = vehicles.map((vehicle) => ({
  ...vehicle,
  ...getImagePaths(
    vehicle.make,
    vehicle.model
  ),
}))


/* ---------------------------------------
   SERVICES
---------------------------------------- */

export const getVehicles = async () => {
  return vehicles
}


export const getVehicleById = async (id) => {
  return vehicles.find(
    (vehicle) => vehicle.id === Number(id)
  )
}


export const purchaseVehicle = async (id) => {
  const vehicle = vehicles.find(
    (item) => item.id === Number(id)
  )

  if (!vehicle || !vehicle.available) {
    return {
      success: false,
      message: 'Vehicle is not available',
    }
  }

  vehicle.available = false

  return {
    success: true,
    vehicle,
  }
}


export const addVehicle = async (vehicleData) => {
  const newVehicle = {
    ...vehicleData,

    id:
      vehicles.length > 0
        ? Math.max(
            ...vehicles.map(
              (vehicle) => vehicle.id
            )
          ) + 1
        : 1,

    colors:
      vehicleData.colors ||
      (vehicleData.color
        ? [vehicleData.color]
        : []),

    available: true,
  }

  const images = getImagePaths(
    newVehicle.make,
    newVehicle.model
  )

  newVehicle.image = images.image
  newVehicle.gallery = images.gallery

  vehicles.push(newVehicle)

  return newVehicle
}


export const updateVehicle = async (
  id,
  vehicleData
) => {
  const index = vehicles.findIndex(
    (vehicle) =>
      vehicle.id === Number(id)
  )

  if (index === -1) {
    return null
  }

  vehicles[index] = {
    ...vehicles[index],
    ...vehicleData,
  }

  const images = getImagePaths(
    vehicles[index].make,
    vehicles[index].model
  )

  vehicles[index].image = images.image
  vehicles[index].gallery = images.gallery

  return vehicles[index]
}


export const deleteVehicle = async (id) => {
  const initialLength =
    vehicles.length

  vehicles = vehicles.filter(
    (vehicle) =>
      vehicle.id !== Number(id)
  )

  return (
    vehicles.length <
    initialLength
  )
}