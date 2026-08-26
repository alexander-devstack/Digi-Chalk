/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        slate: {
          950: '#070B0E',
          900: '#0B1015',
          850: '#111822',
          800: '#182230',
          750: '#1F2C3E',
          700: '#2A3B52',
          600: '#3D5373',
        },
        chalk: {
          white: '#F8FAFC',
          cyan: '#38BDF8',
          emerald: '#34D399',
          amber: '#FBBF24',
          coral: '#FB7185',
          violet: '#A78BFA',
          lime: '#A3E635',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'slate-radial': 'radial-gradient(circle at 50% 30%, rgba(56, 189, 248, 0.08) 0%, rgba(11, 16, 21, 0) 70%)',
        'slate-noise': 'radial-gradient(circle at 20% 20%, rgba(52, 211, 153, 0.05) 0%, transparent 40%), radial-gradient(circle at 80% 80%, rgba(251, 113, 133, 0.05) 0%, transparent 40%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glow: {
          '0%': { filter: 'drop-shadow(0 0 4px rgba(56, 189, 248, 0.4))' },
          '100%': { filter: 'drop-shadow(0 0 12px rgba(56, 189, 248, 0.8))' },
        },
      },
    },
  },
  plugins: [],
}
