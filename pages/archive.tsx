import { GetStaticProps } from 'next'
import Link from 'next/link'
import Layout from '../components/Layout'
import { getSortedPostsData } from '../lib/posts'
import { format, formatDistanceToNow, parseISO } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { EVENTS } from '../data/events'

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
          <p className="toc-page-desc">站点内容索引</p>
        </div>

        {/* ========== 模块一：最新文章 ========== */}
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

        {/* ========== 模块二：关键事件 ========== */}
        <div className="toc-module">
          <div className="toc-module-header">
            <span className="toc-module-icon">⚡</span>
            <h2 className="toc-module-title">关键事件</h2>
            <span className="toc-module-count">{EVENTS.length} 条</span>
          </div>
          <ul className="toc-list">
            {[...EVENTS].sort((a, b) => a.datetime.localeCompare(b.datetime)).map((ev, i) => {
              const relTime = formatDistanceToNow(parseISO(ev.datetime), { addSuffix: true, locale: zhCN })
              return (
                <li key={i} className="toc-item">
                  <span className="toc-item-dot toc-item-dot-event" />
                  {ev.status && (
                    <span className={`ev-status-tag ev-status-${ev.status === '突发重大' ? 'alert' : ev.status === '持续发酵' ? 'ongoing' : 'pending'}`} style={{flexShrink:0}}>
                      {ev.status}
                    </span>
                  )}
                  <time className="toc-item-date">{relTime}</time>
                  <span className="toc-item-text">{ev.title}</span>
                </li>
              )
            })}
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
