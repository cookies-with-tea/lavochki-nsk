// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')

/** @type {import('next').NextConfig} */
const nextConfig = {
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
    prependData: '@import "@/app/styles/resources/index.scss";'
  },
  images : {
    domains : ['localhost']
  },
  eslint: {
    dirs: ['pages', 'app']
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      loader: 'svg-sprite-loader'
    })

    config.plugins.push(new SpriteLoaderPlugin())

    return config
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: `${process.env.BASE_URL}/api/v1/:path*`
      },
    ]
  },
}

module.exports = nextConfig
