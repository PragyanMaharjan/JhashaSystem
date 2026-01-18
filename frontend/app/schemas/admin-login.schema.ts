import { z } from "zod";

export const adminLoginSchema = z.object({
  username: z.string().trim().min(3, "Username is required (min 3 chars)"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type AdminLoginValues = z.infer<typeof adminLoginSchema>;
