import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#2E3192',
          dark: '#1C1F6E',
          darker: '#0A0D3A',
        },
        accent: {
          DEFAULT: '#F7941D',
          dark: '#E07A08',
        },
        whatsapp: {
          DEFAULT: '#25D366',
          dark: '#1ebe5a',
        },
        surface: '#F8F9FB',
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'Poppins', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.4s ease-out both',
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
