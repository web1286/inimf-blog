import { GetStaticProps } from 'next'
import Link from 'next/link'
import Layout from '../components/Layout'
import { getSortedPostsData } from '../lib/posts'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { UPDATES } from '../data/updates'
import { TRACKS } from '../data/tracks'
import { NOTES } from '../data/notes'
import { TODO_ITEMS } from '../data/todos'

interface Post {
  slug: string
  title: string
  date: string
  tags?: string[]
}

interface ArchiveProps {
  posts: Post[]
}

export default function Archive({ posts }: ArchiveProps) {
  return (
    <Layout title="总目录" posts={posts}>
      <div className="toc-page">
        <div className="toc-page-header">
          <h1 className="toc-page-title">总目录</h1>
          <p className="toc-page-desc">站点内容索引，共五个模块</p>
        </div>

        {/* ========== 模块一：最新动态 ========== */}
        <div className="toc-module">
          <div className="toc-module-header">
            <span className="toc-module-icon">💬</span>
            <h2 className="toc-module-title">最新动态</h2>
            <span className="toc-module-count">{UPDATES.length} 条</span>
            <Link href="/updates" className="toc-module-more">查看全部</Link>
          </div>
          <ul className="toc-list">
            {UPDATES.map((item, i) => (
              <li key={i} className="toc-item">
                <span className="toc-item-dot" />
                <time className="toc-item-date">
                  {format(new Date(item.date), 'MM/dd HH:mm', { locale: zhCN })}
                </time>
                {item.tags && item.tags[0] && (
                  <span className="toc-item-tag">{item.tags[0]}</span>
                )}
                <span className="toc-item-text">{item.text.slice(0, 40)}{item.text.length > 40 ? '…' : ''}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ========== 模块二：最新文章 ========== */}
        <div className="toc-module">
          <div className="toc-module-header">
            <span className="toc-module-icon">📝</span>
            <h2 className="toc-module-title">最新文章</h2>
            <span className="toc-module-count">{posts.length} 篇</span>
            <Link href="/posts" className="toc-module-more">查看全部</Link>
          </div>
          {posts.length === 0 ? (
            <p className="toc-empty">还没有文章</p>
          ) : (
            <ul className="toc-list">
              {posts.map((post) => (
                <li key={post.slug} className="toc-item">
                  <span className="toc-item-dot" />
                  <time className="toc-item-date">
                    {format(new Date(post.date), 'MM/dd', { locale: zhCN })}
                  </time>
                  {post.tags && post.tags[0] && (
                    <span className="toc-item-tag">{post.tags[0]}</span>
                  )}
                  <Link href={`/posts/${post.slug}`} className="toc-item-link">{post.title}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ========== 模块三：记录轨迹 ========== */}
        <div className="toc-module">
          <div className="toc-module-header">
            <span className="toc-module-icon">🗓</span>
            <h2 className="toc-module-title">记录轨迹</h2>
            <span className="toc-module-count">{TRACKS.length} 条</span>
            <Link href="/tracks" className="toc-module-more">查看全部</Link>
          </div>
          <ul className="toc-list">
            {TRACKS.map((t, i) => (
              <li key={i} className="toc-item">
                <span className="toc-item-dot" />
                <time className="toc-item-date">{t.date.slice(5).replace('-', '/')} {t.time}</time>
                <span className="toc-item-tag">{t.type}</span>
                <span className="toc-item-text">{t.content.slice(0, 40)}{t.content.length > 40 ? '…' : ''}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ========== 模块四：备注信息 ========== */}
        <div className="toc-module">
          <div className="toc-module-header">
            <span className="toc-module-icon">📌</span>
            <h2 className="toc-module-title">备注信息</h2>
            <span className="toc-module-count">{NOTES.length} 条</span>
            <Link href="/notes" className="toc-module-more">查看全部</Link>
          </div>
          <ul className="toc-list">
            {NOTES.map((n, i) => (
              <li key={i} className="toc-item">
                <span className="toc-item-dot toc-item-dot-note" />
                <time className="toc-item-date">{n.date.slice(5).replace('-', '/')} {n.time}</time>
                {n.tags && n.tags[0] && (
                  <span className="toc-item-tag">{n.tags[0]}</span>
                )}
                <Link href={`/posts/${n.slug}`} className="toc-item-link">{n.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ========== 模块五：待办事项 ========== */}
        <div className="toc-module">
          <div className="toc-module-header">
            <span className="toc-module-icon">✅</span>
            <h2 className="toc-module-title">待办事项</h2>
            <span className="toc-module-count">{TODO_ITEMS.length} 项</span>
            <Link href="/todos" className="toc-module-more">查看全部</Link>
          </div>
          <ul className="toc-list">
            {TODO_ITEMS.map((t) => (
              <li key={t.id} className={`toc-item${t.done ? ' toc-item-done' : ''}`}>
                <span className={`toc-item-dot${t.priority === 'high' ? ' toc-item-dot-high' : ''}${t.done ? ' toc-item-dot-done' : ''}`} />
                {t.priority === 'high' && !t.done && (
                  <span className="toc-item-tag toc-tag-high">优先</span>
                )}
                <span className="toc-item-text">{t.text}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getSortedPostsData()
  return { props: { posts } }
}
