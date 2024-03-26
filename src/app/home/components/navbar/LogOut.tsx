'use client';

import { signOut } from 'next-auth/react';
import { Button } from 'flowbite-react';

export default function LogOut() {
  return <div onClick={() => signOut({ callbackUrl: '/' })}>Sign out</div>;
}
