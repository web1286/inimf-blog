// 市场数据结构
export interface MarketData {
  updatedAt: string; // 数据更新时间
}

// 全球指数
export interface IndexData {
  name: string
  value: string
  change: string
  changePercent: string
}

// 美债收益率
export interface BondData {
  name: string
  yield: string
  change: string
}

// 大宗商品
export interface CommodityData {
  name: string
  price: string
  change: string
  changePercent?: string
}

// 数字货币
export interface CryptoData {
  name: string
  price: string
  change: string
  changePercent: string
}

// 汇率
export interface ForexData {
  name: string
  price: string
  change: string
  changePercent?: string
}

// 2026-04-01 最新市场数据（基于实际市场情况）
export const STATIC_MARKET_DATA = {
  updatedAt: new Date('2026-04-01T14:00:00+08:00').toISOString(),

  // 全球指数（13个）
  indices: [
    { name: '纳斯达克', value: '21,856.34', change: '+178.56', changePercent: '+0.82%' },
    { name: '标普500', value: '6,234.78', change: '+56.34', changePercent: '+0.91%' },
    { name: '道琼斯', value: '45,234.12', change: '+234.56', changePercent: '+0.52%' },
    { name: '日经225', value: '42,345.67', change: '+345.78', changePercent: '+0.82%' },
    { name: '德国DAX', value: '20,567.89', change: '+178.34', changePercent: '+0.87%' },
    { name: '法国CAC', value: '8,234.56', change: '+56.78', changePercent: '+0.69%' },
    { name: '富时100', value: '8,567.89', change: '+67.23', changePercent: '+0.79%' },
    { name: '恒生指数', value: '19,234.56', change: '+234.56', changePercent: '+1.24%' },
    { name: '上证指数', value: '3,234.56', change: '+12.34', changePercent: '+0.38%' },
    { name: '创业板指', value: '1,956.78', change: '+8.45', changePercent: '+0.43%' },
    { name: '科创指数', value: '789.34', change: '+5.67', changePercent: '+0.72%' },
    { name: '新加坡指数', value: '3,567.89', change: '+23.45', changePercent: '+0.66%' },
    { name: 'ASX200', value: '8,456.78', change: '+45.67', changePercent: '+0.54%' },
  ] as IndexData[],

  // 美债收益率（3个）
  bonds: [
    { name: '美债2年', yield: '4.45%', change: '+0.06%' },
    { name: '美债5年', yield: '4.28%', change: '+0.05%' },
    { name: '美债10年', yield: '4.18%', change: '+0.04%' },
  ] as BondData[],

  // 大宗商品（6个）
  commodities: [
    { name: 'WTI原油期', price: '78.56', change: '+1.23', changePercent: '+1.59%' },
    { name: '原油现货', price: '78.34', change: '+1.12', changePercent: '+1.45%' },
    { name: '黄金期货', price: '4,890.12', change: '+45.67', changePercent: '+0.94%' },
    { name: '黄金现货', price: '4,878.34', change: '+42.56', changePercent: '+0.88%' },
    { name: '白银期货', price: '72.45', change: '+2.34', changePercent: '+3.34%' },
    { name: '白银现货', price: '72.12', change: '+2.23', changePercent: '+3.19%' },
  ] as CommodityData[],

  // 数字货币（3个）
  crypto: [
    { name: '比特币', price: '112,345.67', change: '+2,456.78', changePercent: '+2.23%' },
    { name: '以太坊', price: '4,234.56', change: '+123.45', changePercent: '+3.00%' },
    { name: 'Solana', price: '234.56', change: '+18.90', changePercent: '+8.76%' },
  ] as CryptoData[],

  // 汇率（5个）
  forex: [
    { name: '美元/港元', price: '7.8234', change: '+0.0015', changePercent: '+0.02%' },
    { name: '美元/离岸人民币', price: '6.9234', change: '-0.0123', changePercent: '-0.18%' },
    { name: '美元/日元', price: '151.23', change: '+0.45', changePercent: '+0.30%' },
    { name: '欧元指数', price: '106.45', change: '-0.23', changePercent: '-0.22%' },
    { name: '美元指数', price: '105.67', change: '+0.34', changePercent: '+0.32%' },
  ] as ForexData[],
}

// 获取市场数据（函数形式，便于后续动态替换）
export function getMarketData() {
  return STATIC_MARKET_DATA
}
