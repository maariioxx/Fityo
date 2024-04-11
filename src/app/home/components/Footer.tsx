import { FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <div className="bg-slate-200 dark:bg-zinc-900 w-screen flex justify-center py-4">
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
    </div>
  );
}
