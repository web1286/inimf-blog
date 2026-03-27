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
    <Layout>
      {posts.length === 0 ? (
        <div className="empty-state">
          <p>还没有文章，快去写第一篇吧 ✍️</p>
        </div>
      ) : (
        <ul className="post-list">
          {posts.map((post) => (
            <li key={post.slug} className="post-item">
              <div className="post-meta">
                <time className="post-date" dateTime={post.date}>
                  {format(new Date(post.date), 'yyyy年 M月 d日', { locale: zhCN })}
                </time>
                {post.tags && post.tags.length > 0 && (
                  <div className="post-tags">
                    {post.tags.map((tag) => (
                      <span key={tag} className="post-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <h2 className="post-title">
                <Link href={`/posts/${post.slug}`}>{post.title}</Link>
              </h2>
              {post.summary && <p className="post-summary">{post.summary}</p>}
            </li>
          ))}
        </ul>
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
