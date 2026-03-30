export interface EventItem {
  datetime: string  // ISO 8601，如 "2026-03-30T14:00:00"
  title: string
  content?: string
}

export const EVENTS: EventItem[] = [
  {
    datetime: '2026-03-30T10:15:00',
    title: 'OpenAI 发布 GPT-4.5 Turbo',
    content: '推理速度提升 40%，上下文窗口扩展至 256K，多模态能力全面升级。',
  },
  {
    datetime: '2026-03-29T16:30:00',
    title: '英伟达 GTC 2026 发布 Blackwell Ultra',
    content: 'GB300 架构，单卡 HBM4 内存 288GB，AI 训练性能较上代翻倍。',
  },
  {
    datetime: '2026-03-28T09:00:00',
    title: '字节跳动 Seed1.5-VL 多模态模型开源',
    content: '图文理解能力接近 GPT-4o，推理效率显著优化，Apache 2.0 协议。',
  },
  {
    datetime: '2026-03-27T14:00:00',
    title: '国内 AI Agent 赛道融资超 20 亿',
    content: '一周内多家 Agent 初创完成融资，Pre-A 轮估值中位数约 2 亿人民币。',
  },
  {
    datetime: '2026-03-26T11:45:00',
    title: 'Anthropic Claude 3.7 Sonnet 正式上线',
    content: '推出「扩展思维」模式，复杂推理任务成功率较 3.5 提升 23%。',
  },
  {
    datetime: '2026-03-25T08:00:00',
    title: '特斯拉 FSD v13 国内推送',
    content: '城区道路端到端自动驾驶能力大幅提升，接管率下降至历史最低。',
  },
]
