// 市场数据结构
export interface MarketData {
  updatedAt: string; // 数据更新时间
  indices: {
    name: string
    value: string
    change: string
    changePercent: string
  }[]
  bonds: {
    name: string
    yield: string
    change: string
  }[]
  commodities: {
    name: string
    price: string
    change: string
  }[]
  crypto: {
    name: string
    price: string
    change: string
  }[]
}

// 示例静态数据（后续用 GitHub Actions 动态更新）
export const STATIC_MARKET_DATA: MarketData = {
  updatedAt: new Date().toISOString(),
  indices: [
    { name: '恒生指数', value: '16,543.21', change: '+125.67', changePercent: '+0.76%' },
    { name: '上证指数', value: '3,067.23', change: '-18.45', changePercent: '-0.60%' },
    { name: '标普500', value: '5,234.56', change: '+45.23', changePercent: '+0.87%' },
    { name: '纳斯达克', value: '16,345.78', change: '+123.45', changePercent: '+0.76%' },
    { name: '道琼斯', value: '38,901.12', change: '+98.34', changePercent: '+0.25%' },
  ],
  bonds: [
    { name: '美债2年', yield: '4.32%', change: '+0.03%' },
    { name: '美债5年', yield: '4.15%', change: '+0.02%' },
    { name: '美债10年', yield: '4.08%', change: '+0.01%' },
  ],
  commodities: [
    { name: '黄金', price: '2,345.67', change: '+12.34', changePercent: '+0.53%' },
    { name: '原油', price: '78.45', change: '-0.56', changePercent: '-0.71%' },
  ],
  crypto: [
    { name: '比特币', price: '67,890.12', change: '+1,234.56', changePercent: '+1.85%' },
  ],
}

// 获取市场数据（函数形式，便于后续动态替换）
export function getMarketData(): MarketData {
  return STATIC_MARKET_DATA
}
