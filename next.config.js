/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  // 自定义域名 www.inimf.com，无需 basePath/assetPrefix
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
