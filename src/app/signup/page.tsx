'use client';

import Form from '@/app/signup/components/Form';
import { redirect } from 'next/navigation';
import { cairo } from '../fonts';
import { MdEast } from 'react-icons/md';
import { FaGoogle } from 'react-icons/fa';
import Link from 'next/link';
import { Button } from 'flowbite-react';
import { signIn } from 'next-auth/react';

export default function Page() {
  return (
    <>
      <Button
        color="blue"
        onClick={() => signIn('google', { callbackUrl: '/signup/2' })}
      >
        <FaGoogle className="mr-3 mt-[0.05rem]" />
        <span>Sign in with Google</span>
      </Button>
      <Link
        href="/login"
        className="group flex items-center gap-4 text-green-700 hover:text-[1.05rem] transition-all"
      >
        <MdEast className="mt-0.5 -rotate-90 group-hover:rotate-0 transition-transform" />
        Log in to your account
      </Link>
    </>
  );
}
