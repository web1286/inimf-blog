export interface ThoughtItem {
  id: string
  datetime: string   // ISO 8601，如 "2026-03-30T09:15:00"
  text: string       // 随想正文（一两句话，灵感碎片）
  mood?: '💡' | '🤔' | '🔥' | '📖' | '🎯' | '😄'  // 情绪标签（可选）
}

export const THOUGHTS: ThoughtItem[] = [
  {
    id: 't1',
    datetime: '2026-03-30T09:15:00',
    mood: '💡',
    text: '数据分析的本质不是找答案，而是把问题问得更精准。',
  },
  {
    id: 't2',
    datetime: '2026-03-29T22:30:00',
    mood: '🤔',
    text: 'AI 让信息密度越来越高，但人的注意力是稀缺资源——真正的护城河是判断力，不是信息量。',
  },
  {
    id: 't3',
    datetime: '2026-03-29T08:00:00',
    mood: '🔥',
    text: '一个好的估值模型，需要三次迭代：第一次猜、第二次校准、第三次才能叫洞见。',
  },
  {
    id: 't4',
    datetime: '2026-03-28T20:00:00',
    mood: '📖',
    text: '看研报最有价值的部分不是结论，而是他们选了哪些数据来支撑——这说明分析师真正在意什么。',
  },
  {
    id: 't5',
    datetime: '2026-03-27T17:45:00',
    mood: '🎯',
    text: '能力圈不是你懂什么，而是你知道自己不懂什么的边界在哪。',
  },
]
