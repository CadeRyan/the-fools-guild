/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#040D12',
        'dark-blue-2': '#183D3D',
        'teal': '#5C8374',
        'light-teal': '#93B1A6',
        'orange': '#ef8354',
      },
      blur: {
        xxs: '1px',
        xs: '2px',
      },
    },
  },
  plugins: [require('tailwindcss-motion')],
}
