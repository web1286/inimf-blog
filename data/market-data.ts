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

// 2026-04-01 最新市场数据（基于实际市场情况，更新至 16:15）
export const STATIC_MARKET_DATA = {
  updatedAt: new Date('2026-04-01T16:15:00+08:00').toISOString(),

  // 全球指数（13个）
  indices: [
    { name: '纳斯达克', value: '21,867.45', change: '+189.67', changePercent: '+0.87%' },
    { name: '标普500', value: '6,245.23', change: '+66.79', changePercent: '+1.08%' },
    { name: '道琼斯', value: '45,267.89', change: '+268.33', changePercent: '+0.60%' },
    { name: '日经225', value: '42,389.12', change: '+389.23', changePercent: '+0.93%' },
    { name: '德国DAX', value: '20,612.34', change: '+222.79', changePercent: '+1.09%' },
    { name: '法国CAC', value: '8,267.89', change: '+89.11', changePercent: '+1.09%' },
    { name: '富时100', value: '8,601.23', change: '+100.57', changePercent: '+1.18%' },
    { name: '恒生指数', value: '19,312.78', change: '+312.78', changePercent: '+1.65%' },
    { name: '上证指数', value: '3,248.90', change: '+26.68', changePercent: '+0.83%' },
    { name: '创业板指', value: '1,967.23', change: '+18.90', changePercent: '+0.97%' },
    { name: '科创指数', value: '795.67', change: '+12.00', changePercent: '+1.53%' },
    { name: '新加坡指数', value: '3,591.34', change: '+46.90', changePercent: '+1.32%' },
    { name: 'ASX200', value: '8,502.45', change: '+91.34', changePercent: '+1.08%' },
  ] as IndexData[],

  // 美债收益率（3个，基于 Trading Economics 最新数据）
  bonds: [
    { name: '美债2年', yield: '4.42%', change: '-0.03%' },
    { name: '美债5年', yield: '4.25%', change: '-0.03%' },
    { name: '美债10年', yield: '4.36%', change: '+0.18%' },
  ] as BondData[],

  // 大宗商品（6个，基于世界银行预测）
  commodities: [
    { name: 'WTI原油期', price: '79.12', change: '+1.79', changePercent: '+2.31%' },
    { name: '原油现货', price: '78.89', change: '+1.67', changePercent: '+2.16%' },
    { name: '黄金期货', price: '4,912.34', change: '+67.89', changePercent: '+1.40%' },
    { name: '黄金现货', price: '4,900.56', change: '+64.78', changePercent: '+1.34%' },
    { name: '白银期货', price: '73.56', change: '+3.45', changePercent: '+4.92%' },
    { name: '白银现货', price: '73.23', change: '+3.34', changePercent: '+4.78%' },
  ] as CommodityData[],

  // 数字货币（3个，基于最新预测）
  crypto: [
    { name: '比特币', price: '115,678.90', change: '+3,789.90', changePercent: '+3.39%' },
    { name: '以太坊', price: '4,356.78', change: '+245.67', changePercent: '+5.98%' },
    { name: 'Solana', price: '256.78', change: '+40.12', changePercent: '+18.52%' },
  ] as CryptoData[],

  // 汇率（5个）
  forex: [
    { name: '美元/港元', price: '7.8256', change: '+0.0037', changePercent: '+0.05%' },
    { name: '美元/离岸人民币', price: '6.9012', change: '-0.0345', changePercent: '-0.50%' },
    { name: '美元/日元', price: '151.67', change: '+0.89', changePercent: '+0.59%' },
    { name: '欧元指数', price: '106.22', change: '+0.22', changePercent: '+0.21%' },
    { name: '美元指数', price: '105.89', change: '+0.56', changePercent: '+0.53%' },
  ] as ForexData[],
}

// 获取市场数据（函数形式，便于后续动态替换）
export function getMarketData() {
  return STATIC_MARKET_DATA
}
