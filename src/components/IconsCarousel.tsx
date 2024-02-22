import Image from 'next/image';
export default function IconsCarousel() {
  return (
    <div className="flex gap-3">
      <Image
        src="/home_icons.svg"
        alt="Fityo home icons"
        width={4000}
        height={300}
        className="scale-[2.5]"
      />
    </div>
  );
}
