import Navbar from '@/app/home/components/Navbar';
import Footer from './components/Footer';

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grow flex flex-col items-center w-screen bg-green-700">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
