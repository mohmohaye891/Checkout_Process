import * as z from "zod";

export const LoginSchema = z.object({
  email: z
    .string({ error: "Email is required" })
    .min(8, { message: "Please enter valid email address" }),
  password: z
    .string({ error: "Password is required" })
    .min(8, { message: "Password is required" }),
});

export type Login = z.infer<typeof LoginSchema>;
