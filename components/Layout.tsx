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
  posts?: Post[]
  hideSidebar?: boolean
}

// 待办事项数据（可手动维护，以后可以接 API）
const TODO_ITEMS = [
  { id: 1, text: '完成每周商业分析复盘', done: false, priority: 'high' },
  { id: 2, text: '整理 AI 趋势观测笔记', done: false, priority: 'high' },
  { id: 3, text: '更新博客关于页内容', done: false, priority: 'normal' },
  { id: 4, text: '阅读《置身事内》第三章', done: true, priority: 'normal' },
  { id: 5, text: '写一篇具身智能观察文章', done: false, priority: 'normal' },
]

// 最新动态（简讯，短思考，可手动维护）
const UPDATES = [
  { date: '03-28', text: '关注到 Manus 在 Agent 工作流编排上的新进展，值得深入研究。' },
  { date: '03-27', text: '字节旗下豆包大模型视觉理解能力提升明显，尤其是复杂图表解析。' },
  { date: '03-26', text: 'OpenAI o3 正式发布，推理能力有实质性跃升，成本仍是门槛。' },
]

// 记录轨迹（今日看了什么，可手动维护）
const TRACKS = [
  { date: '03-28', type: '文章', content: '《中国 AI 产业地图 2025》— 36氪研究院' },
  { date: '03-27', type: '视频', content: '李永乐讲 DeepSeek 背后的 MoE 架构原理' },
  { date: '03-26', type: '播客', content: '硅谷 101 × 张俊林：大模型的下一个突破口' },
  { date: '03-25', type: '书', content: '《置身事内》第二章：地方政府的融资逻辑' },
]

export default function Layout({ children, title, description, posts = [], hideSidebar }: LayoutProps) {
  const pageTitle = title ? `${title} - ${config.title}` : config.title
  const pageDesc = description || config.description
  const recentPosts = posts.slice(0, 5)
  const avatarLetter = (config.author || 'I').charAt(0).toUpperCase()
  const pendingTodos = TODO_ITEMS.filter(t => !t.done)
  const doneTodos = TODO_ITEMS.filter(t => t.done)

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

      {/* 顶部导航 */}
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

      {/* 三栏布局 */}
      <div className={`site-body${hideSidebar ? ' no-sidebar' : ''}`}>

        {/* ===== 左侧边栏 ===== */}
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

            {/* 待办事项 */}
            <div className="sidebar-card">
              <div className="sidebar-card-header">
                <span className="sidebar-card-title">待办事项</span>
                <span className="sidebar-badge">{pendingTodos.length} 项</span>
              </div>
              <div className="sidebar-card-body todo-body">
                <ul className="todo-list">
                  {pendingTodos.map(item => (
                    <li key={item.id} className={`todo-item${item.priority === 'high' ? ' todo-high' : ''}`}>
                      <span className="todo-dot" />
                      <span className="todo-text">{item.text}</span>
                    </li>
                  ))}
                  {doneTodos.map(item => (
                    <li key={item.id} className="todo-item todo-done">
                      <span className="todo-dot todo-dot-done" />
                      <span className="todo-text">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        )}

        {/* ===== 中间主内容区 ===== */}
        <main className="site-main">
          {children}
        </main>

        {/* ===== 右侧三个独立模块 ===== */}
        {!hideSidebar && (
          <aside className="site-right-rail">

            {/* 模块一：最新动态 */}
            <div className="rail-card">
              <div className="rail-card-header">
                <span className="rail-card-icon">⚡</span>
                <span className="rail-card-title">最新动态</span>
                <span className="rail-live-dot" />
              </div>
              <div className="rail-card-body">
                <ul className="updates-list">
                  {UPDATES.map((u, i) => (
                    <li key={i} className="update-item">
                      <span className="update-date">{u.date}</span>
                      <span className="update-text">{u.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 模块二：最新文章（公众号主线） */}
            <div className="rail-card">
              <div className="rail-card-header">
                <span className="rail-card-icon">📝</span>
                <span className="rail-card-title">最新文章</span>
              </div>
              <div className="rail-card-body">
                {recentPosts.length > 0 ? (
                  <ul className="rail-post-list">
                    {recentPosts.map(post => (
                      <li key={post.slug} className="rail-post-item">
                        <Link href={`/posts/${post.slug}`} className="rail-post-link">
                          {post.title}
                        </Link>
                        <span className="rail-post-date">
                          {format(new Date(post.date), 'M月d日', { locale: zhCN })}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="rail-empty">暂无文章</p>
                )}
              </div>
            </div>

            {/* 模块三：记录轨迹 */}
            <div className="rail-card">
              <div className="rail-card-header">
                <span className="rail-card-icon">🗓</span>
                <span className="rail-card-title">记录轨迹</span>
              </div>
              <div className="rail-card-body">
                <ul className="track-list">
                  {TRACKS.map((t, i) => (
                    <li key={i} className="track-item">
                      <div className="track-top">
                        <span className="track-type">{t.type}</span>
                        <span className="track-date">{t.date}</span>
                      </div>
                      <span className="track-content">{t.content}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </aside>
        )}
      </div>

      {/* 页脚 */}
      <footer className="site-footer">
        <p>{config.footer}</p>
      </footer>
    </>
  )
}
