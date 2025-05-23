/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        sm: "calc(var(--radius) - 4px)",
        md: "calc(var(--radius) - 2px)",
        lg: "var(--radius)",
        xl: "calc(var(--radius) + 4px)",
      },
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        card: "var(--color-card)",
        "card-foreground": "var(--color-card-foreground)",
        popover: "var(--color-popover)",
        "popover-foreground": "var(--color-popover-foreground)",
        primary: "var(--color-primary)",
        "primary-foreground": "var(--color-primary-foreground)",
        secondary: "var(--color-secondary)",
        "secondary-foreground": "var(--color-secondary-foreground)",
        muted: "var(--color-muted)",
        "muted-foreground": "var(--color-muted-foreground)",
        accent: "var(--color-accent)",
        "accent-foreground": "var(--color-accent-foreground)",
        destructive: "var(--color-destructive)",
        border: "var(--color-border)",
        input: "var(--color-input)",
        ring: "var(--color-ring)",
        sidebar: "var(--color-sidebar)",
        "sidebar-foreground": "var(--color-sidebar-foreground)",
        "sidebar-primary": "var(--color-sidebar-primary)",
        "sidebar-primary-foreground": "var(--color-sidebar-primary-foreground)",
        "sidebar-accent": "var(--color-sidebar-accent)",
        "sidebar-accent-foreground": "var(--color-sidebar-accent-foreground)",
        "sidebar-border": "var(--color-sidebar-border)",
        "sidebar-ring": "var(--color-sidebar-ring)",
      },
      animation: {
        fadeIn: "fadeIn 1s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
          "100%": { transform: "translateY(0)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.8" },
          "50%": { opacity: "1" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
    },
  },
  darkMode: "class", // or 'media' if you want auto switch
  plugins: [],
};
