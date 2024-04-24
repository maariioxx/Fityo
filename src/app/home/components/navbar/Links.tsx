'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { name: 'Home', href: '/home' },
  { name: 'Nutrition', href: '/home/nutrition' },
  { name: 'Measurements', href: '/home/measurements' },
];

export default function Links() {
  const pathname = usePathname();
  return (
    <div className="ml-0 sm:ml-28 text-white flex flex-col items-center sm:flex-row gap-16">
      {LINKS.map((link) => {
        return (
          <Link
            href={link.href}
            key={crypto.randomUUID()}
            className={`hover:bg-slate-50 dark:hover:bg-zinc-950 hover:text-green-700 dark:hover:text-slate-50 p-2 rounded-lg transition-colors ${
              pathname === link.href &&
              'bg-slate-50 dark:bg-zinc-950 text-green-700 dark:text-slate-50'
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </div>
  );
}
