import Link from 'next/link';
import { Button } from 'flowbite-react';

export default function Home() {
  return (
    <main className="flex flex-col items-center grow justify-center gap-20">
      <div className="flex flex-col gap-5 items-center">
        <h1 className="text-9xl font-semibold hover:text-green-700 transition-colors">
          <span className="text-green-700">Fit</span>yo
        </h1>
        <p className="text-xl font-medium">Your complete fitness app</p>
      </div>
      <div className="flex gap-12">
        <Link href="/home">
          <Button color="success">Sign up</Button>
        </Link>
        <Button color="success">Log in</Button>
      </div>
    </main>
  );
}
