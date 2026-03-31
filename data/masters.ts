// 高手身影 — 数据层
// 结构：高手身影 → 作者 → 具体文章（按 datetime 倒序排列）

export interface MasterArticle {
  author: string      // 作者姓名，同时作为 URL slug
  title: string       // 文章标题
  datetime: string    // 原文写作时间（ISO 8601，目录页/作者页按此排序）
  addedAt: string     // 入库时间（ISO 8601，首页边栏按此排序）
  url?: string        // 内部路由链接（/masters/作者/文章slug）
  summary?: string    // 简短摘要（可选）
}

// 所有高手文章数据，新增时直接往数组里加
export const MASTERS: MasterArticle[] = [
  // === 冯柳 ===
  {
    author: '冯柳',
    title: '技术规律的总结与体会',
    datetime: '2006-06-12',
    addedAt: '2026-03-31',
    url: '/masters/fengliu/technical-analysis',
    summary: '兵无常形，从大局到细部多方研判、理解并感受运行之机远比结论和规律更重要。',
  },
]

// === 辅助函数 ===

/** 首页边栏用：所有文章按 addedAt 倒序（最新入库在前） */
export function getAllMastersSorted(): MasterArticle[] {
  return [...MASTERS].sort((a, b) => b.addedAt.localeCompare(a.addedAt))
}

/** 目录页/作者页用：所有文章按写作时间 datetime 倒序 */
export function getAllMastersByDatetime(): MasterArticle[] {
  return [...MASTERS].sort((a, b) => b.datetime.localeCompare(a.datetime))
}

/** 获取所有唯一作者列表（按入库时间，最新入库的作者排前面） */
export function getAuthors(): string[] {
  // 按 addedAt 倒序，取唯一作者
  const seen = new Set<string>()
  const ordered: string[] = []
  getAllMastersSorted().forEach(m => {
    if (!seen.has(m.author)) {
      seen.add(m.author)
      ordered.push(m.author)
    }
  })
  return ordered
}

/** 按作者分组，组内文章按写作时间 datetime 倒序 */
export function getMastersGroupedByAuthor(): Record<string, MasterArticle[]> {
  const groups: Record<string, MasterArticle[]> = {}
  MASTERS.forEach(m => {
    if (!groups[m.author]) groups[m.author] = []
    groups[m.author].push(m)
  })
  Object.keys(groups).forEach(author => {
    groups[author].sort((a, b) => b.datetime.localeCompare(a.datetime))
  })
  return groups
}

/** 获取指定作者的所有文章（按写作时间 datetime 倒序） */
export function getArticlesByAuthor(author: string): MasterArticle[] {
  return MASTERS
    .filter(m => m.author === author)
    .sort((a, b) => b.datetime.localeCompare(a.datetime))
}
