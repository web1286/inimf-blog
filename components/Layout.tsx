import Head from 'next/head'
import Link from 'next/link'
import { ReactNode, useState, useEffect } from 'react'
import { formatDistanceToNow, parseISO } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { EVENTS } from '../data/events'
import { getAllMastersSorted } from '../data/masters'
import MarketTicker from './MarketTicker'
import SidebarNav from './SidebarNav'
import SearchBox from './SearchBox'
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

  // 高手身影：最新 6 条（全局倒序）
  const latestMasters = getAllMastersSorted().slice(0, 6)

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
            {/* 科技感 Logo - CSS 绘制 */}
            <span className="site-logo">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <defs>
                  <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1890ff"/>
                    <stop offset="100%" stopColor="#096dd9"/>
                  </linearGradient>
                </defs>
                <rect x="4" y="4" width="24" height="24" rx="4" fill="url(#logo-gradient)"/>
                <path d="M8 16 L14 10 L18 14 L24 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="24" cy="24" r="3" fill="white" fillOpacity="0.9"/>
              </svg>
            </span>
            {config.title}
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
            {/* 左侧导航 */}
            <SidebarNav />

            {/* 搜索框 - 移到底部 */}
            <SearchBox />
          </aside>
        )}

        {/* ===== 中间主内容区 ===== */}
        <main className="site-main">
          {/* 市场数据 ticker - 放到中间 */}
          <MarketTicker />
          {children}
        </main>

        {/* ===== 右侧（关键事件 + 高手身影）===== */}
        {!hideSidebar && (
          <aside className="site-right-rail">

            {/* 关键事件（不限制条数） */}
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

            {/* 高手身影（限制5条） */}
            <div className="sidebar-card">
              <div className="sidebar-card-header">
                <span className="sidebar-card-icon" style={{ fontSize: '0.8rem' }}>✦</span>
                <span className="sidebar-card-title">高手身影</span>
                <span className="rail-count-num" style={{ marginLeft: 'auto', fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
                  {latestMasters.length} 条
                </span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {latestMasters.slice(0, 5).map((item, i) => (
                  <li key={i} className="masters-item">
                    <div className="masters-item-row">
                      <span className="masters-author-tag">{item.author}</span>
                    </div>
                    {item.url ? (
                      <Link
                        href={item.url}
                        className="masters-item-title"
                      >
                        {item.title}
                      </Link>
                    ) : (
                      <span className="masters-item-title">{item.title}</span>
                    )}
                  </li>
                ))}
              </ul>
              <Link href="/masters" className="masters-more-link">查看全部 →</Link>
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
