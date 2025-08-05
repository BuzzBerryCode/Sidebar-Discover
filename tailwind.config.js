/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  safelist: [
    // Match score colors - standard Tailwind colors
    'text-green-600', 'bg-green-100', 'dark:text-green-400', 'dark:bg-green-900/30',
    'text-yellow-600', 'bg-yellow-100', 'dark:text-yellow-400', 'dark:bg-yellow-900/30',
    'text-orange-600', 'bg-orange-100', 'dark:text-orange-400', 'dark:bg-orange-900/30',
    'text-red-600', 'bg-red-100', 'dark:text-red-400', 'dark:bg-red-900/30',
    // Section background
    'bg-section-bg',
    // Common classes that might not be detected
    'bg-black', 'dark',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Original custom colors
        "abu-abu": "var(--abu-abu)",
        "agak-putih": "var(--agak-putih)",
        "basewhite": "var(--basewhite)",
        "graysblack": "var(--graysblack)",
        "neutral-10": "rgba(255, 255, 255, 1)",
        "neutral-new200": "rgba(191, 204, 218, 1)",
        "neutral-new600": "rgba(78, 101, 127, 1)",
        "neutral-100": "#f8f9fa",
        "neutral-new100": "#f8f9fa",
        "neutral-new900": "#111827",
        
        // Radix UI colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        
        // Page Background & Layout
        "page-bg": "#000000",
        "section-bg": "#0f1419",
        "card-bg": "#ffffff",
        "card-bg-dark": "#1f2937",
        
        // Text Colors
        "text-heading-main": "#f8f9fa",
        "text-primary": "#06152b",
        "text-primary-alt": "#080d1c",
        "text-secondary": "#71737c",
        "text-muted": "#999999",
        "text-heading": "#111827",
        "text-label": "#374151",
        "text-button": "#6b7280",
        "text-dark": "#06152b",
        "text-medium": "#71737c",
        "text-light": "#999999",
        
        // Brand Colors
        "brand-blue": "#557EDD",
        "brand-purple": "#6C40E4",
        "brand-blue-hover": "#4A6BC8",
        "brand-purple-hover": "#5A36C7",
        
        // Gradient Colors
        "gradient-red": "#FC4C4B",
        "gradient-pink": "#CD45BA",
        "gradient-purple": "#6E57FF",
        
        // Border Colors
        "border-light": "#dbe2eb",
        "border-lighter": "#f1f4f9",
        "border-divider": "#e1e5e9",
        "border-section": "#f3f4f6",
        "border-dropdown": "#e5e7eb",
        "border-selected": "#94c4fc",
        "border-pagination": "#2463eb",
        "border-checkbox": "#D9E1E7",
        "border-list-selected": "#94c4fc",
        "border-gray": "#dbe2eb",
        "border-light-gray": "#f1f4f9",
        "input-border": "#d1d5db",
        "action-border": "#E5E7EB",
        
        // Background Colors
        "bg-card": "#F9FAFB",
        "bg-selected": "#f1f6fe",
        "bg-hover": "#f9fafb",
        "bg-hover-alt": "#F0F0F0",
        "bg-input": "#f9fafb",
        "bg-toggle-active": "#f1f4f9",
        "bg-light": "#f1f4f9",
        "bg-white": "#ffffff",
        "hover-bg": "#f9fafb",
        "selected-bg": "#f1f6fe",
        
        // Profile & Special Backgrounds
        "bg-profile": "#384455",
        "profile-bg": "#384455",
        "ai-toggle-start": "#E7CBFD",
        "ai-toggle-end": "#E0DEEA",
        
        // Status & Feedback Colors
        "success-green": "#1ad598",
        "error-red": "#ea3a3d",
        
        // Focus & Interactive States
        "focus-ring": "#3b82f6",
        "donut-stroke": "#E5E7EB",
        
        // Component-Specific Colors
        "filter-button-active-bg": "#3b82f6",
        "filter-button-active-border": "#1d4ed8",
        "filter-button-inactive-bg": "#ffffff",
        "filter-button-inactive-border": "#dbe2eb",
        "filter-dropdown-bg": "#ffffff",
        "filter-dropdown-border": "#e5e7eb",
        
        "card-border-selected": "#94c4fc",
        "card-border-unselected": "#F1F4F9",
        "card-bg-selected": "#f1f6fe",
        "card-bg-unselected": "#ffffff",
        "metrics-bg": "#F9FAFB",
        "buzz-score-bg": "#F1F4F9",
        
        "toggle-active-bg-start": "#E7CBFD",
        "toggle-active-bg-end": "#E0DEEA",
        "toggle-inactive-bg": "#ffffff",
        "toggle-border": "#dbe2eb",
        
        "badge-primary-bg": "#f0f9ff",
        "badge-primary-border": "#dbe2eb",
        "badge-secondary-bg": "#f0fdf4",
        "badge-secondary-border": "#bbf7d0",
        "badge-text": "#111827",
        
        // Match Score Colors
        "match-green": "#22c55e",
        "match-green-bg": "#dcfce7",
        "match-yellow": "#eab308",
        "match-yellow-bg": "#fef3c7",
        "match-orange": "#f97316",
        "match-orange-bg": "#fed7aa",
        "match-red": "#ef4444",
        "match-red-bg": "#fecaca",
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(90deg, #557EDD 0%, #6C40E4 100%)',
        'gradient-brand-hover': 'linear-gradient(90deg, #4A6BC8 0%, #5A36C7 100%)',
        'gradient-buzz': 'linear-gradient(90deg, #FC4C4B 0%, #CD45BA 50%, #6E57FF 100%)',
        'gradient-ai-toggle': 'linear-gradient(to right, #E7CBFD, #E0DEEA)',
      },
      boxShadow: {
        "regular-shadow-small": "0px 2px 4px 0px rgba(27, 28, 29, 0.04)"
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      screens: {
        'xs': '480px',
        '3xl': '1600px',
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}