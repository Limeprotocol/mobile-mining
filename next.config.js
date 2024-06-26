const withPWA = require("next-pwa")({
  dest: "public",
  disableDevLogs: true
  // disable: process.env.NEXTAUTH_PRODUCTION ? true : false,
  // skipWaiting: true,
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false
}

module.exports = withPWA(nextConfig)
