import Link from 'next/link';
import { Button } from 'flowbite-react';

export default function HomeSetupButton({ link }: { link: string }) {
  return (
    <div className="self-center justify-self-center">
      <Link href={link}>
        <Button color="success" className="w-32 h-20 text-2xl">
          <span className="text-xl">Setup</span>
        </Button>
      </Link>
    </div>
  );
}
