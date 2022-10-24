/** @type {import('next').NextConfig} */
const path = require("path");
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')

const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true
  },
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, './app/styles')],
    prependData: `@import "@/app/styles/resources/variables/index.scss";`,
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
}

module.exports = nextConfig
