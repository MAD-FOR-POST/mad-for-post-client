import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundColor: {
        B5D9D9: '#B5D9D9',
        DADDBC: '#DADDBC',
      },
      colors: {
        'orange-pink': '#F4B7A8',
      },
      boxShadow: {
        '3xl': '0px -80px 100px 80px  rgba(255,255,255,1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      width: {
        custom: 'calc(100vw - 22px)', // Adjust the padding value as needed
      },
      animation: {
        slidein: 'slidein 90s linear 1s infinite alternate ',
        slideout: 'slideout 90s linear 1s infinite alternate ',
      },
      keyframes: {
        slidein: {
          '0%, 100%': {
            transform: 'translateX(0)',
          },
          '50%': {
            transform: 'translateX(250%)', // Adjust the distance as needed
          },
        },
        slideout: {
          '0%, 100%': {
            transform: 'translateX(0)',
          },
          '50%': {
            transform: 'translateX(-250%)', // Adjust the distance as needed
          },
        },
      },
    },
  },
  plugins: [],
}
export default config
