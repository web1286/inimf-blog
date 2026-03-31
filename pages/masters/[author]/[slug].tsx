import Link from 'next/link'
import { GetStaticPaths, GetStaticProps } from 'next'
import Layout from '../../../components/Layout'
import {
  getMasterArticlePaths,
  getMasterArticleContent,
  getAuthorSlug,
  getArticleSlug,
} from '../../../lib/masters-content'

interface Props {
  author: string
  title: string
  datetime: string
  summary: string
  contentHtml: string
}

export default function MasterArticlePage({ author, title, datetime, summary, contentHtml }: Props) {
  return (
    <Layout title={`${title} · ${author} · 高手身影`} description={summary} hideSidebar>
      <article style={{ maxWidth: '680px', margin: '0 auto' }}>

        {/* 面包屑 */}
        <nav style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
          <Link href="/masters" style={{ color: 'var(--color-accent)', textDecoration: 'none' }}>高手身影</Link>
          <span style={{ margin: '0 6px' }}>›</span>
          <Link
            href={`/masters/${encodeURIComponent(author)}`}
            style={{ color: 'var(--color-accent)', textDecoration: 'none' }}
          >{author}</Link>
          <span style={{ margin: '0 6px' }}>›</span>
          <span>{title}</span>
        </nav>

        {/* 标题 */}
        <h1 style={{
          fontSize: '1.55rem',
          fontWeight: 800,
          lineHeight: 1.4,
          color: 'var(--color-text)',
          marginBottom: '0.75rem',
        }}>{title}</h1>

        {/* 元信息 */}
        <div style={{
          fontSize: '0.8rem',
          color: 'var(--color-text-muted)',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          borderBottom: '1px solid var(--color-border)',
          paddingBottom: '1rem',
        }}>
          <span style={{
            background: '#f3e8ff',
            color: '#7c3aed',
            borderRadius: '4px',
            padding: '0.15rem 0.5rem',
            fontWeight: 600,
            fontSize: '0.75rem',
          }}>{author}</span>
          <span>{datetime}</span>
          <span style={{ marginLeft: 'auto' }}>收录于「高手身影」</span>
        </div>

        {/* 正文 */}
        <div
          className="article-content masters-article-content"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {/* 返回 */}
        <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
          <Link
            href={`/masters/${encodeURIComponent(author)}`}
            style={{ fontSize: '0.82rem', color: 'var(--color-accent)', textDecoration: 'none' }}
          >← 返回 {author} 的所有文章</Link>
        </div>

      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getMasterArticlePaths()
  return {
    paths: paths.map(({ author, title }) => ({
      params: {
        author: encodeURIComponent(author),
        slug: encodeURIComponent(title),
      },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const author = decodeURIComponent(params?.author as string)
  const title = decodeURIComponent(params?.slug as string)
  const authorSlug = getAuthorSlug(author)
  const articleSlug = getArticleSlug(title)
  const data = await getMasterArticleContent(authorSlug, articleSlug)
  return { props: data }
}
