import dotenv from 'dotenv'
import app from './app'
import { connectDatabase } from './config/database'

dotenv.config()

const PORT = Number(process.env.PORT) || 5000

const startServer = async () => {
  await connectDatabase()

  app.listen(PORT, () => {
    console.log('AutoVault backend running on http://localhost:' + PORT)
  })
}

startServer()
