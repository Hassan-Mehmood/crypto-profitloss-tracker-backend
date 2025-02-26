import { z } from 'zod';

export const signinUserSchema = z
  .object({
    username: z.string(),
    password: z.string(),
  })
  .required();

export type SigninUserDto = z.infer<typeof signinUserSchema>;
