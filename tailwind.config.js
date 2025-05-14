/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
        'serif': ['Playfair Display', 'ui-serif', 'Georgia'],
        "poppins": ['Poppins', 'sans-serif'],
      },
      colors: {
        background: '#ffffff',       // Fondo blanco
        primary: '#7D3C98',          // Púrpura (como el de la imagen)
        textBase: '#333333',         // Texto principal
        footer: '#f3f3f3',           // Fondo para pie de página
      },
    },
  },
  plugins: [],
}
