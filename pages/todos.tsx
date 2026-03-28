import Layout from '../components/Layout'
import { TODO_ITEMS } from '../data/todos'

export default function TodosPage() {
  const pending = TODO_ITEMS.filter(t => !t.done)
  const done = TODO_ITEMS.filter(t => t.done)

  return (
    <Layout title="待办事项" hideSidebar>
      <div className="archive-page">
        <div className="archive-header">
          <h1 className="archive-title">待办事项</h1>
          <p className="archive-desc">进行中 {pending.length} 项 · 已完成 {done.length} 项</p>
        </div>

        {pending.length > 0 && (
          <div className="todos-section">
            <h2 className="todos-section-title">进行中</h2>
            <ul className="todos-full-list">
              {pending.map(item => (
                <li key={item.id} className={`todos-full-item${item.priority === 'high' ? ' todos-high' : ''}`}>
                  <span className="todos-full-dot" />
                  <span className="todos-full-text">{item.text}</span>
                  {item.priority === 'high' && <span className="todos-priority-badge">重要</span>}
                </li>
              ))}
            </ul>
          </div>
        )}

        {done.length > 0 && (
          <div className="todos-section">
            <h2 className="todos-section-title">已完成</h2>
            <ul className="todos-full-list">
              {done.map(item => (
                <li key={item.id} className="todos-full-item todos-full-done">
                  <span className="todos-full-dot todos-dot-done" />
                  <span className="todos-full-text">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Layout>
  )
}
