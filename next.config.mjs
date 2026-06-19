/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.jsdelivr.net" },
      { protocol: "https", hostname: "i.imgur.com" },
      { protocol: "https", hostname: "i.postimg.cc" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
    ],
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
