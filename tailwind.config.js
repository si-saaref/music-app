/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				roboto: ['Roboto', 'sans-serif'],
				sans: ['Roboto', ...defaultTheme.fontFamily.sans],
			},
			colors: {
				'dark-glass': 'rgba(255, 255, 255, 0.2)',
			},
		},
	},
	plugins: [],
};
