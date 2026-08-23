import { Router } from 'express'
import {
  getVehicles,
  searchVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  purchaseVehicle,
  restockVehicle,
} from '../controllers/vehicleController'
import {
  authenticate,
  requireAdmin,
} from '../middleware/authMiddleware'

const router = Router()

router.get('/search', authenticate, searchVehicles)

router.get('/', authenticate, getVehicles)

router.post('/', authenticate, createVehicle)

router.put('/:id', authenticate, updateVehicle)

router.delete(
  '/:id',
  authenticate,
  requireAdmin,
  deleteVehicle
)

router.post(
  '/:id/purchase',
  authenticate,
  purchaseVehicle
)

router.post(
  '/:id/restock',
  authenticate,
  requireAdmin,
  restockVehicle
)

export default router
