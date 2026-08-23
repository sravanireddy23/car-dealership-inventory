import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User'

const generateToken = (userId: string, role: string) => {
  return jwt.sign(
    {
      userId,
      role,
    },
    process.env.JWT_SECRET || 'autovault-secret',
    {
      expiresIn: '1d',
    }
  )
}

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email and password are required',
      })
    }

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    })

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User already exists',
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: 'user',
    })

    const token = generateToken(user.id, user.role)

    return res.status(201).json({
      success: true,
      message: 'Registration successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error('Registration error:', error)

    return res.status(500).json({
      success: false,
      message: 'Server error',
    })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      })
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    })

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      })
    }

    const passwordValid = await bcrypt.compare(
      password,
      user.password
    )

    if (!passwordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      })
    }

    const token = generateToken(user.id, user.role)

    return res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error('Login error:', error)

    return res.status(500).json({
      success: false,
      message: 'Server error',
    })
  }
}
