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

// 示例静态数据（后续用 GitHub Actions 动态更新）
export const STATIC_MARKET_DATA = {
  updatedAt: new Date().toISOString(),

  // 全球指数（13个）
  indices: [
    { name: '纳斯达克', value: '16,345.78', change: '+123.45', changePercent: '+0.76%' },
    { name: '道琼斯', value: '38,901.12', change: '+98.34', changePercent: '+0.25%' },
    { name: '富时100', value: '7,890.34', change: '+45.67', changePercent: '+0.58%' },
    { name: '标普500', value: '5,234.56', change: '+45.23', changePercent: '+0.87%' },
    { name: '法国CAC', value: '7,234.56', change: '+34.56', changePercent: '+0.48%' },
    { name: '德国DAX', value: '18,123.45', change: '+89.12', changePercent: '+0.49%' },
    { name: '上证指数', value: '3,067.23', change: '-18.45', changePercent: '-0.60%' },
    { name: '创业板指', value: '1,823.45', change: '-12.34', changePercent: '-0.67%' },
    { name: '科创指数', value: '756.78', change: '-5.67', changePercent: '-0.74%' },
    { name: '恒生指数', value: '16,543.21', change: '+125.67', changePercent: '+0.76%' },
    { name: '新加坡指数', value: '3,234.56', change: '+23.45', changePercent: '+0.73%' },
    { name: '日经225', value: '38,567.89', change: '+234.56', changePercent: '+0.61%' },
    { name: 'ASX200', value: '7,890.12', change: '+56.78', changePercent: '+0.72%' },
  ] as IndexData[],

  // 美债收益率（3个）
  bonds: [
    { name: '美债2年', yield: '4.32%', change: '+0.03%' },
    { name: '美债5年', yield: '4.15%', change: '+0.02%' },
    { name: '美债10年', yield: '4.08%', change: '+0.01%' },
  ] as BondData[],

  // 大宗商品（6个）
  commodities: [
    { name: 'WTI原油期', price: '78.45', change: '-0.56', changePercent: '-0.71%' },
    { name: '原油现货', price: '78.23', change: '-0.52', changePercent: '-0.66%' },
    { name: '黄金期货', price: '2,356.78', change: '+15.67', changePercent: '+0.67%' },
    { name: '黄金现货', price: '2,345.67', change: '+12.34', changePercent: '+0.53%' },
    { name: '白银期货', price: '27.89', change: '+0.34', changePercent: '+1.23%' },
    { name: '白银现货', price: '27.56', change: '+0.31', changePercent: '+1.14%' },
  ] as CommodityData[],

  // 数字货币（3个）
  crypto: [
    { name: '比特币', price: '67,890.12', change: '+1,234.56', changePercent: '+1.85%' },
    { name: '以太坊', price: '3,456.78', change: '+89.23', changePercent: '+2.65%' },
    { name: 'Solana', price: '178.45', change: '+12.34', changePercent: '+7.43%' },
  ] as CryptoData[],

  // 汇率（5个）
  forex: [
    { name: '美元/港元', price: '7.8234', change: '+0.0012', changePercent: '+0.02%' },
    { name: '美元/离岸人民币', price: '7.2456', change: '-0.0034', changePercent: '-0.05%' },
    { name: '美元/日元', price: '149.56', change: '+0.23', changePercent: '+0.15%' },
    { name: '欧元指数', price: '107.89', change: '+0.12', changePercent: '+0.11%' },
    { name: '美元指数', price: '104.23', change: '+0.12', changePercent: '+0.12%' },
  ] as ForexData[],
}

// 获取市场数据（函数形式，便于后续动态替换）
export function getMarketData() {
  return STATIC_MARKET_DATA
}
