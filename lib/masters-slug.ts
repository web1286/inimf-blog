// 高手身影 URL slug 映射（客户端可用，无 Node.js 依赖）
// 所有中文 → 英文 slug 的映射集中在这里维护

/** 作者名 → 英文目录 slug */
export const AUTHOR_SLUG_MAP: Record<string, string> = {
  '冯柳': 'fengliu',
}

/** 文章标题 → 英文文件名 slug（不含 .md） */
export const ARTICLE_SLUG_MAP: Record<string, string> = {
  '技术规律的总结与体会': 'technical-analysis',
}

export function getAuthorSlug(author: string): string {
  return AUTHOR_SLUG_MAP[author] || author
}

export function getArticleSlug(title: string): string {
  return ARTICLE_SLUG_MAP[title] || title
}
