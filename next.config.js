/** @type {import('next').NextConfig} */
const path = require("path");
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')

const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true
  },
  env: {
    BOT_USERNAME: process.env.BOT_USERNAME
  },
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, './app/styles')],
    prependData: `@import "@/app/styles/resources/variables/index.scss";`,
  },
  images : {
    domains : ['localhost']
  },
  webpack: (
      config,
      { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    config.module.rules.push({
      test: /\.svg$/,
      loader: 'svg-sprite-loader',
    })

    config.plugins.push(new SpriteLoaderPlugin())

    return config
  },
  async rewrites() {
    return [
      {
        source: '/api/benches/',
        destination: 'http://localhost:8000/api/v1/benches/',
      },
      {
        source: '/:path*',
        destination: 'http://localhost:8000/api/v1/:path*',
      },
    ]
  }
}

module.exports = nextConfig
