// app/schemas/register.schema.ts
import { z } from "zod";

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Full name must be at least 6 characters")
      .max(50, "Full name must be at most 50 characters"),

    email: z.string().trim().email("Enter a valid email address"),

    mobile: z
      .string()
      .regex(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be at most 20 characters"),

    confirm: z.string().min(6, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });

// (optional) type inference
export type RegisterSchemaType = z.infer<typeof registerSchema>;
