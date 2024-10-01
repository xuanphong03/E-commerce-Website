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
      screens: {
        sm: '540px',
        md: '720px',
        lg: '960px',
        xl: '1140px',
        '2xl': '1320px',
      },
      width: {
        '1/10': '10%',
        100: '400px',
        125: '500px',
        150: '600px',
        160: '640px',
        175: '700px',
      },
      maxWidth: {
        '1/10': '10%',
        '1/5': '20%',
        '1/4': '25%',
        '1/3': '33.333333%',
        '2/5': '40%',
        '1/2': '50%',
        100: '400px',
      },
      flexBasis: {
        '1/10': '10%',
      },
    },
  },
  plugins: [],
};
