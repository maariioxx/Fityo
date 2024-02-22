import { Button } from 'flowbite-react';
import Link from 'next/link';
import { MdHome } from 'react-icons/md';
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-16">
      <h1 className="text-6xl">404 | Page not found</h1>
      <Link href="/home">
        <Button color="success" size="lg">
          <MdHome className="h-5 w-5 mr-2" />
          Go home
        </Button>
      </Link>
    </div>
  );
}
