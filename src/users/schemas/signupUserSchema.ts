import { z } from 'zod';

export const signupUserSchema = z
  .object({
    username: z
      .string()
      .min(2, { message: 'Username must be at least 2 characters long' }),
    email: z.string().email({ message: 'Please enter a valid email address' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' }),
  })
  .required();

export type SignupUserDto = z.infer<typeof signupUserSchema>;
