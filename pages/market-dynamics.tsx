import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import Layout from '../components/Layout'
import MarketTicker from '../components/MarketTicker'

interface MarketData {
  updatedAt: string
  indices: {
    name: string
    value: string
    change: string
    changePercent: string
  }[]
  commodities: {
    name: string
    price: string
    change: string
    changePercent?: string
  }[]
  crypto: {
    name: string
    price: string
    change: string
    changePercent: string
  }[]
  forex: {
    name: string
    price: string
    change: string
    changePercent?: string
  }[]
  bonds: {
    name: string
    yield: string
    change: string
  }[]
  source?: string
}

export default function MarketDynamics() {
  const [marketData, setMarketData] = useState<MarketData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function fetchMarketData() {
      setLoading(true)
      setError(false)

      try {
        const response = await fetch('/data/market-data.json')
        if (!response.ok) {
          throw new Error('获取数据失败')
        }
        const data = await response.json()
        setMarketData(data)
      } catch (err) {
        console.error('获取市场数据失败:', err)
        setError(true)
        // 尝试使用静态数据
        try {
          const { STATIC_MARKET_DATA } = await import('../data/market-data')
          setMarketData(STATIC_MARKET_DATA)
        } catch {
          // 完全不处理异常，就留 null
        }
      } finally {
        setLoading(false)
      }
    }

    fetchMarketData()
    // 每10分钟刷新一次
    const interval = setInterval(fetchMarketData, 10 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const getChangeColor = (change: string) => {
    if (change.startsWith('+') || (parseFloat(change) > 0 && !isNaN(parseFloat(change)))) return 'text-green-600'
    if (change.startsWith('-') || (parseFloat(change) < 0 && !isNaN(parseFloat(change)))) return 'text-red-600'
    return 'text-gray-600'
  }

  const getChangeIcon = (change: string) => {
    if (change.startsWith('+') || (parseFloat(change) > 0 && !isNaN(parseFloat(change)))) return '↑'
    if (change.startsWith('-') || (parseFloat(change) < 0 && !isNaN(parseFloat(change)))) return '↓'
    return '→'
  }

  const renderCard = (title: string, subtitle: string, items: any[], type: 'index' | 'bond' | 'commodity' | 'crypto' | 'forex') => {
    return (
      <div className="market-card">
        <div className="card-header">
          <h2>{title}</h2>
          <p className="card-subtitle">{subtitle}</p>
        </div>
        <div className="card-body">
          {items.length === 0 ? (
            <p className="empty-placeholder">暂无数据</p>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>名称</th>
                  <th>价格 / 收益率</th>
                  <th>涨跌幅</th>
                  <th>变化</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => {
                  const change = type === 'index' ? item.changePercent :
                                type === 'bond' ? item.change :
                                type === 'commodity' ? item.changePercent || item.change || '—' :
                                type === 'crypto' ? item.changePercent :
                                type === 'forex' ? item.changePercent || item.change || '—' : ''
                  const changeNum = change.replace(/[+-%]/g, '')
                  const isPositive = (change.startsWith('+') || (change && !change.startsWith('-') && !isNaN(parseFloat(changeNum)) && parseFloat(changeNum) > 0))

                  return (
                    <tr key={idx}>
                      <td className="item-name">{item.name}</td>
                      <td>
                        <span className="value-main">
                          {type === 'bond' ? `${item.yield}` : 
                           type === 'commodity' ? `${item.price}` :
                           type === 'forex' ? `${item.price}` :
                           type === 'crypto' ? `$${parseFloat(item.price).toLocaleString()}` :
                           `${item.value}`}
                        </span>
                      </td>
                      <td className={`change-cell ${isPositive ? 'positive' : change.startsWith('-') || (change && !isPositive && parseFloat(changeNum) < 0) ? 'negative' : 'neutral'}`}>
                        {change !== 'N/A' && change !== '—' ? (
                          <>
                            <span className="change-icon">{getChangeIcon(change)}</span>
                            <span className="change-value">{change}</span>
                          </>
                        ) : (
                          <span className="change-neutral">—</span>
                        )}
                      </td>
                      <td>
                        {type === 'index' && item.change}
                        {type === 'bond' && `收益率: ${item.yield}`}
                        {(type === 'commodity' || type === 'crypto' || type === 'forex') && item.change}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    )
  }

  return (
    <Layout>
      <div className="market-dynamics-page">
        <header className="page-header">
          <h1 className="page-title">市场动态</h1>
          <p className="page-description">
            实时追踪全球30个关键市场指标：全球指数、美债收益率、大宗商品、数字货币、汇率
          </p>
          {marketData?.updatedAt && (
            <p className="update-time">
              更新时间: {format(new Date(marketData.updatedAt), 'yyyy年MM月dd日 HH:mm', { locale: zhCN })}
              {marketData.source && <span className="data-source"> · 数据源: {marketData.source}</span>}
            </p>
          )}
        </header>

        {/* 顶部滚动Ticker */}
        <section className="ticker-section">
          <div className="section-header">
            <h2>实时行情</h2>
          </div>
          <div className="ticker-container">
            <MarketTicker />
          </div>
          <p className="section-footnote">
            每5分钟自动刷新一次数据。如遇市场剧烈波动，数据可能略有延迟。
          </p>
        </section>

        {/* 详细数据卡片 */}
        {loading ? (
          <div className="loading-section">
            <p>正在加载市场数据...</p>
          </div>
        ) : error ? (
          <div className="error-section">
            <p>数据加载失败，请稍后重试或检查网络连接。</p>
          </div>
        ) : marketData ? (
          <div className="data-grid">
            <div className="grid-col col-2">
              {renderCard(
                '全球指数',
                '纳斯达克、标普500、恒生、上证等13个市场',
                marketData.indices,
                'index'
              )}
            </div>
            <div className="grid-col col-2">
              {renderCard(
                '美债收益率',
                '美国2年/5年/10年国债',
                marketData.bonds,
                'bond'
              )}
            </div>
            <div className="grid-col col-2">
              {renderCard(
                '大宗商品',
                'WTI原油、黄金、白银',
                marketData.commodities,
                'commodity'
              )}
            </div>
            <div className="grid-col col-2">
              {renderCard(
                '数字货币',
                '比特币、以太坊、Solana',
                marketData.crypto,
                'crypto'
              )}
            </div>
            <div className="grid-col col-1">
              {renderCard(
                '汇率',
                '美元指数、人民币、港元、日元',
                marketData.forex,
                'forex'
              )}
            </div>
          </div>
        ) : (
          <div className="error-section">
            <p>无法加载市场数据。请检查 data/market-data.json 文件是否存在。</p>
          </div>
        )}

        {/* 数据说明 */}
        <section className="notes-section">
          <div className="notes-card">
            <h3>数据说明</h3>
            <ul>
              <li>数据每10分钟自动刷新，手动刷新页面也可获取最新数据</li>
              <li>涨跌幅红色表示下跌，绿色表示上涨（中国股市惯例）</li>
              <li>债券收益率单位为%，变化为基点(bp)变化</li>
              <li>大宗商品价格单位为美元/桶(原油)、美元/盎司(金银)</li>
              <li>数字货币价格为美元计价，单位为 USD</li>
              <li>汇率价格为单位美元兑相应货币的数值</li>
            </ul>
          </div>
        </section>
      </div>

      <style jsx>{`
        .market-dynamics-page {
          padding: 1.5rem 0 3rem;
        }

        .page-header {
          margin-bottom: 2.5rem;
        }

        .page-title {
          font-size: 2.2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: #1a1a1a;
        }

        .page-description {
          font-size: 1.1rem;
          line-height: 1.6;
          color: #666;
          margin-bottom: 0.5rem;
        }

        .update-time {
          font-size: 0.9rem;
          color: #999;
          margin-top: 0.25rem;
        }

        .data-source {
          margin-left: 0.75rem;
          color: #1890ff;
        }

        /* 节区样式 */
        .section-header {
          margin-bottom: 1.5rem;
        }

        .section-header h2 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #333;
          border-left: 4px solid #1890ff;
          padding-left: 0.75rem;
        }

        .section-footnote {
          font-size: 0.85rem;
          color: #999;
          margin-top: 0.75rem;
        }

        /* Ticker区域 */
        .ticker-section {
          margin-bottom: 3rem;
        }

        .ticker-container {
          background: #fff;
          border-radius: 8px;
          border: 1px solid #e8e8e8;
          padding: 1rem;
        }

        /* 数据卡片 */
        .data-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .grid-col.col-2 {
          grid-column: span 2;
        }

        .grid-col.col-1 {
          grid-column: span 2;
        }

        @media (min-width: 768px) {
          .data-grid {
            grid-template-columns: repeat(4, 1fr);
          }
          .grid-col.col-2 {
            grid-column: span 2;
          }
          .grid-col.col-1 {
            grid-column: span 4;
          }
        }

        .market-card {
          background: #fff;
          border-radius: 8px;
          border: 1px solid #e8e8e8;
          overflow: hidden;
        }

        .card-header {
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid #e8e8e8;
          background: #fafafa;
        }

        .card-header h2 {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
          color: #333;
        }

        .card-subtitle {
          font-size: 0.9rem;
          color: #666;
        }

        .card-body {
          padding: 1rem 1.5rem;
        }

        /* 表格样式 */
        .data-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.95rem;
        }

        .data-table th {
          text-align: left;
          padding: 0.75rem 0.5rem;
          color: #666;
          font-weight: 500;
          border-bottom: 1px solid #eee;
        }

        .data-table td {
          padding: 0.75rem 0.5rem;
          border-bottom: 1px solid #eee;
        }

        .data-table tr:last-child td {
          border-bottom: none;
        }

        .item-name {
          font-weight: 500;
          color: #333;
        }

        .value-main {
          font-weight: 600;
          color: #1a1a1a;
        }

        /* 涨跌幅样式 */
        .change-cell {
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .change-cell.positive {
          color: #f5222d; /* 红色表示涨(中国惯例) */
        }

        .change-cell.negative {
          color: #52c41a; /* 绿色表示跌(中国惯例) */
        }

        .change-cell.neutral {
          color: #666;
        }

        .change-icon {
          font-size: 0.85rem;
        }

        .change-value {
          font-size: 0.95rem;
        }

        .change-neutral {
          color: #999;
        }

        /* 空状态 */
        .empty-placeholder {
          text-align: center;
          padding: 2rem 1rem;
          color: #999;
          font-style: italic;
        }

        /* 加载与错误状态 */
        .loading-section,
        .error-section {
          text-align: center;
          padding: 3rem 1rem;
          color: #666;
        }

        /* 说明卡片 */
        .notes-section {
          margin-top: 2rem;
        }

        .notes-card {
          background: #f9f9f9;
          border-radius: 8px;
          padding: 1.5rem;
          border-left: 4px solid #1890ff;
        }

        .notes-card h3 {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          color: #333;
        }

        .notes-card ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin: 0;
        }

        .notes-card li {
          margin-bottom: 0.5rem;
          line-height: 1.5;
          color: #666;
        }

        @media (max-width: 768px) {
          .page-title {
            font-size: 1.8rem;
          }
          .data-table {
            font-size: 0.9rem;
          }
          .data-table th,
          .data-table td {
            padding: 0.5rem 0.25rem;
          }
        }
      `}</style>
    </Layout>
  )
}