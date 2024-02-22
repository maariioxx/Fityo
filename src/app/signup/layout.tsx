import { cairo } from '../fonts';

export default function SignupLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className=" flex flex-col items-center justify-center gap-8">
      <h1 className={`${cairo.className} text-7xl font-bold`}>
        Welcome to Fityo
      </h1>
      {children}
    </div>
  );
}
