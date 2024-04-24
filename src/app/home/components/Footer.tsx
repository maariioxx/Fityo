import { FaGithub } from 'react-icons/fa';
import Image from 'next/image';
export default function Footer() {
  return (
    <div className="bg-slate-200 dark:bg-zinc-900 w-screen flex flex-col md:flex-row items-center justify-center py-4 gap-2 md:gap-8">
      <p className="flex items-center gap-2">
        Made by{' '}
        <a
          href="https://github.com/maariioxx/fityo"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-700 underline decoration-slate-200 dark:decoration-zinc-900 hover:decoration-green-700 dark:hover:decoration-green-700 decoration-2 transition-all"
        >
          <span className="flex items-center gap-0.5">
            <FaGithub />
            maariioxx
          </span>
        </a>{' '}
        | 2024
      </p>
      <Image
        src="/assets/edamam.svg"
        width={200}
        height={70}
        alt="Powered by Edamam"
        className="pb-3"
      />
    </div>
  );
}
