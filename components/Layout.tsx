import Head from 'next/head'
import Link from 'next/link'
import { ReactNode, useState, useEffect } from 'react'
import { formatDistanceToNow, parseISO } from 'date-fns'
import { zhCN } from 'date-fns/locale'
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

  // 关键事件：按时间线正序（过去→现在→未来）
  const displayEvents = [...EVENTS].sort((a, b) => a.datetime.localeCompare(b.datetime))

  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

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

            {/* 关键事件（左侧，Bloomberg live blog 风格）*/}
            <div className="sidebar-card">
              <div className="sidebar-card-header">
                <span className="sidebar-card-icon" style={{fontSize: '0.8rem'}}>⚡</span>
                <span className="sidebar-card-title">关键事件</span>
                <span className="rail-count-num" style={{marginLeft: 'auto', fontSize: '0.7rem', color: 'var(--color-text-muted)'}}>{EVENTS.length} 条</span>
                <span className="rail-live-dot" style={{marginLeft: '4px'}} />
              </div>
              <ul className="ev-list">
                {displayEvents.map((ev, i) => {
                  const relTime = mounted
                    ? formatDistanceToNow(parseISO(ev.datetime), { addSuffix: true, locale: zhCN })
                    : ''
                  return (
                    <li key={i} className="ev-item">
                      <div className="ev-time">{relTime}</div>
                      <div style={{display:'flex',alignItems:'flex-start',gap:'6px',flexWrap:'wrap'}}>
                        {ev.status && (
                          <span className={`ev-status-tag ev-status-${ev.status === '突发重大' ? 'alert' : ev.status === '持续发酵' ? 'ongoing' : 'pending'}`}>
                            {ev.status}
                          </span>
                        )}
                        <div className="ev-title" style={{flex:1,minWidth:0}}>{ev.title}</div>
                      </div>
                      {ev.content && <div className="ev-content">{ev.content}</div>}
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* 数据面板入口（关键事件下方）*/}
            <div className="sidebar-card">
              <Link href="/analytics" style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '0.5rem 0',
                  color: '#4a5568',
                  transition: 'color 0.15s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#2563eb')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#4a5568')}
                >
                  <span style={{ fontSize: '14px', lineHeight: 1 }}>📊</span>
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

              {/* 关键事件 — feed-section 风格 */}
              <div className="feed-section">
                <div className="feed-header">
                  <span className="feed-title">⚡ 关键事件</span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {displayEvents.map((ev, i) => (
                    <li key={i} className="mobile-ev-feed-item">
                      {ev.status && (
                        <span className={`ev-status-tag ev-status-${ev.status === '突发重大' ? 'alert' : ev.status === '持续发酵' ? 'ongoing' : 'pending'}`}>
                          {ev.status}
                        </span>
                      )}
                      <span className="mobile-ev-feed-title">{ev.title}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 快捷入口行 */}
              <div className="mobile-quick-row">
                <Link href="/analytics" className="mobile-quick-btn">
                  <span>📊</span> 数据
                </Link>
              </div>

            </div>
          )}
        </main>

        {/* ===== 右侧（保留容器，内容清空，预留将来用）===== */}
        {!hideSidebar && (
          <aside className="site-right-rail">
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
