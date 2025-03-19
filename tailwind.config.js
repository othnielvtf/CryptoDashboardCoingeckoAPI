/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // This enables the .dark class-based dark mode
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
      },
      colors: {
        // Custom colors for both light and dark mode
        primary: {
          light: '#3B82F6', // Blue-500
          dark: '#60A5FA',  // Blue-400
        },
        background: {
          light: '#FFFFFF',
          dark: '#111827',  // Gray-900
        },
        card: {
          light: '#F9FAFB', // Gray-50
          dark: '#1F2937',  // Gray-800
        },
        text: {
          light: '#1F2937', // Gray-800
          dark: '#F9FAFB',  // Gray-50
        },
      },
    },
  },
  plugins: [],
};
