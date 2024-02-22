import { Poppins, Cairo } from 'next/font/google';

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});
export const cairo = Cairo({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});
