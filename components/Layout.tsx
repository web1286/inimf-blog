import Head from 'next/head'
import Link from 'next/link'
import { ReactNode } from 'react'
import { getSortedPostsData } from '../lib/posts'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
const config = require('../blog.config')

interface Post {
  slug: string
  title: string
  date: string
  tags?: string[]
}

interface LayoutProps {
  children: ReactNode
  title?: string
  description?: string
  posts?: Post[]          // 传给 sidebar 的最新文章
  hideSidebar?: boolean   // 文章页可以把侧边栏换成 TOC
}

// 提取所有标签（去重）
function getAllTags(posts: Post[]): string[] {
  const tagSet = new Set<string>()
  posts.forEach(p => (p.tags || []).forEach(t => tagSet.add(t)))
  return Array.from(tagSet).slice(0, 12) // 最多显示 12 个
}

export default function Layout({ children, title, description, posts = [], hideSidebar }: LayoutProps) {
  const pageTitle = title ? `${title} - ${config.title}` : config.title
  const pageDesc = description || config.description
  const tags = getAllTags(posts)
  const recentPosts = posts.slice(0, 6) // 侧边栏最新 6 篇

  // 作者名首字母，用于头像
  const avatarLetter = (config.author || 'I').charAt(0).toUpperCase()

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:site_name" content={config.title} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* 顶部导航：深灰 xiaohu.ai 风格 */}
      <header className="site-header">
        <div className="header-inner">
          <Link href="/" className="site-title">
            {config.title}
            <span className="site-title-dot" />
          </Link>
          <nav className="site-nav">
            {config.nav.map((item: { label: string; href: string }) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* 双栏布局 */}
      <div className={`site-body${hideSidebar ? ' no-sidebar' : ''}`}>
        {/* 左侧边栏 */}
        {!hideSidebar && (
          <aside className="site-sidebar">
            {/* 作者卡片 */}
            <div className="sidebar-card">
              <div className="author-card">
                <div className="author-avatar">{avatarLetter}</div>
                <div className="author-name">{config.author}</div>
                <div className="author-bio">{config.description}</div>
              </div>
            </div>

            {/* 标签云 */}
            {tags.length > 0 && (
              <div className="sidebar-card">
                <div className="sidebar-card-header">
                  <span className="sidebar-card-title">标签</span>
                </div>
                <div className="sidebar-card-body">
                  <div className="tag-cloud">
                    {tags.map(tag => (
                      <span key={tag} className="tag-cloud-item">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 最新文章 */}
            {recentPosts.length > 0 && (
              <div className="sidebar-card">
                <div className="sidebar-card-header">
                  <span className="sidebar-card-title">最新文章</span>
                </div>
                <div className="sidebar-card-body">
                  <ul className="sidebar-post-list">
                    {recentPosts.map(post => (
                      <li key={post.slug} className="sidebar-post-item">
                        <Link href={`/posts/${post.slug}`} className="sidebar-post-link">
                          {post.title}
                        </Link>
                        <span className="sidebar-post-date">
                          {format(new Date(post.date), 'M月d日', { locale: zhCN })}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </aside>
        )}

        {/* 右侧主内容区 */}
        <main className="site-main">
          {children}
        </main>
      </div>

      {/* 页脚 */}
      <footer className="site-footer">
        <p>{config.footer}</p>
      </footer>
    </>
  )
}
