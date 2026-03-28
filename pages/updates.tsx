import Layout from '../components/Layout'
import { UPDATES } from '../data/updates'
import { format, formatDistanceToNow } from 'date-fns'
import { zhCN } from 'date-fns/locale'
const config = require('../blog.config')

export default function UpdatesPage() {
  const sorted = [...UPDATES].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  // 按月份分组
  const grouped = sorted.reduce<Record<string, typeof UPDATES>>((acc, item) => {
    const monthKey = format(new Date(item.date), 'yyyy年M月', { locale: zhCN })
    if (!acc[monthKey]) acc[monthKey] = []
    acc[monthKey].push(item)
    return acc
  }, {})

  const months = Object.keys(grouped)

  return (
    <Layout title="全部动态" hideSidebar>
      <div className="archive-page">
        <div className="archive-header">
          <h1 className="archive-title">全部动态</h1>
          <p className="archive-desc">想法、观察、随手记……共 {UPDATES.length} 条</p>
        </div>

        <div className="updates-timeline">
          {months.map(month => (
            <div key={month} className="updates-month-group">
              <div className="updates-month-label">{month}</div>
              <div className="updates-items">
                {grouped[month].map((item, i) => {
                  const d = new Date(item.date)
                  const relativeTime = formatDistanceToNow(d, { locale: zhCN, addSuffix: true })
                  const exactDate = format(d, 'M月d日 HH:mm', { locale: zhCN })
                  return (
                    <div key={i} className="updates-item">
                      <div className="updates-item-left">
                        <div className="updates-avatar-sm">{(config.author || 'I').charAt(0).toUpperCase()}</div>
                        {i < grouped[month].length - 1 && <div className="updates-vline" />}
                      </div>
                      <div className="updates-item-right">
                        <div className="updates-item-meta">
                          {item.tags && item.tags[0] && (
                            <span className="updates-tag">{item.tags[0]}</span>
                          )}
                          <time className="updates-time" title={exactDate}>{relativeTime}</time>
                        </div>
                        <p className="updates-text">{item.text}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
