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
}

interface HomeProps {
  posts: Post[]
}

export default function Home({ posts }: HomeProps) {
  return (
    <Layout isHome>
      {/* Dawn 风格 Hero 区块 */}
      <div className="home-hero">
        <h1 className="home-hero-title">记录生活，<br />留存思考。</h1>
        <p className="home-hero-desc">
          这里是 inimf 的个人空间，写一些关于生活、城市与观察的文字。
        </p>
      </div>

      {/* 文章列表 */}
      <div className="post-feed-wrap">
        <div className="feed-header">
          <span className="feed-title">文章</span>
          <span className="feed-count">{posts.length} 篇</span>
        </div>

        {posts.length === 0 ? (
          <div className="empty-state">
            <p>还没有文章，快去写第一篇吧 ✍️</p>
          </div>
        ) : (
          <div className="post-feed">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/posts/${post.slug}`}
                className="post-card"
              >
                <time className="post-date" dateTime={post.date}>
                  {format(new Date(post.date), 'MM/dd', { locale: zhCN })}
                </time>
                <div className="post-card-content">
                  <div className="post-card-title">
                    {post.title}
                    {post.tags && post.tags.length > 0 && (
                      <span className="post-tag">{post.tags[0]}</span>
                    )}
                  </div>
                  {post.summary && (
                    <p className="post-card-summary">{post.summary}</p>
                  )}
                </div>
              </Link>
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
