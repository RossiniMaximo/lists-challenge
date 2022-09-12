/** @type {import('next').NextConfig} */
const withSvgr = require("next-svgr");
const nextConfig = withSvgr({
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
});

module.exports = nextConfig;
