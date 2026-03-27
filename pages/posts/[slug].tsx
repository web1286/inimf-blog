import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import Layout from '../../components/Layout'
import { getAllPostSlugs, getPostData, getSortedPostsData } from '../../lib/posts'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'

interface PostProps {
  postData: {
    slug: string
    title: string
    date: string
    summary?: string
    tags?: string[]
    contentHtml: string
  }
  prevPost: { slug: string; title: string } | null
  nextPost: { slug: string; title: string } | null
  allPosts: { slug: string; title: string; date: string; tags?: string[] }[]
}

// Giscus 评论组件
function GiscusComments() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    // 清空旧实例（路由跳转时）
    ref.current.innerHTML = ''

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    // ⚠️  主人需要去 https://giscus.app 配置后填入以下参数
    script.setAttribute('data-repo', 'web1286/inimf-blog')
    script.setAttribute('data-repo-id', 'FILL_YOUR_REPO_ID')          // 从 giscus.app 获取
    script.setAttribute('data-category', 'General')
    script.setAttribute('data-category-id', 'FILL_YOUR_CATEGORY_ID')  // 从 giscus.app 获取
    script.setAttribute('data-mapping', 'pathname')
    script.setAttribute('data-strict', '0')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'top')
    script.setAttribute('data-theme', 'light')
    script.setAttribute('data-lang', 'zh-CN')
    script.setAttribute('data-loading', 'lazy')
    script.setAttribute('crossorigin', 'anonymous')
    script.async = true

    ref.current.appendChild(script)
  }, [])

  return (
    <div className="giscus-wrap">
      <div className="giscus-title">评论 / COMMENTS</div>
      <div ref={ref} />
    </div>
  )
}

export default function Post({ postData, prevPost, nextPost, allPosts }: PostProps) {
  return (
    <Layout
      title={postData.title}
      description={postData.summary}
      posts={allPosts}
    >
      <article className="article-page">
        <header className="article-header">
          <h1 className="article-title">{postData.title}</h1>
          <div className="article-meta">
            <time className="article-date" dateTime={postData.date}>
              {format(new Date(postData.date), 'yyyy年 M月 d日', { locale: zhCN })}
            </time>
            {postData.tags && postData.tags.length > 0 && (
              <div className="post-card-footer">
                {postData.tags.map((tag) => (
                  <span key={tag} className="post-tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />

        {/* 上一篇 / 下一篇 */}
        <nav className="post-navigation">
          <div className="nav-prev">
            {nextPost && (
              <>
                <span className="nav-label">上一篇</span>
                <Link href={`/posts/${nextPost.slug}`} className="nav-title">
                  {nextPost.title}
                </Link>
              </>
            )}
          </div>
          <div className="nav-next">
            {prevPost && (
              <>
                <span className="nav-label">下一篇</span>
                <Link href={`/posts/${prevPost.slug}`} className="nav-title">
                  {prevPost.title}
                </Link>
              </>
            )}
          </div>
        </nav>

        {/* Giscus 评论区 */}
        <GiscusComments />
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostSlugs()
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params?.slug as string)
  const allPosts = getSortedPostsData()
  const currentIndex = allPosts.findIndex((p) => p.slug === params?.slug)
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null

  return {
    props: {
      postData,
      allPosts: allPosts.map(p => ({
        slug: p.slug,
        title: p.title,
        date: p.date,
        tags: p.tags || [],
      })),
      prevPost: prevPost ? { slug: prevPost.slug, title: prevPost.title } : null,
      nextPost: nextPost ? { slug: nextPost.slug, title: nextPost.title } : null,
    },
  }
}
