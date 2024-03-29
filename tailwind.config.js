/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        'primary': '#3A7CA5',
        'primary-light': '#81C3D7',
        'cloud': '#D9DCD6'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

// https://coolors.co/palette/2f6690-3a7ca5-d9dcd6-16425b-81c3d7