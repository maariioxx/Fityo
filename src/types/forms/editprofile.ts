import { z } from 'zod';

const usernameRegex = new RegExp(/^[A-Za-z0-9_-]+$/);

export const editProfileSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Minimum 3 characters' })
    .regex(usernameRegex, { message: 'Only characters, _ and -' }),
  name: z.string().min(3, { message: 'Minimum 3 characters ' }),
  email: z.string().email(),
});

export type TEditProfile = z.infer<typeof editProfileSchema>;
