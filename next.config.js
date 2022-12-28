const path = require("path");
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: `${process.env.BASE_URL}/api/v1/:path*`
      },
    ]
  },
  reactStrictMode: false,
  compiler: {
    styledComponents: true
  },
  env: {
    BOT_USERNAME: process.env.BOT_USERNAME,
    BASE_URL: process.env.BASE_URL
  },
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, './app/styles')],
    prependData: `@import "@/app/styles/resources/index.scss";`
  },
  images : {
    domains : ['localhost']
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      loader: 'svg-sprite-loader'
    })

    config.plugins.push(new SpriteLoaderPlugin())

    return config
  }
}

module.exports = nextConfig
