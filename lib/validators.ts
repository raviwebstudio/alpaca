import { z } from "zod";

export const emailSchema = z.string().email("Please enter a valid email address.");

export const phoneSchema = z
  .string()
  .regex(/^[6-9]\d{9}$/, "Please enter a valid 10 digit Indian mobile number.");

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long.")
  .regex(/\d/, "Password must include at least one number.");

export const otpSchema = z
  .string()
  .regex(/^\d{6}$/, "OTP must be a 6 digit code.");

export const addressSchema = z.object({
  fullName: z.string().min(2, "Full name is required."),
  phone: phoneSchema,
  line1: z.string().min(3, "Address line 1 is required."),
  line2: z.string().optional(),
  city: z.string().min(2, "City is required."),
  state: z.string().min(2, "State is required."),
  pincode: z.string().regex(/^\d{6}$/, "Pincode must be a 6 digit code."),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required."),
  email: emailSchema,
  phone: phoneSchema.optional(),
  subject: z.string().min(3, "Subject is required."),
  message: z.string().min(10, "Message should be at least 10 characters long."),
});
