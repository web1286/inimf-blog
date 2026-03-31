import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import remarkGfm from 'remark-gfm'
import { MASTERS } from '../data/masters'

const mastersDir = path.join(process.cwd(), 'masters-content')

// author -> slug 映射表（从 MASTERS 数据反推）
// url 格式：/masters/冯柳/技术规律的总结与体会
// 文件路径：masters-content/fengliu/technical-analysis.md
const AUTHOR_SLUG_MAP: Record<string, string> = {
  '冯柳': 'fengliu',
}
const TITLE_SLUG_MAP: Record<string, string> = {
  '技术规律的总结与体会': 'technical-analysis',
}

export function getAuthorSlug(author: string): string {
  return AUTHOR_SLUG_MAP[author] || encodeURIComponent(author)
}

export function getArticleSlug(title: string): string {
  return TITLE_SLUG_MAP[title] || encodeURIComponent(title)
}

export function getMasterArticlePaths() {
  return MASTERS
    .filter(m => m.url)
    .map(m => ({
      authorSlug: getAuthorSlug(m.author),
      articleSlug: getArticleSlug(m.title),
      author: m.author,
      title: m.title,
    }))
}

export async function getMasterArticleContent(authorSlug: string, articleSlug: string) {
  const filePath = path.join(mastersDir, authorSlug, `${articleSlug}.md`)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(content)

  return {
    author: data.author as string,
    title: data.title as string,
    datetime: data.datetime as string,
    summary: (data.summary as string) || '',
    contentHtml: processed.toString(),
  }
}
