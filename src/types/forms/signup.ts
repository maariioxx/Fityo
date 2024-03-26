import moment from 'moment';
import { z } from 'zod';

const usernameRegex = new RegExp(/^[A-Za-z0-9_-]+$/);

export const signUpSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: 'Minimum 3 characters' })
      .regex(usernameRegex, { message: 'Only characters, _ and -' }),
    birthdate: z.coerce.date(),
    genre: z.enum(['M', 'F', 'Other']),
  })
  .refine((data) => moment().subtract(18, 'years').toDate() > data.birthdate, {
    message: 'Only 18 years old or more',
  });

export type TSignUpSchema = z.infer<typeof signUpSchema>;
