import Layout from '../components/Layout'
import { formatDistanceToNow, parseISO, format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { THOUGHTS } from '../data/thoughts'

export default function ThoughtsPage() {
  return (
    <Layout title="随想" hideSidebar>
      <div className="thoughts-page">

        <div className="thoughts-header">
          <div className="thoughts-header-icon">💡</div>
          <h1 className="thoughts-title">随想</h1>
          <p className="thoughts-subtitle">碎片灵感 · 思维片段 · 随手留痕</p>
        </div>

        <div className="thoughts-timeline">
          {THOUGHTS.map((item) => {
            const relTime = formatDistanceToNow(parseISO(item.datetime), {
              addSuffix: true,
              locale: zhCN,
            })
            const absTime = format(parseISO(item.datetime), 'MM月dd日 HH:mm', { locale: zhCN })
            return (
              <div key={item.id} className="thought-card">
                <div className="thought-card-meta">
                  {item.mood && (
                    <span className="thought-mood">{item.mood}</span>
                  )}
                  <time className="thought-time" title={absTime}>{relTime}</time>
                  <span className="thought-abs-time">{absTime}</span>
                </div>
                <p className="thought-text">{item.text}</p>
              </div>
            )
          })}
        </div>

        {THOUGHTS.length === 0 && (
          <div className="thoughts-empty">
            <span>🌱</span>
            <p>还没有随想，随时记录灵感吧</p>
          </div>
        )}

      </div>
    </Layout>
  )
}
