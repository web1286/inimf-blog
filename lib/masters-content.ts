import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import remarkGfm from 'remark-gfm'
import { MASTERS } from '../data/masters'

const mastersContentDir = path.join(process.cwd(), 'masters-content')

// 作者名 → 英文目录名映射
const AUTHOR_SLUG_MAP: Record<string, string> = {
  '冯柳': 'fengliu',
}

// 文章标题 → 英文文件名映射（不含 .md）
const ARTICLE_SLUG_MAP: Record<string, string> = {
  '技术规律的总结与体会': 'technical-analysis',
}

export function getAuthorSlug(author: string): string {
  return AUTHOR_SLUG_MAP[author] || author
}

export function getArticleSlug(title: string): string {
  return ARTICLE_SLUG_MAP[title] || title
}

/** 枚举所有高手文章路径，供 getStaticPaths 使用 */
export function getMasterArticlePaths(): Array<{
  authorSlug: string
  articleSlug: string
  author: string
  title: string
}> {
  return MASTERS
    .filter(m => m.url) // 只有有 url 的才生成详情页
    .map(m => ({
      authorSlug: getAuthorSlug(m.author),
      articleSlug: getArticleSlug(m.title),
      author: m.author,
      title: m.title,
    }))
}

/** 读取单篇文章内容，返回 HTML */
export async function getMasterArticleContent(
  authorSlug: string,
  articleSlug: string
): Promise<{
  title: string
  datetime: string
  author: string
  summary?: string
  contentHtml: string
}> {
  const fullPath = path.join(mastersContentDir, authorSlug, `${articleSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)

  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(matterResult.content)

  const contentHtml = processedContent.toString()

  const data = matterResult.data as {
    title: string
    datetime: string | Date
    author: string
    summary?: string
  }

  return {
    contentHtml,
    title: data.title,
    // gray-matter 会把 YYYY-MM-DD 解析为 Date 对象，强制转回字符串
    datetime: data.datetime instanceof Date
      ? data.datetime.toISOString().slice(0, 10)
      : String(data.datetime),
    author: data.author,
    summary: data.summary,
  }
}
