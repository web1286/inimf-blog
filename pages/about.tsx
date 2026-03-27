import Layout from '../components/Layout'

export default function About() {
  return (
    <Layout title="关于">
      <div className="article-content about-page">
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
