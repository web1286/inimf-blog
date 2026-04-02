// 博客配置文件 - 修改这里来自定义你的博客信息
const config = {
  // 博客名称
  title: 'inimf',
  // 博客副标题/描述
  description: '记录生活，留存思考',
  // 你的域名
  url: 'https://www.inimf.com',
  // 作者名
  author: 'inimf',
  // 每页显示文章数
  postsPerPage: 10,
  // 导航菜单
  nav: [
    { href: '/archive', label: '目录' },
    { href: '/market-dynamics', label: '市场动态' },
    { href: '/analytics', label: '数据' }
  ],
  // 页脚文字
  footer: `© ${new Date().getFullYear()} inimf`,
}

module.exports = config
