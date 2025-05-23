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
  },
};

module.exports = nextConfig;
