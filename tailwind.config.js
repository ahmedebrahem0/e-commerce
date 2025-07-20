/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0aad0a',
          light: '#b2f2bb',
          dark: '#088708',
        },
        secondary: {
          DEFAULT: '#4361ee',
          light: '#a0c4ff',
          dark: '#185a9d',
        },
        accent: {
          DEFAULT: '#ff6b35',
          light: '#ffd4c4',
          dark: '#e55a2b',
        },
        success: '#43e97b',
        warning: '#ffc908',
        error: '#ff5858',
        info: '#0ea5e9',
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        // ألوان الوضع الداكن المحسنة
        dark: {
          bg: {
            primary: '#0f172a',
            secondary: '#1e293b',
            tertiary: '#334155',
            card: '#1e293b',
            elevated: '#334155',
          },
          text: {
            primary: '#f8fafc',
            secondary: '#cbd5e1',
            tertiary: '#94a3b8',
            muted: '#64748b',
          },
          border: {
            primary: '#334155',
            secondary: '#475569',
            accent: '#0aad0a',
          },
          accent: {
            green: '#10b981',
            blue: '#3b82f6',
            purple: '#8b5cf6',
            orange: '#f59e0b',
            red: '#ef4444',
          }
        }
      },
      fontFamily: {
        'encode': ['Encode Sans Expanded', 'sans-serif'],
      },
      boxShadow: {
        'fresh': 'rgba(145,158,171,.2) 0px 2px 4px -1px,rgba(145,158,171,.14) 0px 4px 5px 0px,rgba(145,158,171,.12) 0px 1px 10px 0px',
        'dark-light': '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
        'dark-medium': '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
        'dark-heavy': '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
      }
    },
  },
  plugins: [],
};

