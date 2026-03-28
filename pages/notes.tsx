import Layout from '../components/Layout'
import Link from 'next/link'
import { NOTES } from '../data/notes'

export default function NotesPage() {
  const sorted = [...NOTES].sort((a, b) =>
    `${b.date} ${b.time}`.localeCompare(`${a.date} ${a.time}`)
  )

  return (
    <Layout title="备注信息" hideSidebar>
      <div className="archive-page">
        <div className="archive-header">
          <h1 className="archive-title">备注信息</h1>
          <p className="archive-desc">研究报告、读书笔记、分析备忘……共 {NOTES.length} 条</p>
        </div>

        <div className="notes-list">
          {sorted.map((n, i) => (
            <div key={i} className="notes-item">
              <div className="notes-item-meta">
                {n.tags && n.tags[0] && (
                  <span className="notes-tag-badge">{n.tags[0]}</span>
                )}
                <span className="notes-date">{n.date} {n.time}</span>
              </div>
              <Link href={`/posts/${n.slug}`} className="notes-item-title">{n.title}</Link>
              <p className="notes-item-summary">{n.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
