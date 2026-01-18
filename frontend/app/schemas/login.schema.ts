import { z } from "zod";

export const loginSchema = z.object({
  mobile: z
    .string()
    .regex(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at most 20 characters"),
});

// (optional) type inference
export type LoginSchemaType = z.infer<typeof loginSchema>;
