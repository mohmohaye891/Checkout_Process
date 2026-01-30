import * as z from "zod";

export const PersonalSchema = z.object({
  fullname: z
    .string({ error: "Fullname is required" })
    .min(3, { message: "Fullname must be at lease 3 characters long" }),
  email: z.string().email({ message: "Please provide a valid email!" }),
  phoneNumber: z
    .string({ message: "Please enter valid Phone number" })
    .length(11, { message: "Phone Number is required" })
    .optional(),
  address: z
    .string({ error: "Address is required" })
    .min(3, { message: "Address must be at lease 3 characters long" }),
  city: z
    .string({ error: "City is required" })
    .min(1, { message: "City is required" }),
  postalCode: z
    .string({ error: "Postal code is required" })
    .min(1, { message: "Postal code is required" }),
  country: z.string({ error: "Country is required" }).optional(),
  dateOfBirth: z.date({ error: "Date of birth is required" }).optional(),
});

export type Personal = z.infer<typeof PersonalSchema>;
