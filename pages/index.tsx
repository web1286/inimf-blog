import { GetStaticProps } from 'next'
import Link from 'next/link'
import Layout from '../components/Layout'
import { getSortedPostsData } from '../lib/posts'
import { format } from 'date-fns'
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

// ===== 最新动态（简讯/突发/短思考，独立维护）=====
const UPDATES = [
  {
    date: '2026-03-28',
    title: 'Manus Agent 工作流编排新进展',
    summary: '关注到 Manus 在 Agent 工作流编排上的新进展，多工具调用链路稳定性大幅提升，值得持续跟踪研究其架构演进方向。',
    tags: ['AI Agent'],
  },
  {
    date: '2026-03-27',
    title: '豆包大模型视觉能力提升',
    summary: '字节跳动旗下豆包大模型视觉理解能力有明显提升，尤其是复杂图表解析和结构化信息提取，在 OCR 类任务上超越部分竞品。',
    tags: ['AI 模型'],
  },
  {
    date: '2026-03-26',
    title: 'OpenAI o3 正式发布',
    summary: 'OpenAI o3 正式对外发布，推理能力有实质性跃升，数学和代码 benchmark 成绩优秀，但单次推理成本仍是制约普及的核心门槛。',
    tags: ['OpenAI'],
  },
]

export default function Home({ posts }: HomeProps) {
  return (
    <Layout posts={posts}>

      {/* ========== 板块一：最新动态 ========== */}
      <div className="feed-section">
        <div className="feed-header">
          <span className="feed-title">最新动态</span>
          <span className="feed-count">{UPDATES.length} 条</span>
        </div>

        <div className="post-feed">
          {UPDATES.map((item, i) => (
            <article key={i} className="post-card">
              <div className="post-card-inner">
                <div className="post-card-content">
                  <div className="post-card-meta">
                    {item.tags && item.tags.length > 0 && (
                      <>
                        <span className="post-category-badge">{item.tags[0]}</span>
                        <span className="post-meta-sep">·</span>
                      </>
                    )}
                    <time className="post-date" dateTime={item.date}>
                      {format(new Date(item.date), 'yyyy年M月d日', { locale: zhCN })}
                    </time>
                  </div>
                  <h2 className="post-card-title">{item.title}</h2>
                  {item.summary && (
                    <p className="post-card-summary">{item.summary}</p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
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
          <div className="post-feed">
            {posts.map((post) => (
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
