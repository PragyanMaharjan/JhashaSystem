import type { Request, Response } from "express"
import { RegisterDTO, LoginDTO, type AuthResponse } from "../dtos/auth.dto"
import { AuthService } from "../services/auth.service"
import { ZodError } from "zod"

const authService = new AuthService()

export const register = async (req: Request, res: Response<AuthResponse>) => {
  try {
    const body = RegisterDTO.parse(req.body)
    const user = await authService.register(body)

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: { user },
    })
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: error.errors[0].message,
      })
    }
    const err = error as any
    res.status(400).json({
      success: false,
      message: err.message || "Registration failed",
    })
  }
}

export const login = async (req: Request, res: Response<AuthResponse>) => {
  try {
    const body = LoginDTO.parse(req.body)
    const result = await authService.login(body)

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    })
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: error.errors[0].message,
      })
    }
    const err = error as any
    res.status(401).json({
      success: false,
      message: err.message || "Login failed",
    })
  }
}
