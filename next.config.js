// // /** @type {import('next').NextConfig} */
// // const nextConfig = {
// //   images: {
// //     domains: ["images.unsplash.com", "fakestoreapi.com"],
// //     remotePatterns: [
// //       {
// //         protocol: "https",
// //         hostname: "fakestoreapi.com",
// //         pathname: "/img/**",
// //       },
// //     ],
// //   },
// // };

// // export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "fakestoreapi.com",
//         pathname: "/img/**", // This must match the actual image path used in your app
//       },
//       {
//         protocol: "https",
//         hostname: "images.unsplash.com",
//         pathname: "/**", // Unsplash uses various paths
//       },
//     ],
//   },
// };

// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization configuration
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
        pathname: "/img/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
    // Recommended for better caching behavior
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
  },

  // Font optimization (disable if not using next/font)
  optimizeFonts: false,

  // Webpack configuration to handle missing modules
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      path: false,
      os: false,
    };

    // Fixes lightningcss-related issues
    config.externals = config.externals || {};
    config.externals["lightningcss"] = "lightningcss";

    return config;
  },

  // Enable React Strict Mode
  reactStrictMode: true,

  // Recommended for Vercel deployments
  output: "standalone",

  // Experimental features (optional)
  experimental: {
    optimizePackageImports: [
      "@radix-ui/react-slot",
      "lucide-react",
      "framer-motion",
    ],
    esmExternals: "loose",
  },
};

module.exports = nextConfig;
