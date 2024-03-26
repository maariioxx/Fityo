import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        move: {
          '0%': { transform: 'translate(-50vw)' },
          '50%': { transform: 'translate(0vw)' },
          '100%': { transform: 'translate(50vw)' },
        },
      },
      animation: {
        move: 'move 50s infinite linear',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
export default config;
