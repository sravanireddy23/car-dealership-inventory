import { Request, Response } from 'express'
import Vehicle from '../models/Vehicle'

export const createVehicle = async (req: Request, res: Response) => {
  try {
    const vehicle = await Vehicle.create(req.body)
    res.status(201).json(vehicle)
  } catch (error) {
    res.status(400).json({ message: 'Invalid vehicle data', error })
  }
}

export const getVehicles = async (_req: Request, res: Response) => {
  try {
    const vehicles = await Vehicle.find({ quantity: { $gt: 0 } })
    res.json(vehicles)
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch vehicles', error })
  }
}

export const searchVehicles = async (req: Request, res: Response) => {
  try {
    const { make, model, category, minPrice, maxPrice } = req.query

    const filter: any = {}

    if (make) {
      filter.make = { $regex: String(make), $options: 'i' }
    }

    if (model) {
      filter.model = { $regex: String(model), $options: 'i' }
    }

    if (category) {
      filter.category = { $regex: String(category), $options: 'i' }
    }

    if (minPrice || maxPrice) {
      filter.price = {}

      if (minPrice) filter.price.$gte = Number(minPrice)
      if (maxPrice) filter.price.$lte = Number(maxPrice)
    }

    filter.quantity = { $gt: 0 }

    const vehicles = await Vehicle.find(filter)

    res.json(vehicles)
  } catch (error) {
    res.status(500).json({ message: 'Search failed', error })
  }
}

export const updateVehicle = async (req: Request, res: Response) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' })
    }

    res.json(vehicle)
  } catch (error) {
    res.status(400).json({ message: 'Unable to update vehicle', error })
  }
}

export const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id)

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' })
    }

    res.json({ message: 'Vehicle deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Unable to delete vehicle', error })
  }
}

export const purchaseVehicle = async (req: Request, res: Response) => {
  try {
    const vehicle = await Vehicle.findOneAndUpdate(
      {
        _id: req.params.id,
        quantity: { $gt: 0 },
      },
      {
        $inc: { quantity: -1 },
      },
      {
        new: true,
      }
    )

    if (!vehicle) {
      return res.status(400).json({
        message: 'Vehicle is out of stock or does not exist',
      })
    }

    res.json({
      message: 'Vehicle purchased successfully',
      vehicle,
    })
  } catch (error) {
    res.status(500).json({ message: 'Purchase failed', error })
  }
}

export const restockVehicle = async (req: Request, res: Response) => {
  try {
    const amount = Number(req.body.quantity || 1)

    if (amount <= 0) {
      return res.status(400).json({
        message: 'Restock quantity must be greater than zero',
      })
    }

    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { quantity: amount },
      },
      { new: true }
    )

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' })
    }

    res.json({
      message: 'Vehicle restocked successfully',
      vehicle,
    })
  } catch (error) {
    res.status(500).json({ message: 'Restock failed', error })
  }
}
