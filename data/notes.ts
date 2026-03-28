// ===== 备注信息数据（独立目录，与其他模块完全无关）=====
// 维护方式：在此数组头部添加新条目
// slug 对应 posts/ 目录下的文章文件名（不含 .md），也可以是外部 href

export interface NoteItem {
  date: string     // 格式：'YYYY-MM-DD'
  time: string     // 格式：'HH:mm'
  slug: string     // 文章 slug（对应 posts/xxx.md）
  title: string    // 显示标题
  summary: string  // 摘要
  tags?: string[]  // 标签
}

export const NOTES: NoteItem[] = [
  {
    date: '2026-03-27',
    time: '10:00',
    slug: 'how-to-write',
    title: '如何写一篇新文章',
    summary: '关于如何在这个博客添加新文章的操作说明：用 Markdown 格式，在 posts/ 目录新建 .md 文件，frontmatter 填写 title/date/summary/tags 即可自动发布。',
    tags: ['指南'],
  },
  {
    date: '2026-03-27',
    time: '09:00',
    slug: 'hello-world',
    title: '你好，世界',
    summary: '这是我博客的第一篇文章。博客这件事，最重要的不是第一篇写什么，而是后来有没有继续写下去。',
    tags: ['随笔'],
  },
]
