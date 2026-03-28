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
    date: '2026-03-28',
    time: '11:00',
    slug: '2026-03-21-dizpingxian-robot',
    title: '地平线机器人（09660.HK）深度研究报告',
    summary: '中国最大乘用车 ADAS 供应商，2023 年市占率 30%。本报告深入分析其商业模式、财务状况、竞争格局与投资价值。',
    tags: ['研究报告'],
  },
  {
    date: '2026-03-26',
    time: '16:30',
    slug: '2026-03-22-wwii-economic-analysis',
    title: '为什么会有第二次世界大战？',
    summary: '从经济学视角分析一战后的全球失衡：美国 1929 年经济大萧条如何引发全球经济链式崩溃，以及德日走向战争的结构性逻辑。',
    tags: ['历史研究'],
  },
  {
    date: '2026-03-24',
    time: '09:15',
    slug: 'ai-agent-2025-landscape',
    title: 'AI Agent 2025：产业格局与投资机会',
    summary: '梳理 Agent 赛道的四个层次：基础模型层、工具层、平台层、应用层。重点分析哪个层次的护城河最强，资本会流向哪里。',
    tags: ['AI 研究'],
  },
  {
    date: '2026-03-22',
    time: '20:00',
    slug: 'china-consumption-recovery-2025',
    title: '2025 年中国消费复苏：数据追踪与结构分析',
    summary: '从五五购物节、清明假期出行、餐饮收入三个维度拆解消费复苏进度，判断哪些品类已经见底反弹，哪些还在底部徘徊。',
    tags: ['宏观研究'],
  },
  {
    date: '2026-03-20',
    time: '14:00',
    slug: 'embodied-intelligence-industrial-map',
    title: '具身智能产业链全景图：从芯片到机器人本体',
    summary: '绘制具身智能完整产业链：感知层（视觉/雷达）→ 计算层（边缘芯片）→ 控制层（机器人OS）→ 本体层（人形/工业机器人），梳理国产替代进度。',
    tags: ['产业研究'],
  },
]
