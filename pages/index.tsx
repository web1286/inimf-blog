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
    <Layout>
      <div className="post-list-wrap">
        {posts.length === 0 ? (
          <div className="empty-state">
            <p>还没有文章，快去写第一篇吧 ✍️</p>
          </div>
        ) : (
          <ul className="post-list">
            {posts.map((post) => (
              <li key={post.slug} className="post-item">
                <div className="post-item-inner">
                  <div className="post-item-content">
                    <div className="post-item-meta">
                      {post.tags && post.tags.length > 0 && (
                        <>
                          <span className="post-category">{post.tags[0]}</span>
                          <span className="post-item-meta-sep">·</span>
                        </>
                      )}
                      <time className="post-date" dateTime={post.date}>
                        {format(new Date(post.date), 'MM月dd日', { locale: zhCN })}
                      </time>
                    </div>

                    <h2 className="post-title">
                      <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                    </h2>

                    {post.summary && (
                      <p className="post-summary">{post.summary}</p>
                    )}

                    {post.tags && post.tags.length > 1 && (
                      <div className="post-tags">
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
                      className="post-cover"
                    />
                  )}
                </div>
              </li>
            ))}
          </ul>
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
