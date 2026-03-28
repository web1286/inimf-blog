import { GetStaticProps } from 'next'
import Link from 'next/link'
import Layout from '../../components/Layout'
import { getSortedPostsData } from '../../lib/posts'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'

interface Post {
  slug: string
  title: string
  date: string
  summary?: string
  tags?: string[]
}

interface Props {
  posts: Post[]
}

export default function PostsIndexPage({ posts }: Props) {
  // 按年月分组
  const grouped = posts.reduce<Record<string, Post[]>>((acc, post) => {
    const key = format(new Date(post.date), 'yyyy年', { locale: zhCN })
    if (!acc[key]) acc[key] = []
    acc[key].push(post)
    return acc
  }, {})

  const years = Object.keys(grouped).sort((a, b) => b.localeCompare(a))

  return (
    <Layout title="全部文章" posts={posts} hideSidebar>
      <div className="archive-page">
        <div className="archive-header">
          <h1 className="archive-title">全部文章</h1>
          <p className="archive-desc">按时间线倒序排列，共 {posts.length} 篇</p>
        </div>

        {posts.length === 0 ? (
          <div className="empty-state">
            <p>还没有文章，快去写第一篇吧 ✍️</p>
          </div>
        ) : (
          <div className="posts-archive-timeline">
            {years.map(year => (
              <div key={year} className="posts-year-group">
                <div className="posts-year-label">{year}</div>
                <div className="posts-year-items">
                  {grouped[year].map((post) => (
                    <div key={post.slug} className="posts-archive-item">
                      <time className="posts-archive-date">
                        {format(new Date(post.date), 'M月d日', { locale: zhCN })}
                      </time>
                      <div className="posts-archive-body">
                        {post.tags && post.tags[0] && (
                          <span className="post-category-badge">{post.tags[0]}</span>
                        )}
                        <Link href={`/posts/${post.slug}`} className="posts-archive-title">
                          {post.title}
                        </Link>
                        {post.summary && (
                          <p className="posts-archive-summary">{post.summary}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getSortedPostsData()
  return { props: { posts } }
}
