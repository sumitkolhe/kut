import type { Config } from 'tailwindcss'

export default <Config>{
  darkMode: 'class',
  content: ['./src/**/*.vue'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        gray: {
          50: '#fff',
          100: '#FAFAFA',
          200: '#EAEAEA',
          300: '#999',
          400: '#888',
          500: '#666',
          600: '#444',
          700: '#333',
          800: '#111',
          900: '#000',
        },
        error: {
          lighter: '#F7D4D6',
          light: '#FF1A1A',
          DEFAULT: '#E00',
          dark: '#C50000',
        },
        success: {
          lighter: '#D3E5FF',
          light: '#3291FF',
          DEFAULT: '#0070F3',
          dark: '#0761D1',
        },
        warning: {
          lighter: '#FFEFCF',
          light: '#F7B955',
          DEFAULT: '#F5A623',
          dark: '#AB570A',
        },
        violet: {
          lighter: '#D8CCF1',
          light: '#8A63D2',
          DEFAULT: '#7928CA',
          dark: '#4C2889',
        },
        cyan: {
          lighter: '#AAFFEC',
          light: '#79FFE1',
          DEFAULT: '#50E3C2',
          dark: '#29BC9B',
        },
        highlight: {
          lighter: '#F81CE5',
          light: '#EB367F',
          DEFAULT: '#FF0080',
          dark: '#FFF500',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
