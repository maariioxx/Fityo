import Image from 'next/image';
export default function IconsCarousel() {
  return (
    <div className="relative w-screen h-6">
      <Image
        src="/home_icons.svg"
        alt="Fityo home icons"
        fill={true}
        objectFit="cover"
      />
    </div>
  );
}
