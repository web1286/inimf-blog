import Head from 'next/head'
import Link from 'next/link'
import { ReactNode } from 'react'
const config = require('../blog.config')

interface LayoutProps {
  children: ReactNode
  title?: string
  description?: string
  isHome?: boolean
}

export default function Layout({ children, title, description, isHome }: LayoutProps) {
  const pageTitle = title ? `${title} — ${config.title}` : config.title
  const pageDesc = description || config.description

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:site_name" content={config.title} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* 顶部导航：Dawn 风格，白底细线 */}
      <header className="site-header">
        <div className="header-inner">
          <Link href="/" className="site-title">
            {config.title}
          </Link>
          <nav className="site-nav">
            {config.nav.map((item: { label: string; href: string }) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
            <a href="/feed.xml" className="header-rss" title="RSS 订阅">RSS</a>
          </nav>
        </div>
      </header>

      {/* 主内容区 */}
      <div className={isHome ? 'home-wrapper' : ''}>
        {children}
      </div>

      {/* 页脚 */}
      <footer className="site-footer">
        <p>{config.footer}</p>
      </footer>
    </>
  )
}
