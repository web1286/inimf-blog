import Link from 'next/link'
import Layout from '../../../components/Layout'
import { GetStaticPaths, GetStaticProps } from 'next'
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
  summary?: string
  contentHtml: string
}

export default function MasterArticlePage({ author, title, datetime, summary, contentHtml }: Props) {
  return (
    <Layout
      title={`${title} · ${author} · 高手身影`}
      description={summary || title}
      hideSidebar={true}
    >
      <article className="post-article" style={{ maxWidth: '720px', margin: '0 auto' }}>

        {/* 面包屑 */}
        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
          <Link href="/masters" style={{ color: 'var(--color-accent)', textDecoration: 'none' }}>
            高手身影
          </Link>
          <span style={{ margin: '0 6px' }}>›</span>
          <Link
            href={`/masters/${encodeURIComponent(author)}`}
            style={{ color: 'var(--color-accent)', textDecoration: 'none' }}
          >
            {author}
          </Link>
          <span style={{ margin: '0 6px' }}>›</span>
          <span>{title}</span>
        </div>

        {/* 标题区 */}
        <header style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span className="masters-author-tag">{author}</span>
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, lineHeight: 1.3, margin: '0 0 0.75rem 0' }}>
            {title}
          </h1>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
            写于 {datetime}
          </div>
          {summary && (
            <p style={{
              marginTop: '1rem',
              padding: '0.75rem 1rem',
              background: 'var(--color-bg-muted, #f7f7f7)',
              borderLeft: '3px solid #7c3aed',
              fontSize: '0.9rem',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.6,
            }}>
              {summary}
            </p>
          )}
        </header>

        {/* 正文 */}
        <div
          className="post-content masters-article-content"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {/* 返回 */}
        <div style={{ marginTop: '3rem', paddingTop: '1.25rem', borderTop: '1px solid var(--color-border)' }}>
          <Link
            href={`/masters/${encodeURIComponent(author)}`}
            style={{ fontSize: '0.8rem', color: 'var(--color-accent)', textDecoration: 'none', marginRight: '1.5rem' }}
          >
            ← 返回 {author}
          </Link>
          <Link
            href="/masters"
            style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textDecoration: 'none' }}
          >
            高手身影总览
          </Link>
        </div>

      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const articlePaths = getMasterArticlePaths()
  return {
    paths: articlePaths.map(({ author, title }) => ({
      params: {
        author: encodeURIComponent(author),
        slug: encodeURIComponent(title),
      },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const rawAuthor = decodeURIComponent(params?.author as string)
  const rawTitle = decodeURIComponent(params?.slug as string)

  const authorSlug = getAuthorSlug(rawAuthor)
  const articleSlug = getArticleSlug(rawTitle)

  const articleData = await getMasterArticleContent(authorSlug, articleSlug)

  return {
    props: {
      ...articleData,
      // 以 URL 参数中的 author 为准（防止 frontmatter 中文名与 URL 不一致）
      author: articleData.author || rawAuthor,
    },
  }
}
