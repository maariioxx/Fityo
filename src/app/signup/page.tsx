'use client';

import { MdEmail } from 'react-icons/md';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { Button } from 'flowbite-react';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function Page() {
  const [emailInput, setEmailInput] = useState('');
  return (
    <div>
      <div className="flex flex-col items-center gap-4">
        <Button
          className="w-64"
          size="xl"
          color="blue"
          onClick={() => signIn('google', { callbackUrl: '/signup/2' })}
        >
          <FaGoogle className="mr-3 mt-[0.05rem]" />
          <span>Sign in with Google</span>
        </Button>
        <Button
          size="xl"
          className="w-64 bg-zinc-900 enabled:hover:bg-zinc-950"
          onClick={() => signIn('github', { callbackUrl: '/signup/2' })}
        >
          <FaGithub className="mr-3 mt-[0.05rem]" />
          <span>Sign in with Github</span>
        </Button>
      </div>
      <div className="inline-flex items-center justify-center w-full">
        <hr className="w-48 h-px my-8 bg-green-700 border-0 dark:bg-gray-700" />
        <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2">
          or
        </span>
      </div>
      <form
        action={() =>
          signIn('email', { email: emailInput, callbackUrl: '/signup/2' })
        }
        className="flex flex-col items-center gap-5"
      >
        <label className="relative grid grid-rows-2">
          <span className="absolute left-2 bottom-[4.9rem] px-2 bg-white">
            Email:
          </span>
          <input
            required
            type="email"
            name="email"
            id="email"
            onChange={(e) => setEmailInput(e.target.value)}
            className="form-input w-64"
          />
        </label>
        <Button type="submit" color="success" size="xl">
          <MdEmail className="mr-2" />
          Sign in with your email
        </Button>
      </form>
    </div>
  );
}
