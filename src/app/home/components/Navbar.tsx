import { auth } from '@/auth/auth';
import Image from 'next/image';
import Link from 'next/link';
import ProfileDropdown from './navbar/ProfileDropdown';
import Links from './navbar/Links';

export default async function Navbar() {
  const session = await auth();

  return (
    <div className="fixed top-0 w-screen bg-green-700 px-6 py-3 flex justify-around items-center">
      <Image
        src="/assets/favicon-home.svg"
        alt="Fityo logo"
        width={48}
        height={48}
      />
      <Links />
      <ProfileDropdown session={session!} />
    </div>
  );
}
