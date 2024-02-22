import NextAuth, { NextAuthOptions } from 'next-auth';
import { config } from '@/auth/auth';

export const authOptions: NextAuthOptions = config;

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };


