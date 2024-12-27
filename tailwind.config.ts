import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-open-sans)', 'system-ui', 'sans-serif'],
      },
      colors: {
        stripe: {
          text: '#1a1f36',
          muted: '#6b7280',
          light: '#f6f9fc',
          border: '#e6ebf1',
          'border-light': '#f0f3f9',
          primary: {
            DEFAULT: '#635bff',
            dark: '#5851df',
            light: '#7a73ff',
            gradient: 'linear-gradient(135deg, #635bff 0%, #7a73ff 100%)'
          },
          success: {
            DEFAULT: '#34c759',
            dark: '#2db14d',
            light: '#40d666'
          },
          danger: {
            DEFAULT: '#ff3b30',
            dark: '#e6352b',
            light: '#ff4f45'
          }
        }
      },
      boxShadow: {
        'stripe-sm': '0 2px 4px -1px rgba(50,50,93,.12), 0 1px 2px -1px rgba(0,0,0,.1)',
        'stripe': '0 4px 8px -2px rgba(50,50,93,.12), 0 2px 4px -2px rgba(0,0,0,.08)',
        'stripe-lg': '0 12px 24px -6px rgba(50,50,93,.12), 0 8px 16px -8px rgba(0,0,0,.1)',
        'stripe-xl': '0 20px 30px -8px rgba(50,50,93,.12), 0 10px 20px -10px rgba(0,0,0,.1)'
      },
      backgroundImage: {
        'stripe-gradient': 'linear-gradient(135deg, #635bff 0%, #7a73ff 100%)',
      }
    },
  },
  plugins: [],
} satisfies Config;
