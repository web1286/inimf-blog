import Head from 'next/head'
import Link from 'next/link'
import { ReactNode } from 'react'
import { formatDistanceToNow, parseISO } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { NOTES } from '../data/notes'
import { TODO_ITEMS } from '../data/todos'
import { EVENTS } from '../data/events'
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

  const displayEvents = EVENTS.slice(0, 5)

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

            {/* 数据面板入口 */}
            <div className="sidebar-card">
              <Link href="/analytics" style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '4px 0',
                  color: '#4a5568',
                  transition: 'color 0.15s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#2563eb')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#4a5568')}
                >
                  <span style={{ fontSize: '18px', lineHeight: 1 }}>📊</span>
                  <span style={{ fontSize: '13px', fontWeight: 600 }}>数据面板</span>
                  <span style={{ marginLeft: 'auto', fontSize: '12px', color: '#a0aec0' }}>→</span>
                </div>
              </Link>
            </div>

          </aside>
        )}

        {/* ===== 中间主内容区 ===== */}
        <main className="site-main">
          {children}

          {/* ===== 移动端追加区块（≤860px 显示，PC 隐藏） ===== */}
          {!hideSidebar && (
            <div className="mobile-extra">

              {/* 关键事件紧凑列表 */}
              <div className="mobile-extra-card">
                <div className="mobile-extra-header">
                  <span>⚡</span>
                  <span>关键事件</span>
                  <span className="rail-live-dot" style={{marginLeft: '4px'}} />
                </div>
                <ul className="mobile-ev-list">
                  {EVENTS.slice(0, 4).map((ev, i) => {
                    const relTime = formatDistanceToNow(parseISO(ev.datetime), {
                      addSuffix: true,
                      locale: zhCN,
                    })
                    return (
                      <li key={i} className="mobile-ev-item">
                        <span className="mobile-ev-time">{relTime}</span>
                        <span className="mobile-ev-title">{ev.title}</span>
                      </li>
                    )
                  })}
                </ul>
              </div>

              {/* 快捷入口行 */}
              <div className="mobile-quick-row">
                <Link href="/todos" className="mobile-quick-btn">
                  <span>✅</span> 待办
                </Link>
                <Link href="/notes" className="mobile-quick-btn">
                  <span>📌</span> 备注
                </Link>
                <Link href="/analytics" className="mobile-quick-btn">
                  <span>📊</span> 数据
                </Link>
                <Link href="/archive" className="mobile-quick-btn">
                  <span>📂</span> 目录
                </Link>
              </div>

            </div>
          )}
        </main>

        {/* ===== 右侧 ===== */}
        {!hideSidebar && (
          <aside className="site-right-rail">

            {/* 关键事件（数据来自 data/events.ts）— Bloomberg live blog 风格 */}
            <div className="rail-card">
              <div className="rail-card-header">
                <span className="rail-card-icon">⚡</span>
                <span className="rail-card-title">关键事件</span>
                <span className="rail-count-with-more" style={{marginLeft:'auto'}}>
                  <span className="rail-count-num">{EVENTS.length} 条</span>
                </span>
                <span className="rail-live-dot" />
              </div>
              <div className="rail-card-body" style={{padding: '0'}}>
                <ul className="ev-list">
                  {displayEvents.map((ev, i) => {
                    const relTime = formatDistanceToNow(parseISO(ev.datetime), {
                      addSuffix: true,
                      locale: zhCN,
                    })
                    return (
                      <li key={i} className="ev-item">
                        <div className="ev-time">{relTime}</div>
                        <div className="ev-title">{ev.title}</div>
                        {ev.content && <div className="ev-content">{ev.content}</div>}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>

            {/* 备注信息入口 — 折叠为单行 */}
            <div className="rail-card">
              <Link href="/notes" style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '0.65rem 0.9rem',
                  color: '#4a5568',
                  transition: 'color 0.15s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#2563eb')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#4a5568')}
                >
                  <span style={{ fontSize: '14px', lineHeight: 1 }}>📌</span>
                  <span style={{ fontSize: '13px', fontWeight: 600 }}>备注信息</span>
                  <span style={{ fontSize: '11px', color: '#a0aec0', marginLeft: '2px' }}>
                    {NOTES.length} 条
                  </span>
                  <span style={{ marginLeft: 'auto', fontSize: '12px', color: '#a0aec0' }}>→</span>
                </div>
              </Link>
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
