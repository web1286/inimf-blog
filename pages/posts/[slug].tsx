import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
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
}

export default function Post({ postData, prevPost, nextPost }: PostProps) {
  return (
    <Layout title={postData.title} description={postData.summary}>
      <article>
        <header className="article-header">
          <h1 className="article-title">{postData.title}</h1>
          <div className="article-meta">
            <time className="article-date" dateTime={postData.date}>
              {format(new Date(postData.date), 'yyyy年 M月 d日', { locale: zhCN })}
            </time>
            {postData.tags && postData.tags.length > 0 && (
              <div className="post-tags">
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
      prevPost: prevPost ? { slug: prevPost.slug, title: prevPost.title } : null,
      nextPost: nextPost ? { slug: nextPost.slug, title: nextPost.title } : null,
    },
  }
}
