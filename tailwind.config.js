/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            'h1': {
              marginBottom: '0.25rem',
            },
            'h2': {
              marginBottom: '0.25rem',
            },
            'h3': {
              marginBottom: '0.25rem',
            },
            'h4': {
              marginBottom: '0.25rem',
            },
            'h5': {
              marginBottom: '0.25rem',
            },
            'h6': {
              marginBottom: '0.25rem',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
