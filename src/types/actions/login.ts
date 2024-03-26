import { ZodError, z } from 'zod';

export const logInSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Password are of at least 8 characters' }),
});

export type TLogInFunction = Promise<
  | {
      status: string;
      error: ZodError<{ email: string; password: string }>;
    }
  | {
      error: string;
      status?: undefined;
    }
>;

export type TLogInSchema = z.infer<typeof logInSchema>;
