import { z } from 'zod';

const usernameRegex = new RegExp(/^[A-Za-z0-9_-]+$/);

export const SkeletonSchema = z.object({
  email: z.string().email().min(1),
  username: z
    .string()
    .regex(usernameRegex, {
      message: 'Only letters, _ and - are valid',
    })
    .min(4, { message: 'Minimum 4 characters' }),
});

export const SignUpServerSchema = SkeletonSchema.extend({
  id: z.string(),
  hashed_password: z.string(),
});

export const SignUpFormSchema = SkeletonSchema.extend({
  password: z.string().min(8, { message: 'Minimum 8 characters' }),
  confirm: z.string(),
}).refine((data) => data.password === data.confirm, {
  message: 'Password do not match',
  path: ['confirm'],
});

export type TSignUpForm = z.infer<typeof SignUpFormSchema>;
