import Head from 'next/head'
import Link from 'next/link'
import { ReactNode } from 'react'
import { getSortedPostsData } from '../lib/posts'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { TRACKS } from '../data/tracks'
import { NOTES } from '../data/notes'
import { TODO_ITEMS } from '../data/todos'
const config = require('../blog.config')

// 消除 getSortedPostsData 的 unused import 警告（留着备用）
void getSortedPostsData

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

  const displayTracks = TRACKS.slice(0, 3)

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

            {/* 标签云（来自最新文章 tags，自动聚合）*/}
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

            {/* 待办事项（数据来自 data/todos.ts）*/}
            <div className="sidebar-card">
              <div className="sidebar-card-header">
                <span className="sidebar-card-title">待办事项</span>
                <Link href="/todos" className="sidebar-more-link">更多</Link>
              </div>
              <div className="sidebar-card-body todo-body">
                <ul className="todo-list">
                  {pendingTodos.slice(0, 4).map(item => (
                    <li key={item.id} className={`todo-item${item.priority === 'high' ? ' todo-high' : ''}`}>
                      <span className="todo-dot" />
                      <span className="todo-text">{item.text}</span>
                    </li>
                  ))}
                  {doneTodos.slice(0, 2).map(item => (
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

            {/* 记录轨迹（数据来自 data/tracks.ts）— 微博/X 时间线风格 */}
            <div className="rail-card">
              <div className="rail-card-header">
                <span className="rail-card-icon">🗓</span>
                <span className="rail-card-title">记录轨迹</span>
                <span className="rail-count-with-more" style={{marginLeft:'auto'}}>
                  <span className="rail-count-num">{TRACKS.length} 条</span>
                  {TRACKS.length > 3 && (
                    <Link href="/tracks" className="rail-inline-more">更多</Link>
                  )}
                </span>
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
              </div>
            </div>

            {/* 备注信息（数据来自 data/notes.ts）— 时间线风格 */}
            <div className="rail-card">
              <div className="rail-card-header">
                <span className="rail-card-icon">📌</span>
                <span className="rail-card-title">备注信息</span>
                <span className="rail-count-with-more" style={{marginLeft:'auto'}}>
                  <span className="rail-count-num">{NOTES.length} 条</span>
                  {NOTES.length > 3 && (
                    <Link href="/notes" className="rail-inline-more">更多</Link>
                  )}
                </span>
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
