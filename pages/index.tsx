import { GetStaticProps } from 'next'
import Link from 'next/link'
import Layout from '../components/Layout'
import { getSortedPostsData } from '../lib/posts'
import { format, formatDistanceToNow } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { UPDATES } from '../data/updates'
const config = require('../blog.config')

interface Post {
  slug: string
  title: string
  date: string
  summary?: string
  tags?: string[]
  cover?: string
  externalUrl?: string
}

interface HomeProps {
  posts: Post[]
}

export default function Home({ posts }: HomeProps) {
  const displayUpdates = UPDATES.slice(0, 3)
  const displayPosts = posts.slice(0, 3)

  return (
    <Layout posts={posts}>

      {/* ========== 板块一：最新动态（微博/X 时间线风格）========== */}
      <div className="feed-section">
        <div className="feed-header">
          <span className="feed-title">最新动态</span>
          <span className="feed-count-with-more">
            <span className="feed-count-num">{UPDATES.length} 条</span>
            {UPDATES.length > 3 && (
              <Link href="/updates" className="feed-inline-more">更多</Link>
            )}
          </span>
        </div>

        {/* 微博/X 时间线 */}
        <div className="timeline-feed">
          {displayUpdates.map((item, i) => {
            const d = new Date(item.date)
            const relativeTime = formatDistanceToNow(d, { locale: zhCN, addSuffix: true })
            const exactDate = format(d, 'yyyy年M月d日 HH:mm', { locale: zhCN })
            return (
              <div key={i} className={`tl-feed-item${i === displayUpdates.length - 1 ? ' tl-feed-last' : ''}`}>
                {/* 左侧：头像 + 竖线 */}
                <div className="tl-feed-left">
                  <div className="tl-feed-avatar">{(config.author || 'I').charAt(0).toUpperCase()}</div>
                  {i < displayUpdates.length - 1 && <div className="tl-feed-line" />}
                </div>
                {/* 右侧：内容 */}
                <div className="tl-feed-right">
                  <div className="tl-feed-header">
                    <span className="tl-feed-author">{config.author}</span>
                    {item.tags && item.tags[0] && (
                      <span className="tl-feed-tag">{item.tags[0]}</span>
                    )}
                    <time className="tl-feed-time" title={exactDate}>{relativeTime}</time>
                  </div>
                  <p className="tl-feed-text">{item.text}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ========== 分隔线 ========== */}
      <div className="feed-divider" />

      {/* ========== 板块二：最新文章（主线）========== */}
      <div className="feed-section">
        <div className="feed-header">
          <span className="feed-title">最新文章</span>
          <span className="feed-count-with-more">
            <span className="feed-count-num">{posts.length} 篇</span>
            {posts.length > 3 && (
              <Link href="/posts" className="feed-inline-more">更多</Link>
            )}
          </span>
        </div>

        {posts.length === 0 ? (
          <div className="empty-state">
            <p>还没有文章，快去写第一篇吧 ✍️</p>
          </div>
        ) : (
          <div className="post-feed">
            {displayPosts.map((post) => (
              <article key={post.slug} className="post-card">
                <div className="post-card-inner">
                  <div className="post-card-content">
                    <div className="post-card-meta">
                      {post.tags && post.tags.length > 0 && (
                        <>
                          <span className="post-category-badge">{post.tags[0]}</span>
                          <span className="post-meta-sep">·</span>
                        </>
                      )}
                      <time className="post-date" dateTime={post.date}>
                        {format(new Date(post.date), 'yyyy年M月d日', { locale: zhCN })}
                      </time>
                    </div>

                    <h2 className="post-card-title">
                      {post.externalUrl ? (
                        <a
                          href={post.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => window.umami?.track('external-link-click', { title: post.title, url: post.externalUrl })}
                        >
                          {post.title}
                        </a>
                      ) : (
                        <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                      )}
                    </h2>

                    {post.summary && (
                      <p className="post-card-summary">{post.summary}</p>
                    )}

                    {post.tags && post.tags.length > 1 && (
                      <div className="post-card-footer">
                        {post.tags.slice(1).map((tag) => (
                          <span key={tag} className="post-tag">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>

                  {post.cover && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.cover}
                      alt={post.title}
                      className="post-card-cover"
                    />
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getSortedPostsData()
  return {
    props: { posts },
  }
}
