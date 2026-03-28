// ===== 记录轨迹数据（独立目录，与其他模块完全无关）=====
// 维护方式：在此数组头部添加新条目
// 字段说明：date（日期）、time（时间）、type（类型标签，如：文章/视频/播客/书）、content（内容描述）

export interface TrackItem {
  date: string   // 格式：'YYYY-MM-DD'
  time: string   // 格式：'HH:mm'
  type: string   // 类型，如：文章 / 视频 / 播客 / 书 / 论文
  content: string
}

export const TRACKS: TrackItem[] = [
  {
    date: '2026-03-28',
    time: '21:30',
    type: '文章',
    content: '《中国 AI 产业地图 2025》— 36氪研究院，系统梳理了当前国内大模型、AI应用、AI基础设施三层架构格局。',
  },
  {
    date: '2026-03-27',
    time: '19:12',
    type: '视频',
    content: '李永乐讲 DeepSeek 背后的 MoE 架构原理，用类比方式把混合专家模型讲得相当清楚。',
  },
  {
    date: '2026-03-26',
    time: '22:05',
    type: '播客',
    content: '硅谷 101 × 张俊林：大模型的下一个突破口在哪里？重点讨论了推理能力与世界模型。',
  },
  {
    date: '2026-03-25',
    time: '20:44',
    type: '书',
    content: '《置身事内》第二章：地方政府的融资逻辑，土地财政与城投债的关系梳理得很通透。',
  },
  {
    date: '2026-03-24',
    time: '15:20',
    type: '文章',
    content: '黄仁勋 GTC 2025 演讲全文，重点在 Blackwell 架构与 Physical AI 的战略布局。',
  },
]
