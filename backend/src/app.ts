import express from 'express'
import cors from 'cors'
import vehicleRoutes from './routes/vehicleRoutes'
import authRoutes from './routes/authRoutes'

const app = express()

app.use(cors())
app.use(express.json({ limit: '10mb' }))

app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    message: 'AutoVault API is running',
  })
})

app.use('/api/auth', authRoutes)
app.use('/api/vehicles', vehicleRoutes)

export default app
