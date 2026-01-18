import { z } from "zod"

export const RegisterDTO = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().regex(/^\d{10}$/, "Mobile number must be 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export const LoginDTO = z.object({
  mobile: z.string().regex(/^\d{10}$/, "Mobile number must be 10 digits"),
  password: z.string().min(1, "Password is required"),
})

export type RegisterRequest = z.infer<typeof RegisterDTO>
export type LoginRequest = z.infer<typeof LoginDTO>

export interface AuthResponse {
  success: boolean
  message: string
  data?: {
    token?: string
    user?: {
      id: string
      fullName: string
      email: string
      mobile: string
      role: string
    }
  }
}
