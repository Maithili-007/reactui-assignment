import type { Config } from 'tailwindcss'
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx,mdx}', './.storybook/**/*.{ts,tsx,js,jsx,mdx}'],
  theme: { extend: {} },
  plugins: [],
} satisfies Config
