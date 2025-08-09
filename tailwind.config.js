/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Colores personalizados
      colors: {
        'brand-primary': {
          DEFAULT: '#667eea', // El inicio de tu gradiente
          dark: '#764ba2',   // El final de tu gradiente
        },
        'status-success': '#22c55e',
        'status-error': '#ef4444',
        'status-warning': '#f59e0b',
      }
    },
  },
  plugins: [],
}