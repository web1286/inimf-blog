import Head from 'next/head'
import Link from 'next/link'
import { ReactNode } from 'react'
const config = require('../blog.config')

interface LayoutProps {
  children: ReactNode
  title?: string
  description?: string
}

export default function Layout({ children, title, description }: LayoutProps) {
  const pageTitle = title ? `${title} - ${config.title}` : config.title
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
        <link rel="alternate" type="application/rss+xml" title={config.title} href="/feed.xml" />
      </Head>

      <div className="page-wrapper">
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
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="site-footer">
          <p>{config.footer}</p>
        </footer>
      </div>
    </>
  )
}
