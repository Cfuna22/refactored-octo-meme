/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      fontFamily: {
        'mono': ['ui-monospace', 'SFMono-Regular', 'Monaco', 'Consolas', 'Liberation Mono', 'Menlo', 'monospace'],
      },
      animation: {
        'pulse': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      colors: {
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5', 
          400: '#34d399',
          600: '#059669',
          700: '#047857',
          900: '#064e3b',
        }
      }
    },
  },
  plugins: [],
};