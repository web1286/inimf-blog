import { GetStaticProps } from 'next'
import Link from 'next/link'
import Layout from '../components/Layout'
import { getSortedPostsData } from '../lib/posts'
import { format, formatDistanceToNow } from 'date-fns'
import { zhCN } from 'date-fns/locale'

interface Post {
  slug: string
  title: string
  date: string
  summary?: string
  tags?: string[]
  cover?: string
}

interface HomeProps {
  posts: Post[]
}

// ===== 最新动态（微博/X 时间线风格，独立维护）=====
const UPDATES = [
  {
    date: '2026-03-28T21:45:00',
    tags: ['AI Agent'],
    text: 'Manus 在 Agent 工作流编排上有新进展：多工具调用链路稳定性大幅提升，支持跨工具状态持久化。值得持续跟踪其架构演进方向。',
  },
  {
    date: '2026-03-28T14:20:00',
    tags: ['产业'],
    text: '看了一份关于国内 AI 芯片替代进展的数据：华为昇腾910B 在部分训练任务上已接近 A100 水平，供应链独立性在快速提升。',
  },
  {
    date: '2026-03-27T20:10:00',
    tags: ['AI 模型'],
    text: '豆包大模型视觉理解能力提升明显，尤其在复杂图表解析和结构化信息提取上，OCR 类任务超越部分竞品。字节在多模态上投入很重。',
  },
  {
    date: '2026-03-27T10:05:00',
    tags: ['思考'],
    text: '一个小观察：越来越多的 AI 工具在往"无代码"方向走，真正的门槛可能已经从"会不会写代码"转移到"会不会提问"了。',
  },
  {
    date: '2026-03-26T18:30:00',
    tags: ['OpenAI'],
    text: 'OpenAI o3 正式发布，推理能力有实质性跃升，数学和代码 benchmark 成绩优秀。但单次推理成本仍是制约普及的核心门槛，等降价。',
  },
  {
    date: '2026-03-25T09:00:00',
    tags: ['行业'],
    text: '2025 年 AI 应用层淘汰赛已经开始。功能单一、没有数据飞轮的工具类产品正在被快速整合，差异化壁垒越来越难建。',
  },
]

export default function Home({ posts }: HomeProps) {
  const displayUpdates = UPDATES.slice(0, 5)
  const displayPosts = posts.slice(0, 5)

  return (
    <Layout posts={posts}>

      {/* ========== 板块一：最新动态（微博/X 时间线风格）========== */}
      <div className="feed-section">
        <div className="feed-header">
          <span className="feed-title">最新动态</span>
          <span className="feed-count">{UPDATES.length} 条</span>
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
                  <div className="tl-feed-avatar">我</div>
                  {i < displayUpdates.length - 1 && <div className="tl-feed-line" />}
                </div>
                {/* 右侧：内容 */}
                <div className="tl-feed-right">
                  <div className="tl-feed-header">
                    <span className="tl-feed-author">{require('../blog.config').author}</span>
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

        {UPDATES.length > 5 && (
          <div className="feed-more">
            <Link href="/archive" className="feed-more-link">查看全部动态 →</Link>
          </div>
        )}
      </div>

      {/* ========== 分隔线 ========== */}
      <div className="feed-divider" />

      {/* ========== 板块二：最新文章（主线）========== */}
      <div className="feed-section">
        <div className="feed-header">
          <span className="feed-title">最新文章</span>
          <span className="feed-count">{posts.length} 篇</span>
        </div>

        {posts.length === 0 ? (
          <div className="empty-state">
            <p>还没有文章，快去写第一篇吧 ✍️</p>
          </div>
        ) : (
          <>
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
                        <Link href={`/posts/${post.slug}`}>{post.title}</Link>
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

            {posts.length > 5 && (
              <div className="feed-more">
                <Link href="/archive" className="feed-more-link">查看全部文章 →</Link>
              </div>
            )}
          </>
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
