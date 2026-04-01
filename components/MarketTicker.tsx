import { getMarketData, MarketData } from '../data/market-data'

export default function MarketTicker() {
  const marketData = getMarketData()

  const getChangeColor = (change: string) => {
    if (change.startsWith('+')) return 'ticker-up'
    if (change.startsWith('-')) return 'ticker-down'
    return 'ticker-flat'
  }

  return (
    <div className="market-ticker-clean">
      <div className="ticker-header">
        <span className="ticker-icon">📊</span>
        <span className="ticker-title">市场动态</span>
        <span className="ticker-time">{new Date(marketData.updatedAt).toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</span>
      </div>
      
      <table className="ticker-table">
        <tbody>
          {/* 全球指数 */}
          <tr>
            <td className="ticker-cat" rowSpan={2}>全球指数</td>
            {marketData.indices.slice(0, 3).map((item, i) => (
              <td key={i} className="ticker-cell">
                <span className="ticker-name">{item.name}</span>
                <span className="ticker-val">{item.value}</span>
                <span className={`ticker-chg ${getChangeColor(item.change)}`}>{item.changePercent}</span>
              </td>
            ))}
          </tr>
          <tr>
            {marketData.indices.slice(3).map((item, i) => (
              <td key={i} className="ticker-cell">
                <span className="ticker-name">{item.name}</span>
                <span className="ticker-val">{item.value}</span>
                <span className={`ticker-chg ${getChangeColor(item.change)}`}>{item.changePercent}</span>
              </td>
            ))}
            {/* 补足空位 */}
            <td className="ticker-cell empty"></td>
          </tr>
          
          {/* 美债收益率 */}
          <tr>
            <td className="ticker-cat">美债</td>
            {marketData.bonds.map((item, i) => (
              <td key={i} className="ticker-cell">
                <span className="ticker-name">{item.name}</span>
                <span className="ticker-val">{item.yield}</span>
                <span className={`ticker-chg ${getChangeColor(item.change)}`}>{item.change}</span>
              </td>
            ))}
          </tr>
          
          {/* 大宗商品 */}
          <tr>
            <td className="ticker-cat">商品</td>
            {marketData.commodities.map((item, i) => (
              <td key={i} className="ticker-cell">
                <span className="ticker-name">{item.name}</span>
                <span className="ticker-val">${item.price}</span>
                <span className={`ticker-chg ${getChangeColor(item.change)}`}>{item.changePercent || item.change}</span>
              </td>
            ))}
            <td className="ticker-cell empty"></td>
          </tr>
          
          {/* 数字货币 + 美元 */}
          <tr>
            <td className="ticker-cat">数字</td>
            {marketData.crypto.map((item, i) => (
              <td key={i} className="ticker-cell">
                <span className="ticker-name">{item.name}</span>
                <span className="ticker-val">${item.price}</span>
                <span className={`ticker-chg ${getChangeColor(item.change)}`}>{item.changePercent}</span>
              </td>
            ))}
            <td className="ticker-cell">
              <span className="ticker-name">美元指数</span>
              <span className="ticker-val">104.23</span>
              <span className="ticker-chg ticker-up">+0.12%</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
