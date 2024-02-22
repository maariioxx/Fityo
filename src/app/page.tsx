import Link from 'next/link';
import { Button } from 'flowbite-react';
import sql from '@/database/db';
import { cairo } from './fonts';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import IconsCarousel from '@/components/IconsCarousel';

export default async function Home() {
  return (
    <main className="pt-40 flex flex-col items-center grow justify-center gap-28">
      <IconsCarousel />
      <div className="flex flex-col gap-5 items-center">
        <h1
          className={`${cairo.className} text-9xl font-semibold hover:text-green-700 transition-colors`}
        >
          <span className="text-green-700">Fit</span>yo
        </h1>
        <p className="text-xl font-medium">Your fitness app</p>
      </div>
      <div className="flex gap-12">
        <Link href="/signup">
          <Button color="success">Sign up</Button>
        </Link>
        <Link href="/login">
          <Button color="success">Log in</Button>
        </Link>
      </div>
      <IconsCarousel />
    </main>
  );
}
