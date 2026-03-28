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

// 待办事项（可手动维护）
const TODO_ITEMS = [
  { id: 1, text: '完成每周商业分析复盘', done: false, priority: 'high' },
  { id: 2, text: '整理 AI 趋势观测笔记', done: false, priority: 'high' },
  { id: 3, text: '更新博客关于页内容', done: false, priority: 'normal' },
  { id: 4, text: '阅读《置身事内》第三章', done: true, priority: 'normal' },
  { id: 5, text: '写一篇具身智能观察文章', done: false, priority: 'normal' },
]

// 记录轨迹（今日看了什么，可手动维护）— 最多显示前5条
const TRACKS = [
  { date: '2026-03-28', time: '21:30', type: '文章', content: '《中国 AI 产业地图 2025》— 36氪研究院，系统梳理了当前国内大模型、AI应用、AI基础设施三层架构格局。' },
  { date: '2026-03-27', time: '19:12', type: '视频', content: '李永乐讲 DeepSeek 背后的 MoE 架构原理，用类比方式把混合专家模型讲得相当清楚。' },
  { date: '2026-03-26', time: '22:05', type: '播客', content: '硅谷 101 × 张俊林：大模型的下一个突破口在哪里？重点讨论了推理能力与世界模型。' },
  { date: '2026-03-25', time: '20:44', type: '书', content: '《置身事内》第二章：地方政府的融资逻辑，土地财政与城投债的关系梳理得很通透。' },
  { date: '2026-03-24', time: '15:20', type: '文章', content: '黄仁勋 GTC 2025 演讲全文，重点在 Blackwell 架构与 Physical AI 的战略布局。' },
]

// 备注信息（静态文章存档，放两篇博客自带文章）
const NOTES = [
  {
    date: '2026-03-27',
    time: '10:00',
    slug: 'how-to-write',
    title: '如何写一篇新文章',
    summary: '关于如何在这个博客添加新文章的操作说明：用 Markdown 格式，在 posts/ 目录新建 .md 文件，frontmatter 填写 title/date/summary/tags 即可自动发布。',
    tags: ['指南'],
  },
  {
    date: '2026-03-27',
    time: '09:00',
    slug: 'hello-world',
    title: '你好，世界',
    summary: '这是我博客的第一篇文章。博客这件事，最重要的不是第一篇写什么，而是后来有没有继续写下去。',
    tags: ['随笔'],
  },
]

export default function Layout({ children, title, description, posts = [], hideSidebar }: LayoutProps) {
  const pageTitle = title ? `${title} - ${config.title}` : config.title
  const pageDesc = description || config.description
  const avatarLetter = (config.author || 'I').charAt(0).toUpperCase()
  const pendingTodos = TODO_ITEMS.filter(t => !t.done)
  const doneTodos = TODO_ITEMS.filter(t => t.done)

  // 收集所有标签（去重）
  const allTags = Array.from(
    new Set(posts.flatMap(p => p.tags || []))
  )

  const displayTracks = TRACKS.slice(0, 5)

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

            {/* 标签云 */}
            {allTags.length > 0 && (
              <div className="sidebar-card">
                <div className="sidebar-card-header">
                  <span className="sidebar-card-title">标签</span>
                </div>
                <div className="sidebar-card-body">
                  <div className="tag-cloud">
                    {allTags.map(tag => (
                      <span key={tag} className="tag-cloud-item">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}

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

        {/* ===== 右侧 ===== */}
        {!hideSidebar && (
          <aside className="site-right-rail">

            {/* 记录轨迹 — 微博/X 时间线风格 */}
            <div className="rail-card">
              <div className="rail-card-header">
                <span className="rail-card-icon">🗓</span>
                <span className="rail-card-title">记录轨迹</span>
                <span className="rail-live-dot" />
              </div>
              <div className="rail-card-body rail-timeline-body">
                <ul className="tl-list">
                  {displayTracks.map((t, i) => (
                    <li key={i} className={`tl-item${i === displayTracks.length - 1 ? ' tl-last' : ''}`}>
                      <div className="tl-dot-wrap">
                        <span className="tl-dot" />
                        {i < displayTracks.length - 1 && <span className="tl-line" />}
                      </div>
                      <div className="tl-body">
                        <div className="tl-meta">
                          <span className="tl-type-badge">{t.type}</span>
                          <span className="tl-time">{t.date.slice(5).replace('-', '/')} {t.time}</span>
                        </div>
                        <p className="tl-content">{t.content}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                {TRACKS.length > 5 && (
                  <div className="rail-more">
                    <Link href="/archive" className="rail-more-link">查看更多 →</Link>
                  </div>
                )}
              </div>
            </div>

            {/* 备注信息 — 时间线风格 */}
            <div className="rail-card">
              <div className="rail-card-header">
                <span className="rail-card-icon">📌</span>
                <span className="rail-card-title">备注信息</span>
              </div>
              <div className="rail-card-body rail-timeline-body">
                <ul className="tl-list">
                  {NOTES.map((n, i) => (
                    <li key={i} className={`tl-item${i === NOTES.length - 1 ? ' tl-last' : ''}`}>
                      <div className="tl-dot-wrap">
                        <span className="tl-dot tl-dot-note" />
                        {i < NOTES.length - 1 && <span className="tl-line" />}
                      </div>
                      <div className="tl-body">
                        <div className="tl-meta">
                          {n.tags && n.tags[0] && (
                            <span className="tl-type-badge tl-badge-note">{n.tags[0]}</span>
                          )}
                          <span className="tl-time">{n.date.slice(5).replace('-', '/')} {n.time}</span>
                        </div>
                        <Link href={`/posts/${n.slug}`} className="tl-title-link">{n.title}</Link>
                        <p className="tl-content">{n.summary}</p>
                      </div>
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
