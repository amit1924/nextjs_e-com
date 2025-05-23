/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "fakestoreapi.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
        pathname: "/img/**",
      },
    ],
  },
};

export default nextConfig;
