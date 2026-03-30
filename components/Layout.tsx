import Head from 'next/head'
import Link from 'next/link'
import { ReactNode, useState, useEffect } from 'react'
import { formatDistanceToNow, parseISO, format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { NOTES } from '../data/notes'
import { TODO_ITEMS } from '../data/todos'
import { EVENTS } from '../data/events'
import { UPDATES } from '../data/updates'
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

// ===== 日历组件（纯客户端渲染，避免 SSR hydration mismatch）=====
function CalendarWidget() {
  const [now, setNow] = useState<Date | null>(null)
  const [viewYear, setViewYear] = useState<number | null>(null)
  const [viewMonth, setViewMonth] = useState<number | null>(null)

  useEffect(() => {
    const tick = () => setNow(new Date())
    tick()
    const timer = setInterval(tick, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (now && viewYear === null) {
      setViewYear(now.getFullYear())
      setViewMonth(now.getMonth())
    }
  }, [now, viewYear])

  if (!now || viewYear === null || viewMonth === null) {
    return <div className="cal-loading">...</div>
  }

  const today = now
  const todayY = today.getFullYear()
  const todayM = today.getMonth()
  const todayD = today.getDate()

  // 当前视图月份的日历
  const firstDay = new Date(viewYear, viewMonth, 1).getDay() // 0=Sun
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  // 调整为周一起始
  const startOffset = (firstDay + 6) % 7

  const cells: (number | null)[] = Array(startOffset).fill(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  // 补齐到整行
  while (cells.length % 7 !== 0) cells.push(null)

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(viewYear - 1); setViewMonth(11) }
    else setViewMonth(viewMonth - 1)
  }
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(viewYear + 1); setViewMonth(0) }
    else setViewMonth(viewMonth + 1)
  }

  const timeStr = format(now, 'HH:mm:ss')
  const weekStr = format(now, 'EEEE', { locale: zhCN })
  const isCurrentMonth = viewYear === todayY && viewMonth === todayM

  return (
    <div className="cal-widget">
      {/* 实时时钟 */}
      <div className="cal-clock">
        <span className="cal-clock-time">{timeStr}</span>
        <span className="cal-clock-week">{weekStr}</span>
      </div>

      {/* 月历头部 */}
      <div className="cal-header">
        <button className="cal-nav-btn" onClick={prevMonth}>‹</button>
        <span className="cal-month-label">
          {viewYear}年{viewMonth + 1}月
        </span>
        <button className="cal-nav-btn" onClick={nextMonth}>›</button>
      </div>

      {/* 星期行 */}
      <div className="cal-grid">
        {['一','二','三','四','五','六','日'].map(w => (
          <div key={w} className="cal-weekday">{w}</div>
        ))}
        {cells.map((d, i) => {
          const isToday = isCurrentMonth && d === todayD
          const isWeekend = (i % 7) >= 5
          return (
            <div
              key={i}
              className={`cal-day${d === null ? ' cal-day-empty' : ''}${isToday ? ' cal-day-today' : ''}${isWeekend && d !== null ? ' cal-day-weekend' : ''}`}
            >
              {d}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function Layout({ children, title, description, posts = [], hideSidebar }: LayoutProps) {
  const pageTitle = title ? `${title} - ${config.title}` : config.title
  const pageDesc = description || config.description
  const avatarLetter = (config.author || 'I').charAt(0).toUpperCase()

  // 关键事件：按时间线正序（过去→现在→未来）
  const displayEvents = [...EVENTS].sort((a, b) => a.datetime.localeCompare(b.datetime))

  // 右侧最新动态：最新5条
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const displayUpdates = UPDATES.slice(0, 5)

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

            {/* 关键事件（左侧，Bloomberg live blog 风格）*/}
            <div className="sidebar-card" style={{overflow: 'hidden', padding: 0}}>
              <div className="sidebar-card-header" style={{borderBottom: '1px solid var(--color-border-light)'}}>
                <span className="sidebar-card-icon" style={{fontSize: '0.8rem'}}>⚡</span>
                <span className="sidebar-card-title">关键事件</span>
                <span className="rail-count-num" style={{marginLeft: 'auto', fontSize: '0.7rem', color: 'var(--color-text-muted)'}}>{EVENTS.length} 条</span>
                <span className="rail-live-dot" style={{marginLeft: '4px'}} />
              </div>
              <ul className="ev-list" style={{margin: 0}}>
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
                <Link href="/todos" className="mobile-quick-btn">
                  <span>✅</span> 待办
                </Link>
                <Link href="/notes" className="mobile-quick-btn">
                  <span>📌</span> 备注
                </Link>
                <Link href="/analytics" className="mobile-quick-btn">
                  <span>📊</span> 数据
                </Link>
                <Link href="/thoughts" className="mobile-quick-btn">
                  <span>💡</span> 随想
                </Link>
              </div>

            </div>
          )}
        </main>

        {/* ===== 右侧 ===== */}
        {!hideSidebar && (
          <aside className="site-right-rail">

            {/* ① 日历模块 */}
            <div className="rail-card">
              <CalendarWidget />
            </div>

            {/* ② 最新动态 — 紧凑卡片列表，Bloomberg 风格 */}
            <div className="rail-card">
              <div className="rail-card-header">
                <span className="rail-card-icon">📡</span>
                <span className="rail-card-title">最新动态</span>
                <span className="rail-count-num" style={{fontSize:'0.68rem', color:'var(--color-text-muted)', marginLeft:'2px'}}>{UPDATES.length} 条</span>
                <span className="rail-live-dot" style={{marginLeft:'auto'}} />
                <Link href="/updates" style={{marginLeft:'8px', fontSize:'0.68rem', color:'var(--color-text-muted)', textDecoration:'none'}}>更多</Link>
              </div>
              <div className="rail-card-body" style={{padding: '0.4rem 0.9rem 0.65rem'}}>
                <ul className="rail-updates-list">
                  {displayUpdates.map((item, i) => {
                    const relTime = mounted
                      ? formatDistanceToNow(new Date(item.date), { addSuffix: true, locale: zhCN })
                      : ''
                    const snippet = item.text.length > 80 ? item.text.slice(0, 80) + '…' : item.text
                    return (
                      <li key={i} className="rail-update-item">
                        <div className="rail-update-meta">
                          {item.tags && item.tags[0] && (
                            <span className="rail-update-tag">{item.tags[0]}</span>
                          )}
                          <time className="rail-update-time">{relTime}</time>
                        </div>
                        <p className="rail-update-text">{snippet}</p>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>

            {/* ③ 待办事项入口 */}
            <div className="rail-card">
              <Link href="/todos" style={{ textDecoration: 'none', display: 'block' }}>
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
                  <span style={{ fontSize: '14px', lineHeight: 1 }}>✅</span>
                  <span style={{ fontSize: '13px', fontWeight: 600 }}>待办事项</span>
                  <span style={{ fontSize: '11px', color: '#a0aec0', marginLeft: '2px' }}>
                    {TODO_ITEMS.filter(t => !t.done).length} 条
                  </span>
                  <span style={{ marginLeft: 'auto', fontSize: '12px', color: '#a0aec0' }}>→</span>
                </div>
              </Link>
            </div>

            {/* ④ 备注信息入口 */}
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

            {/* ⑤ 数据面板入口 */}
            <div className="rail-card">
              <Link href="/analytics" style={{ textDecoration: 'none', display: 'block' }}>
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
                  <span style={{ fontSize: '14px', lineHeight: 1 }}>📊</span>
                  <span style={{ fontSize: '13px', fontWeight: 600 }}>数据面板</span>
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
