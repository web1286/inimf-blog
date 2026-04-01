import { getMarketData, MarketData } from '../data/market-data'

export default function MarketTicker() {
  const marketData = getMarketData()

  // 根据涨跌设置颜色
  const getChangeColor = (change: string) => {
    if (change.startsWith('+')) return 'text-green-600' // 港股/国际惯例：涨绿
    if (change.startsWith('-')) return 'text-red-600'   // 跌红
    return 'text-gray-600'
  }

  return (
    <div className="market-ticker">
      <div className="ticker-scroll">
        {/* 全球指数 */}
        {marketData.indices.map((item, i) => (
          <div key={i} className="ticker-item">
            <span className="ticker-name">{item.name}</span>
            <span className="ticker-value">{item.value}</span>
            <span className={`ticker-change ${getChangeColor(item.change)}`}>
              {item.change} <span className="ticker-change-percent">({item.changePercent})</span>
            </span>
          </div>
        ))}

        {/* 分隔符 */}
        <span className="ticker-divider">|</span>

        {/* 美债收益率 */}
        {marketData.bonds.map((item, i) => (
          <div key={i} className="ticker-item">
            <span className="ticker-name">{item.name}</span>
            <span className="ticker-yield">{item.yield}</span>
            <span className={`ticker-change ${getChangeColor(item.change)}`}>
              {item.change}
            </span>
          </div>
        ))}

        {/* 分隔符 */}
        <span className="ticker-divider">|</span>

        {/* 大宗商品 */}
        {marketData.commodities.map((item, i) => (
          <div key={i} className="ticker-item">
            <span className="ticker-name">{item.name}</span>
            <span className="ticker-price">${item.price}</span>
            <span className={`ticker-change ${getChangeColor(item.change)}`}>
              {item.change} {item.changePercent && `(${item.changePercent})`}
            </span>
          </div>
        ))}

        {/* 分隔符 */}
        <span className="ticker-divider">|</span>

        {/* 加密货币 */}
        {marketData.crypto.map((item, i) => (
          <div key={i} className="ticker-item">
            <span className="ticker-name">{item.name}</span>
            <span className="ticker-price">${item.price}</span>
            <span className={`ticker-change ${getChangeColor(item.change)}`}>
              {item.change} {item.changePercent && `(${item.changePercent})`}
            </span>
          </div>
        ))}
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
