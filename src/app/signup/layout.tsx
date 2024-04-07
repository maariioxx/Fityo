import { cairo } from '../fonts';
import Image from 'next/image';

export default function SignupLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-16">
      <Image
        src="/assets/logo-128.svg"
        width={128}
        height={128}
        alt="Fityo logo"
        className="drop-shadow-xl"
      />
      {children}
    </div>
  );
}
