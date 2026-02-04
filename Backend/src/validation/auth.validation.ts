import { z } from "zod";

export const registerSchema = z.object({
    username: z
        .string()
        .min(3, "Username must be at least 3 characters")
        .max(20),
    email: z.string().email({ message: "Invalid email" }),
    fullname: z.string().min(3),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" }),
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

// FUTURE SCOPE