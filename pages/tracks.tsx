import Layout from '../components/Layout'
import { TRACKS } from '../data/tracks'

export default function TracksPage() {
  // 按日期降序排列（已是最新在前，直接用）
  const grouped = TRACKS.reduce<Record<string, typeof TRACKS>>((acc, item) => {
    if (!acc[item.date]) acc[item.date] = []
    acc[item.date].push(item)
    return acc
  }, {})

  const sortedDates = Object.keys(grouped).sort((a, b) => b.localeCompare(a))

  return (
    <Layout title="记录轨迹" hideSidebar>
      <div className="archive-page">
        <div className="archive-header">
          <h1 className="archive-title">记录轨迹</h1>
          <p className="archive-desc">阅读、收听、观看……每一条足迹都有意义。共 {TRACKS.length} 条记录</p>
        </div>

        <div className="tracks-timeline">
          {sortedDates.map(date => (
            <div key={date} className="tracks-date-group">
              <div className="tracks-date-label">{date.replace(/-/g, ' / ')}</div>
              <div className="tracks-items">
                {grouped[date].map((t, i) => (
                  <div key={i} className="tracks-item">
                    <span className={`tracks-type-badge tracks-type-${t.type}`}>{t.type}</span>
                    <div className="tracks-item-body">
                      <p className="tracks-item-content">{t.content}</p>
                      <span className="tracks-item-time">{t.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
