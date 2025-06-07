import { z } from "zod";

export const registerUserSchema = z
  .object({
    name: z
      .string()
      .nonempty({ message: "Name is required" })
      .min(5, { message: "Name must be at least 5 characters long" })
      .max(50, { message: "Name must be at most 50 characters long" }),
    email: z
      .string()
      .nonempty({ message: "Email is required" })
      .email({ message: "Must be a valid email address" })
      .max(50, { message: "Email must be at most 50 characters long" }),
    password: z
      .string()
      .nonempty({ message: "Password is required" })
      .min(6, { message: "Password must be at least 5 characters long" })
      .max(15, { message: "Password must be at most 15 characters long" })
      .refine((password) => /[A-Z]/.test(password), {
        message: "Password must be include at least 1 uppercase letter",
      })
      .refine((password) => /[a-z]/.test(password), {
        message: "Password must be include at least 1 lowercase letter",
      })
      .refine((password) => /[0-9]/.test(password), {
        message: "Password must be include at least 1 number",
      })
      .refine((password) => /[!@#$%^&*]/.test(password), {
        message:
          "Password must be include at least 1 of these special characters: !@#$%^&*",
      }),
    confirmPassword: z
      .string()
      .nonempty({ message: "Confirm Password is required" })
      .min(6, {
        message: "Confirm Password must be at least 5 characters long",
      })
      .max(15, {
        message: "Confirm Password must be at most 15 characters long",
      }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Confirm Password must be same as Password",
        path: ["confirmPassword"],
      });
    }
  });
