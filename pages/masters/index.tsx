import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/Layout'
import {
  getMastersGroupedByAuthor,
  getAuthors,
  MASTERS,
} from '../../data/masters'

const config = require('../../blog.config')

export default function MastersIndex() {
  const authors = getAuthors()
  const groups = getMastersGroupedByAuthor()

  return (
    <Layout title="高手身影" description="收录高手智慧文章，按作者分类整理">
      <div className="masters-page">

        {/* 页面标题 */}
        <div style={{ marginBottom: '0.25rem' }}>
          <h1 className="masters-page-title">高手身影</h1>
          <p className="masters-page-desc">收录高手智慧文章 · 共 {MASTERS.length} 篇 · {authors.length} 位作者</p>
        </div>

        {/* 作者快速导航 */}
        <nav className="masters-nav" aria-label="作者导航">
          {authors.map(author => (
            <Link
              key={author}
              href={`/masters/${encodeURIComponent(author)}`}
              className="masters-nav-item"
            >
              {author}
              <span className="masters-nav-count">({groups[author].length})</span>
            </Link>
          ))}
        </nav>

        {/* 按作者分组展示 */}
        {authors.map(author => {
          const articles = groups[author]
          return (
            <div key={author} className="masters-group" id={encodeURIComponent(author)}>

              {/* 作者分组标题 */}
              <div className="masters-group-header">
                <span className="masters-group-author">{author}</span>
                <span className="masters-group-count">{articles.length} 篇</span>
                <Link
                  href={`/masters/${encodeURIComponent(author)}`}
                  className="masters-group-link"
                >
                  查看全部 →
                </Link>
              </div>

              {/* 该作者文章列表（时间线倒序） */}
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {articles.map((article, i) => (
                  <li key={i} className="masters-toc-item">
                    <span className="masters-toc-date">
                      {article.datetime.slice(0, 7)}
                    </span>
                    {article.url ? (
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="masters-toc-title"
                      >
                        {article.title}
                      </a>
                    ) : (
                      <span className="masters-toc-title" style={{ cursor: 'default' }}>
                        {article.title}
                      </span>
                    )}
                  </li>
                ))}
              </ul>

            </div>
          )
        })}

      </div>
    </Layout>
  )
}
