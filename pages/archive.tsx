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
  tags?: string[]
}

interface ArchiveProps {
  posts: Post[]
}

export default function Archive({ posts }: ArchiveProps) {
  // 按年份分组
  const grouped = posts.reduce((acc, post) => {
    const year = new Date(post.date).getFullYear().toString()
    if (!acc[year]) acc[year] = []
    acc[year].push(post)
    return acc
  }, {} as Record<string, Post[]>)

  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a))

  return (
    <Layout title="目录" posts={posts}>
      <div className="archive-page">
      {years.map((year) => (
        <div key={year} className="archive-year">
          <h2 className="archive-year-title">{year}</h2>
          <ul className="archive-list">
            {grouped[year].map((post) => (
              <li key={post.slug} className="archive-item">
                <time className="archive-date" dateTime={post.date}>
                  {format(new Date(post.date), 'MM-dd', { locale: zhCN })}
                </time>
                <Link href={`/posts/${post.slug}`} className="archive-title">
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
        {years.length === 0 && (
          <div className="empty-state">
            <p>还没有文章</p>
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
