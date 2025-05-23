module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // Add any other paths where you use Tailwind classes
  ],
  theme: {
    extend: {
      // Your theme extensions
    },
  },
  plugins: [
    // Any Tailwind plugins you need
  ],
};
