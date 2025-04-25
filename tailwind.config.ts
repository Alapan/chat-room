import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/stories/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      regular: ['Inconsolata-Regular'],
      bold: ['Incolsolata-Bold'],
    },
  },
  plugins: [],
};
export default config;
