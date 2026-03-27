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

export default function Home({ posts }: HomeProps) {
  return (
    <Layout posts={posts}>
      <div className="feed-header">
        <span className="feed-title">最新动态</span>
        <span className="feed-count">{posts.length} 篇文章</span>
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
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getSortedPostsData()
  return {
    props: { posts },
  }
}
