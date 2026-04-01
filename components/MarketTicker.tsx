import { STATIC_MARKET_DATA, IndexData, BondData, CommodityData, CryptoData, ForexData } from '../data/market-data'

export default function MarketTicker() {
  const marketData = STATIC_MARKET_DATA

  const getChangeColor = (change: string) => {
    if (change.startsWith('+')) return 'ticker-up'
    if (change.startsWith('-')) return 'ticker-down'
    return 'ticker-flat'
  }

  return (
    <div className="market-ticker">
      <div className="ticker-header">
        <span className="ticker-icon">📊</span>
        <span className="ticker-title">市场动态</span>
        <span className="ticker-time">{new Date(marketData.updatedAt).toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</span>
      </div>

      <div className="ticker-grid">
        {/* 全球指数 */}
        <div className="ticker-section">
          <h3 className="ticker-section-title">全球指数</h3>
          <div className="ticker-cards">
            {marketData.indices.map((item, i) => (
              <div key={i} className="ticker-card">
                <div className="ticker-card-name">{item.name}</div>
                <div className="ticker-card-value">{item.value}</div>
                <div className={`ticker-card-change ${getChangeColor(item.change)}`}>
                  {item.changePercent}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 美债收益率 */}
        <div className="ticker-section">
          <h3 className="ticker-section-title">美债收益率</h3>
          <div className="ticker-cards">
            {marketData.bonds.map((item, i) => (
              <div key={i} className="ticker-card">
                <div className="ticker-card-name">{item.name}</div>
                <div className="ticker-card-value">{item.yield}</div>
                <div className={`ticker-card-change ${getChangeColor(item.change)}`}>
                  {item.change}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 大宗商品 */}
        <div className="ticker-section">
          <h3 className="ticker-section-title">大宗商品</h3>
          <div className="ticker-cards">
            {marketData.commodities.map((item, i) => (
              <div key={i} className="ticker-card">
                <div className="ticker-card-name">{item.name}</div>
                <div className="ticker-card-value">${item.price}</div>
                <div className={`ticker-card-change ${getChangeColor(item.change)}`}>
                  {item.changePercent || item.change}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 数字货币 */}
        <div className="ticker-section">
          <h3 className="ticker-section-title">数字货币</h3>
          <div className="ticker-cards">
            {marketData.crypto.map((item, i) => (
              <div key={i} className="ticker-card">
                <div className="ticker-card-name">{item.name}</div>
                <div className="ticker-card-value">${item.price}</div>
                <div className={`ticker-card-change ${getChangeColor(item.change)}`}>
                  {item.changePercent}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 汇率 */}
        <div className="ticker-section">
          <h3 className="ticker-section-title">汇率</h3>
          <div className="ticker-cards">
            {marketData.forex.map((item, i) => (
              <div key={i} className="ticker-card">
                <div className="ticker-card-name">{item.name}</div>
                <div className="ticker-card-value">{item.price}</div>
                <div className={`ticker-card-change ${getChangeColor(item.change)}`}>
                  {item.changePercent || item.change}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
