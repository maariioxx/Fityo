import { cairo } from '../fonts';

export default function SignupLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-16">
      <h1
        className={`${cairo.className} text-6xl md:text-7xl font-bold text-center`}
      >
        Welcome to Fityo
      </h1>
      {children}
    </div>
  );
}
