import { GetStaticProps } from 'next'
import Link from 'next/link'
import Layout from '../components/Layout'
import { getSortedPostsData } from '../lib/posts'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
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
  const displayPosts = posts.slice(0, 3)

  return (
    <Layout posts={posts}>

      {/* ========== 最新文章（主线）========== */}
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
