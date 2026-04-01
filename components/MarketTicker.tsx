import { getMarketData, MarketData } from '../data/market-data'

export default function MarketTicker() {
  const marketData = getMarketData()

  // 根据涨跌设置颜色
  const getChangeColor = (change: string) => {
    if (change.startsWith('+')) return 'ticker-change-up'
    if (change.startsWith('-')) return 'ticker-change-down'
    return 'ticker-change-flat'
  }

  return (
    <div className="market-ticker-compact">
      {/* 第一行：全球指数（前4个） */}
      <div className="ticker-row">
        <div className="ticker-label">全球指数</div>
        {marketData.indices.slice(0, 4).map((item, i) => (
          <div key={i} className="ticker-item">
            <span className="ticker-name">{item.name}</span>
            <span className="ticker-value">{item.value}</span>
            <span className={`ticker-change ${getChangeColor(item.change)}`}>
              {item.change} <span className="ticker-change-percent">({item.changePercent})</span>
            </span>
          </div>
        ))}
      </div>

      {/* 第二行：全球指数（后2个）+ 美债 */}
      <div className="ticker-row">
        <div className="ticker-label">全球指数</div>
        {marketData.indices.slice(4).map((item, i) => (
          <div key={i} className="ticker-item">
            <span className="ticker-name">{item.name}</span>
            <span className="ticker-value">{item.value}</span>
            <span className={`ticker-change ${getChangeColor(item.change)}`}>
              {item.change} <span className="ticker-change-percent">({item.changePercent})</span>
            </span>
          </div>
        ))}
        {marketData.bonds.map((item, i) => (
          <div key={`bond-${i}`} className="ticker-item">
            <span className="ticker-name">{item.name}</span>
            <span className="ticker-yield">{item.yield}</span>
            <span className={`ticker-change ${getChangeColor(item.change)}`}>{item.change}</span>
          </div>
        ))}
      </div>

      {/* 第三行：大宗商品（黄金、石油） */}
      <div className="ticker-row">
        <div className="ticker-label">大宗商品</div>
        {marketData.commodities.map((item, i) => (
          <div key={i} className="ticker-item">
            <span className="ticker-name">{item.name}</span>
            <span className="ticker-price">${item.price}</span>
            <span className={`ticker-change ${getChangeColor(item.change)}`}>
              {item.change} {item.changePercent && `(${item.changePercent})`}
            </span>
          </div>
        ))}
      </div>

      {/* 第四行：数字货币（比特币、以太坊）+ 美元指数 */}
      <div className="ticker-row">
        <div className="ticker-label">数字货币</div>
        {marketData.crypto.map((item, i) => (
          <div key={i} className="ticker-item">
            <span className="ticker-name">{item.name}</span>
            <span className="ticker-price">${item.price}</span>
            <span className={`ticker-change ${getChangeColor(item.change)}`}>
              {item.change} {item.changePercent && `(${item.changePercent})`}
            </span>
          </div>
        ))}
        {/* 美元指数 */}
        <div className="ticker-item">
          <span className="ticker-name">美元指数</span>
          <span className="ticker-value">104.23</span>
          <span className={`ticker-change ${getChangeColor('+0.12')}`}>
            +0.12 <span className="ticker-change-percent">(+0.12%)</span>
          </span>
        </div>
      </div>

      <div className="ticker-updated">
        更新于: {new Date(marketData.updatedAt).toLocaleString('zh-CN', {
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </div>
    </div>
  )
}
