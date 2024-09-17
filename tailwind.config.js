/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      boxShadow: {
        table: '0px 1px 13px 0px rgba(0, 0, 0, 0.05)',
        form: '0px 1px 13px 0px rgba(0, 0, 0, 0.05)',
        'form-identify': 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;',
      },
    },
  },
  plugins: [],
};
