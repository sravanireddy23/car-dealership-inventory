import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import User from './src/models/User'

dotenv.config()

const createAdmin = async () => {
  try {
    const mongoUri = process.env.MONGO_URI

    if (!mongoUri) {
      throw new Error('MONGO_URI is not defined')
    }

    await mongoose.connect(mongoUri)

    const email = 'admin@autovault.com'
    const password = 'admin123'

    const existingAdmin = await User.findOne({ email })

    if (existingAdmin) {
      existingAdmin.role = 'admin'
      existingAdmin.password = await bcrypt.hash(password, 10)
      existingAdmin.name = 'AutoVault Admin'

      await existingAdmin.save()

      console.log('Admin account updated successfully')
    } else {
      const hashedPassword = await bcrypt.hash(password, 10)

      await User.create({
        name: 'AutoVault Admin',
        email,
        password: hashedPassword,
        role: 'admin',
      })

      console.log('Admin account created successfully')
    }

    await mongoose.disconnect()
  } catch (error) {
    console.error('Admin creation failed:', error)
    process.exit(1)
  }
}

createAdmin()
