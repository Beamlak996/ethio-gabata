import { UserRole } from "@prisma/client";
import * as z from "zod"

export const LoginSchema = z.object({
  name: z.string().min(1, {
    message: "Username is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Username is required",
  }),
  fullName: z.string().min(1, {
    message: "Fullname is required"
  }),
  address: z.string().min(1, {
    message: "Address is required."
  }),
  phoneNumber: z.coerce.number().min(10, {
    message: "Phone number is required"
  }),
  bankAccount: z.coerce.number().min(1,  {
    message: "Bank Account is reqired."
  })
});


export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});

export const SettingsSchema = z.object({
  id: z.string(),
  name: z.optional(z.string()),
  isTwoFactorEnabled: z.optional(z.boolean()),
  email: z.optional(z.string().email()),
  password: z.optional(z.string().min(6)),
  newPassword: z.optional(z.string().min(6)),
  role: z.enum([UserRole.ADMIN, UserRole.USER]),
});


export const AddPackageSchema = z.object({
  title: z.string().min(1, {
    message: "Package must have a title.",
  }),
  description: z.string().min(1, {
    message: "Please add a package description.",
  }),
  price: z.coerce.number().min(1, {
    message: "Please add the price of the package",
  }),
  commission: z.optional(z.coerce.number()),
});

export const EditPackageSchema = z.object({
  id: z.string(),
  title: z.string().min(1, {
    message: "Package must have a title.",
  }),
  description: z.string().min(1, {
    message: "Please add a package description.",
  }),
  price: z.coerce.number().min(1, {
    message: "Please add the price of the package",
  }),
  commission: z.optional(z.coerce.number()),
});
