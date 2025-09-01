/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {

    extend: {
      boxShadow: {
        'default-card': '0px 2px 20px 2px rgba(0, 0, 0, 0.1)', // x, y, blur, spread, color
        'object-card': '0px 2px 20px 2px rgba(0, 0, 0, 0.2)', // x, y, blur, spread, color
        'object-button': '0px 0px 0px 2px 20px 2px rgba(0, 0, 0, 0.2)', // x, y, blur, spread, color
      },
    },
    colors: {
      white: '#FBFBFB',
      black: '#121212',
      primary: '#1A7358',
      secondary: '#C5D7C6',
      tertiary: '#135F48',
      base:"#1E1E1E",
      rose:"#EDD8D7",
      softblack: '#3D3D3D',
      coal:'#212121',
      glass:'#212121B3',
      darkglass:'#212121CC',
      lightgray:'#a8a8a8',

      "err-main":"#B71C1C",
      "err-bg":"#EF9A9A",
      
      "info-main":"#37a8ff",
      "info-bg":"#2194eb",
      "warning-main":"#fcff3a",
      "warning-bg":"#ced10d",
      
      "ok-main":"#295429",
      "ok-bg":"#6fd96f",
    },
  },
  plugins: [],
}

