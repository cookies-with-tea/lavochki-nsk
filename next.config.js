const path = require("path");

module.exports = {
    compiler: {
    styledComponents: true
  },
  reactStrictMode: false,
  swcMinify: true,
  env: {
    BOT_USERNAME: process.env.BOT_USERNAME
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'app/styles')],
  },
  async rewrites() {
    return[
      {
        source: '/benches',
        destination: 'http://localhost:8000/api/v1/benches/',
      },
      {
        source: '/:path*',
        destination: 'http://localhost:8000/api/v1/:path*',
      }
    ]
  }
}

