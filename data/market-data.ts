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

// 示例静态数据（2026-04-01合理估算，后续用 GitHub Actions 动态更新）
export const STATIC_MARKET_DATA = {
  updatedAt: new Date('2026-04-01T12:00:00+08:00').toISOString(),

  // 全球指数（13个）
  indices: [
    { name: '纳斯达克', value: '18,345.78', change: '+123.45', changePercent: '+0.68%' },
    { name: '道琼斯', value: '42,901.12', change: '+98.34', changePercent: '+0.23%' },
    { name: '富时100', value: '8,190.34', change: '+45.67', changePercent: '+0.56%' },
    { name: '标普500', value: '5,834.56', change: '+45.23', changePercent: '+0.78%' },
    { name: '法国CAC', value: '7,634.56', change: '+34.56', changePercent: '+0.45%' },
    { name: '德国DAX', value: '19,123.45', change: '+89.12', changePercent: '+0.47%' },
    { name: '上证指数', value: '3,045.23', change: '-12.45', changePercent: '-0.41%' },
    { name: '创业板指', value: '1,856.45', change: '-8.34', changePercent: '-0.45%' },
    { name: '科创指数', value: '723.78', change: '-6.67', changePercent: '-0.91%' },
    { name: '恒生指数', value: '18,543.21', change: '+125.67', changePercent: '+0.68%' },
    { name: '新加坡指数', value: '3,434.56', change: '+23.45', changePercent: '+0.69%' },
    { name: '日经225', value: '40,567.89', change: '+234.56', changePercent: '+0.58%' },
    { name: 'ASX200', value: '8,190.12', change: '+56.78', changePercent: '+0.70%' },
  ] as IndexData[],

  // 美债收益率（3个）
  bonds: [
    { name: '美债2年', yield: '4.35%', change: '+0.04%' },
    { name: '美债5年', yield: '4.18%', change: '+0.03%' },
    { name: '美债10年', yield: '4.10%', change: '+0.02%' },
  ] as BondData[],

  // 大宗商品（6个）
  commodities: [
    { name: 'WTI原油期', price: '72.45', change: '-0.56', changePercent: '-0.77%' },
    { name: '原油现货', price: '72.23', change: '-0.52', changePercent: '-0.71%' },
    { name: '黄金期货', price: '4,567.78', change: '+18.67', changePercent: '+0.41%' },
    { name: '黄金现货', price: '4,556.67', change: '+15.34', changePercent: '+0.34%' },
    { name: '白银期货', price: '28.89', change: '+0.34', changePercent: '+1.19%' },
    { name: '白银现货', price: '28.56', change: '+0.31', changePercent: '+1.10%' },
  ] as CommodityData[],

  // 数字货币（3个）
  crypto: [
    { name: '比特币', price: '95,890.12', change: '+1,234.56', changePercent: '+1.30%' },
    { name: '以太坊', price: '3,856.78', change: '+89.23', changePercent: '+2.37%' },
    { name: 'Solana', price: '185.45', change: '+12.34', changePercent: '+7.13%' },
  ] as CryptoData[],

  // 汇率（5个）
  forex: [
    { name: '美元/港元', price: '7.8234', change: '+0.0012', changePercent: '+0.02%' },
    { name: '美元/离岸人民币', price: '6.8456', change: '-0.0034', changePercent: '-0.05%' },
    { name: '美元/日元', price: '149.56', change: '+0.23', changePercent: '+0.15%' },
    { name: '欧元指数', price: '107.89', change: '+0.12', changePercent: '+0.11%' },
    { name: '美元指数', price: '104.23', change: '+0.12', changePercent: '+0.12%' },
  ] as ForexData[],
}

// 获取市场数据（函数形式，便于后续动态替换）
export function getMarketData() {
  return STATIC_MARKET_DATA
}
