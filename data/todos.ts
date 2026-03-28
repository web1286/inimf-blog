// ===== 待办事项数据（独立目录，与其他模块完全无关）=====
// 维护方式：在此数组中增删条目
// priority: 'high'（红点）| 'normal'（灰点）
// done: true 显示为划线已完成

export interface TodoItem {
  id: number
  text: string
  done: boolean
  priority: 'high' | 'normal'
}

export const TODO_ITEMS: TodoItem[] = [
  { id: 1, text: '完成每周商业分析复盘', done: false, priority: 'high' },
  { id: 2, text: '整理 AI 趋势观测笔记', done: false, priority: 'high' },
  { id: 3, text: '写一篇具身智能观察文章', done: false, priority: 'high' },
  { id: 4, text: '更新博客关于页内容', done: false, priority: 'normal' },
  { id: 5, text: '研究地平线机器人 H系列产品路线图', done: false, priority: 'normal' },
  { id: 6, text: '阅读《置身事内》第三章', done: true, priority: 'normal' },
  { id: 7, text: '整理 DeepSeek 技术文档读书笔记', done: true, priority: 'normal' },
  { id: 8, text: '搜集 2025 年 AI 应用层融资数据', done: false, priority: 'normal' },
]
