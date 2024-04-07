'use client';

import { Session } from 'next-auth';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Links from './Links';
import ThemeToggle from './ThemeToggle';
import ProfileDropdown from './ProfileDropdown';
import { MdMenu, MdClose } from 'react-icons/md';

export default function NavbarContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toggleNavbar, setToggleNavbar] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    const width = window.innerWidth;
    setWindowWidth(width);
  }, []);

  return (
    <div className="fixed z-10 top-0 w-screen bg-green-700 px-6 py-3 flex flex-col gap-8 sm:flex-row justify-around items-center">
      <div className="flex items-center justify-between w-full">
        <span
          onClick={() => setToggleNavbar(!toggleNavbar)}
          className="sticky flex-shrink-0 top-7 cursor-pointer sm:hidden text-2xl z-20"
        >
          {toggleNavbar ? <MdClose /> : <MdMenu />}
        </span>
        <Image
          src="/assets/logo-48.png"
          alt="Fityo logo"
          width={48}
          height={48}
        />
        <div className="h-6 w-6"></div>
      </div>
      <div
        className={`sm:fixed ${
          toggleNavbar || windowWidth > 640 ? 'fixed' : 'hidden'
        } top-0 flex flex-col sm:flex-row bg-green-700 w-screen items-center gap-8 px-6 py-3 justify-around z-10`}
      >
        <Image
          src="/assets/logo-48.png"
          alt="Fityo logo"
          width={48}
          height={48}
          className="drop-shadow-xl"
        />
        <Links />
        <div className="flex gap-4 items-center">
          <ThemeToggle />
          {children}
        </div>
      </div>
    </div>
  );
}
