/** @type {import('next').NextConfig} */
//await import("./src/env.mjs");
const nextConfig = {
  
  experimental: {
    serverActions: true,
    appDir: true,
  },
}

module.exports = nextConfig
