import Layout from '../components/Layout'
import { formatDistanceToNow, parseISO, format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { THOUGHTS } from '../data/thoughts'
import { UPDATES } from '../data/updates'

// 合流类型
interface StreamItem {
  id: string
  datetime: string
  text: string
  mood?: string
  tags?: string[]
  type: 'thought' | 'update'
}

// 将动态转换为合流格式
const updateItems: StreamItem[] = UPDATES.map((u, i) => ({
  id: `update-${i}`,
  datetime: u.date,
  text: u.text,
  tags: u.tags,
  type: 'update' as const,
}))

// 将随想转换为合流格式
const thoughtItems: StreamItem[] = THOUGHTS.map(t => ({
  id: t.id,
  datetime: t.datetime,
  text: t.text,
  mood: t.mood,
  type: 'thought' as const,
}))

// 合并后按时间倒序（最新的在最上）
const STREAM: StreamItem[] = [...thoughtItems, ...updateItems].sort(
  (a, b) => b.datetime.localeCompare(a.datetime)
)

export default function ThoughtsPage() {
  return (
    <Layout title="随想" hideSidebar>
      <div className="thoughts-page">

        <div className="thoughts-header">
          <div className="thoughts-header-icon">💡</div>
          <h1 className="thoughts-title">随想 · 动态</h1>
          <p className="thoughts-subtitle">碎片灵感 · 观察记录 · 随手留痕</p>
        </div>

        <div className="thoughts-timeline">
          {STREAM.map((item) => {
            const relTime = formatDistanceToNow(parseISO(item.datetime), {
              addSuffix: true,
              locale: zhCN,
            })
            const absTime = format(parseISO(item.datetime), 'MM月dd日 HH:mm', { locale: zhCN })
            return (
              <div key={item.id} className="thought-card">
                <div className="thought-card-meta">
                  {/* 随想显示 mood emoji，动态显示话题标签 */}
                  {item.type === 'thought' && item.mood && (
                    <span className="thought-mood">{item.mood}</span>
                  )}
                  {item.type === 'update' && item.tags && item.tags[0] && (
                    <span className="thought-tag-badge">{item.tags[0]}</span>
                  )}
                  <time className="thought-time" title={absTime}>{relTime}</time>
                  <span className="thought-abs-time">{absTime}</span>
                </div>
                <p className="thought-text">{item.text}</p>
              </div>
            )
          })}
        </div>

        {STREAM.length === 0 && (
          <div className="thoughts-empty">
            <span>🌱</span>
            <p>还没有内容，随时记录灵感吧</p>
          </div>
        )}

      </div>
    </Layout>
  )
}
