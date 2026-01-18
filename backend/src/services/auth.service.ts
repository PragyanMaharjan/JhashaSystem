import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { User } from "../models/User"
import type { RegisterRequest, LoginRequest } from "../dtos/auth.dto"

const JWT_SECRET = process.env.JWT_SECRET || "secret-key"

export class AuthService {
  async register(data: RegisterRequest) {
    // Check if email exists
    const existingEmail = await User.findOne({ email: data.email })
    if (existingEmail) {
      throw new Error("Email already exists")
    }

    // Check if mobile exists
    const existingMobile = await User.findOne({ mobile: data.mobile })
    if (existingMobile) {
      throw new Error("Mobile number already exists")
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(data.password, 10)

    // Create user
    const user = new User({
      fullName: data.fullName,
      email: data.email,
      mobile: data.mobile,
      password: hashedPassword,
      role: "user",
    })

    await user.save()

    return {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      mobile: user.mobile,
      role: user.role,
    }
  }

  async login(data: LoginRequest) {
    // Check if mobile exists
    const user = await User.findOne({ mobile: data.mobile })
    if (!user) {
      throw new Error("Invalid mobile or password")
    }

    // Compare passwords
    const isPasswordValid = await bcryptjs.compare(data.password, user.password)
    if (!isPasswordValid) {
      throw new Error("Invalid mobile or password")
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email, mobile: user.mobile, role: user.role }, JWT_SECRET, { expiresIn: "7d" })

    return {
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
      },
    }
  }
}
