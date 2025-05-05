import { z } from "zod";

export const loginSchema = z.object({
  email: z.string()
    .nonempty({message: "Email is required"})
    .email({message: "Must be a valid email address"})
    .max(50, {message: "Email must be at most 50 characters long"}),
  password: z.string()
    .nonempty({message: "Password is required"})
    .min(6, {message: "Password must be at least 5 characters long"})
    .max(15, {message: "Password must be at most 15 characters long"})
    .refine((password) => /[A-Z]/.test(password),
      {message: "Password must be include at least 1 uppercase letter"})
    .refine((password) => /[a-z]/.test(password),
      {message: "Password must be include at least 1 lowercase letter"})
    .refine((password) => /[0-9]/.test(password),
      {message: "Password must be include at least 1 number"})
    .refine((password) => /[!@#$%^&*]/.test(password), {
      message: "Password must be include at least 1 of these special characters: !@#$%^&*",
    }),
});
