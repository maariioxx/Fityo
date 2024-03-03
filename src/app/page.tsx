import Link from 'next/link';
import { Button } from 'flowbite-react';
import { cairo } from './fonts';
import { redirect } from 'next/navigation';
import IconsCarousel from '@/app/components/IconsCarousel';
import { auth } from '@/auth/auth';

export default async function Home() {
  const session = await auth();
  if (typeof session?.user !== 'undefined') redirect('/home');
  return (
    <main className=" max-w-screen md:min-w-screen flex flex-col items-center justify-center gap-28">
      <IconsCarousel />
      <div className="flex flex-col gap-5 items-center">
        <h1
          className={`${cairo.className} text-8xl md:text-9xl xl:text-[10rem] font-semibold hover:text-green-700 transition-colors`}
        >
          <span className="text-green-700">Fit</span>yo
        </h1>
        <p className="text-md md:text-xl lg:text-2xl xl:text-xl font-medium">
          Your fitness app
        </p>
      </div>
      <Link href="/signup">
        <Button
          size="xl"
          className="w-28 h-12 md:w-32 md:h-16 lg:w-32 lg:h-16"
          color="success"
        >
          <span className="text-sm md:text-base lg:text-lg">Join us!</span>
        </Button>
      </Link>
      <IconsCarousel />
    </main>
  );
}
