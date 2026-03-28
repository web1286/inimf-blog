import { GetStaticProps } from 'next'
import Layout from '../components/Layout'
import { getSortedPostsData } from '../lib/posts'

interface AboutProps {
  posts: { slug: string; title: string; date: string; tags?: string[] }[]
}

export default function About({ posts }: AboutProps) {
  return (
    <Layout title="关于" posts={posts}>
      <div className="about-page article-content">
        <h1>关于</h1>
        <p>
          你好，这里是 inimf 的个人博客。
        </p>
        <p>
          这里记录生活、思考和一些随笔。
        </p>
        <hr />
        <p>
          域名：<a href="https://www.inimf.com">www.inimf.com</a>
        </p>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getSortedPostsData()
  return {
    props: {
      posts: posts.map(p => ({
        slug: p.slug,
        title: p.title,
        date: p.date,
        tags: p.tags || [],
      })),
    },
  }
}
