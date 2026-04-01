import { STATIC_MARKET_DATA } from '../data/market-data'

export default function MarketTicker() {
  const marketData = STATIC_MARKET_DATA

  const getChangeColor = (change: string) => {
    if (change.startsWith('+')) return 'ticker-up'
    if (change.startsWith('-')) return 'ticker-down'
    return 'ticker-flat'
  }

  // 合并所有数据,统一格式
  const allItems = [
    ...marketData.indices.map((item: any) => ({
      name: item.name,
      value: item.value,
      change: item.changePercent
    })),
    ...marketData.crypto.map((item: any) => ({
      name: item.name,
      value: item.price,
      change: item.changePercent
    })),
    ...marketData.commodities.map((item: any) => ({
      name: item.name,
      value: `$${item.price}`,
      change: item.changePercent
    })),
    ...marketData.bonds.map((item: any) => ({
      name: item.name,
      value: item.yield,
      change: item.change
    })),
    ...marketData.forex.map((item: any) => ({
      name: item.name,
      value: item.price,
      change: item.changePercent || item.change
    })),
  ]

  return (
    <div className="market-ticker">
      <div className="ticker-header">
        <span className="ticker-icon">📊</span>
        <span className="ticker-title">市场动态</span>
        <span className="ticker-time">{new Date(marketData.updatedAt).toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</span>
      </div>

      <div className="ticker-grid">
        {allItems.map((item, i) => (
          <div key={i} className="ticker-card">
            <div className="ticker-card-name">{item.name}</div>
            <div className="ticker-card-value">{item.value}</div>
            <div className={`ticker-card-change ${getChangeColor(item.change)}`}>
              {item.change}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
