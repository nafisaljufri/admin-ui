/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#299D91',
        defaultBlack: '#1F222A',
        'special-bg': '#272B34',
        'special-bg2': '#343C48',
        'special-bg3': '#3A4453',
        'special-red': '#FF4B4A',
        'special-green': '#00A86B',
        'special-mainBg': '#F5F7FA',
        'gray-01': '#8BA3CB',
        'gray-02': '#8492A6',
        'gray-03': '#718096',
        'gray-04': '#C0CCDA',
        'gray-05': '#D3DCE6',
      },
      fontFamily: {
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
