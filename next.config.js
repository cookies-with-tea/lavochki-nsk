module.exports = {
    compiler: {
    styledComponents: true
  },
  reactStrictMode: false,
  swcMinify: true,
  async rewrites() {
    return[
      {
        source: '/:path*',
        destination: 'http://localhost:8000/api/v1/:path*',
      },
    ]
},
}

