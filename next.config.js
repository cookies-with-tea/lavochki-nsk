module.exports = {
    compiler: {
    styledComponents: true
  },
  reactStrictMode: false,
  swcMinify: true,
  env: {
    BOT_USERNAME: process.env.BOT_USERNAME
  },
  async rewrites() {
    return[
      {
        source: '/:path*',
        destination: 'http://localhost:8000/api/v1/:path*',
      },
    ]
},
}

