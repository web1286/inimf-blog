/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  // GitHub Pages 部署时需要 basePath（仓库名）
  // 绑定自定义域名后这里可以去掉
  basePath: isProd && process.env.GITHUB_PAGES ? '/inimf-blog' : '',
  assetPrefix: isProd && process.env.GITHUB_PAGES ? '/inimf-blog/' : '',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
