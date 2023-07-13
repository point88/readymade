/** @type {import('tailwindcss').Config} */

module.exports = {
  // corePlugins: {
  //   preflight: false,
  // },
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  important: '#root',
  theme: {
    screens: {
      'mb': '360px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1500px'
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'bgd': '#F7F5F2',
      'green': '#009000',
      'darkgreen': '#009800',
      'darkgreen1': '#009C00',
      'darkgreen2': '#009400',
      'lightgreen': '#008C00',
      'lightgreen1': '#009100',
      'lightgreen2': '#008D00',
      'blue': '#003049',
      'darkblue': '#252533',
      'gray': '#92939C',
      'lightgray': '#EDEFF1',
      'lightgray1': '#F4F4F4',
      'lightgray2': '#707070',
      'lightgray3': '#F4F1F1',
      'darkgray': '#959595',
      'yellow': '#F8D850',
      'lightyellow': '#FFD800',
      'lightyellow1': '#FED821',
      'darkblack': '#333333',
      'white': '#FFFFFF',
      'brown': '#333030'
    },
    extend: {
      dropShadow: {
        'custom': '0px 3px 3px rgba(0, 0, 0, 0.16)',
        'card': '0px 2px 24px rgba(0, 0, 0, 0.08)',
        'custom1': '0px 24px 56px rgba(0, 23, 69, 0.04)'
      },
      padding: {
        '2' : '0.625rem'
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}