/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isProd && process.env.GITHUB_PAGES ? '/inimf-blog' : '',
  assetPrefix: isProd && process.env.GITHUB_PAGES ? '/inimf-blog/' : '',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
