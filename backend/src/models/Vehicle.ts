import mongoose, { Schema } from 'mongoose'

export interface IVehicle {
  make: string
  model: string
  category: string
  price: number
  quantity: number
  year?: number
  condition?: string
  mileage?: string
  fuelType?: string
  transmission?: string
  bodyType?: string
  location?: string
  image?: string
}

const vehicleSchema = new Schema<IVehicle>(
  {
    make: {
      type: String,
      required: true,
      trim: true,
    },

    model: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    quantity: {
      type: Number,
      required: true,
      min: 0,
      default: 1,
    },

    year: Number,
    condition: String,
    mileage: String,
    fuelType: String,
    transmission: String,
    bodyType: String,
    location: String,
    image: String,
  },
  {
    timestamps: true,
  }
)

const Vehicle = mongoose.model<IVehicle>('Vehicle', vehicleSchema)

export default Vehicle
