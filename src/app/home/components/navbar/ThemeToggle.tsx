'use client';

import { Button } from 'flowbite-react';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { useTheme } from 'next-themes';

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  console.log(theme);
  return (
    <Button
      color="success"
      size="xs"
      onClick={() => (theme === 'dark' ? setTheme('light') : setTheme('dark'))}
      className="rounded-full size-8"
    >
      {theme === 'dark' ? (
        <MdOutlineLightMode className="text-xl" />
      ) : (
        <MdOutlineDarkMode className="text-xl" />
      )}
    </Button>
  );
}
