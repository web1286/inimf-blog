// 高手身影 — 数据层
// 结构：高手身影 → 作者 → 具体文章（按 datetime 倒序排列）

export interface MasterArticle {
  author: string      // 作者姓名，同时作为 URL slug
  title: string       // 文章标题
  datetime: string    // ISO 8601，排序用（如 "2024-06-15"）
  url?: string        // 原文链接（可选）
  summary?: string    // 简短摘要（可选）
}

// 所有高手文章数据，新增时直接往数组里加
export const MASTERS: MasterArticle[] = [
  // === 查理·芒格 ===
  {
    author: '查理·芒格',
    title: '穷查理宝典：芒格书院讲话精选',
    datetime: '2023-11-15',
    url: '',
    summary: '芒格在书院系列演讲的精华合集，涵盖多元思维模型框架。',
  },
  {
    author: '查理·芒格',
    title: '论反转思维：倒过来想，总是倒过来想',
    datetime: '2022-05-20',
    url: '',
    summary: '用反向推理规避失败，而非正向追求成功。',
  },
  {
    author: '查理·芒格',
    title: '人类误判心理学（25种认知偏误）',
    datetime: '2020-03-10',
    url: '',
    summary: '芒格在哈佛法学院的经典演讲，系统梳理人类决策中的25种误判。',
  },

  // === 霍华德·马克斯 ===
  {
    author: '霍华德·马克斯',
    title: '周期：对待好时机与坏时机的永恒规律',
    datetime: '2024-01-08',
    url: '',
    summary: '理解周期比预测市场更重要，如何在周期中定位自己。',
  },
  {
    author: '霍华德·马克斯',
    title: '备忘录：关于宏观预测的无用与有用',
    datetime: '2023-07-22',
    url: '',
    summary: '马克斯最新备忘录，论宏观判断在投资中的局限与价值。',
  },

  // === 彼得·林奇 ===
  {
    author: '彼得·林奇',
    title: '彼得·林奇的成功投资：业余投资者的选股优势',
    datetime: '2022-09-30',
    url: '',
    summary: '普通投资者比机构拥有更早发现身边好公司的先天优势。',
  },
]

// === 辅助函数 ===

/** 所有文章按 datetime 倒序（最新在前） */
export function getAllMastersSorted(): MasterArticle[] {
  return [...MASTERS].sort((a, b) => b.datetime.localeCompare(a.datetime))
}

/** 获取所有唯一作者列表（按文章数量倒序） */
export function getAuthors(): string[] {
  const countMap: Record<string, number> = {}
  MASTERS.forEach(m => {
    countMap[m.author] = (countMap[m.author] || 0) + 1
  })
  return Object.keys(countMap).sort((a, b) => countMap[b] - countMap[a])
}

/** 按作者分组，组内文章按 datetime 倒序 */
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

/** 获取指定作者的所有文章（倒序） */
export function getArticlesByAuthor(author: string): MasterArticle[] {
  return MASTERS
    .filter(m => m.author === author)
    .sort((a, b) => b.datetime.localeCompare(a.datetime))
}
