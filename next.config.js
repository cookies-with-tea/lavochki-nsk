/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true
  },
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'app/styles')],
      prependData: `@import "@/app/styles/variable.scss";`,
  },
}

module.exports = nextConfig
