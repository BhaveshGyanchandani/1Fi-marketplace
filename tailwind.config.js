/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Verified brand color from live 1Fi app (see docs/SKILL.md)
        primary: {
          DEFAULT: '#712CDC',
          50: '#F4EEFC',
          100: '#E7DAF9',
          200: '#CFB6F3',
          300: '#B78FED',
          400: '#9C68E5',
          500: '#712CDC',
          600: '#5F22BC',
          700: '#4C1B96',
          800: '#391470',
          900: '#260D4A',
        },
      },
      borderRadius: {
        card: '16px',
        pill: '999px',
      },
      boxShadow: {
        card: '0 2px 10px rgba(20, 12, 40, 0.06)',
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};
