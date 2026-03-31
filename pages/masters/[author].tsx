import Link from 'next/link'
import Layout from '../../components/Layout'
import { GetStaticPaths, GetStaticProps } from 'next'
import {
  getAuthors,
  getArticlesByAuthor,
  MasterArticle,
} from '../../data/masters'

interface Props {
  author: string
  articles: MasterArticle[]
}

export default function AuthorPage({ author, articles }: Props) {
  return (
    <Layout
      title={`${author} · 高手身影`}
      description={`${author} 的文章精选，共 ${articles.length} 篇`}
    >
      <div className="masters-author-page">

        {/* 作者页头部 */}
        <div className="masters-author-header">
          {/* 面包屑 */}
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>
            <Link href="/masters" style={{ color: 'var(--color-accent)', textDecoration: 'none' }}>
              高手身影
            </Link>
            <span style={{ margin: '0 6px' }}>›</span>
            <span>{author}</span>
          </div>

          {/* 作者名 */}
          <h1 className="masters-author-name">{author}</h1>
          <p className="masters-author-meta">
            共收录 <strong>{articles.length}</strong> 篇 · 按时间线排列
          </p>
        </div>

        {/* 时间线文章列表 */}
        <ul className="masters-timeline">
          {articles.map((article, i) => (
            <li key={i} className="masters-timeline-item">
              <div className="masters-timeline-date">{article.datetime}</div>
              {article.url ? (
                <Link
                  href={article.url}
                  className="masters-timeline-title"
                >
                  {article.title}
                </Link>
              ) : (
                <span className="masters-timeline-title" style={{ cursor: 'default' }}>
                  {article.title}
                </span>
              )}
              {article.summary && (
                <p className="masters-timeline-summary">{article.summary}</p>
              )}
            </li>
          ))}
        </ul>

        {/* 返回按钮 */}
        <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid var(--color-border)' }}>
          <Link
            href="/masters"
            style={{
              fontSize: '0.8rem',
              color: 'var(--color-accent)',
              textDecoration: 'none',
            }}
          >
            ← 返回高手身影总览
          </Link>
        </div>

      </div>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const authors = getAuthors()
  return {
    paths: authors.map(author => ({
      params: { author: encodeURIComponent(author) },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const rawAuthor = decodeURIComponent(params?.author as string)
  const articles = getArticlesByAuthor(rawAuthor)
  return {
    props: {
      author: rawAuthor,
      articles,
    },
  }
}
