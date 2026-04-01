import { useState, useEffect } from 'react'
import { STATIC_MARKET_DATA } from '../data/market-data'

interface MarketData {
  updatedAt: string
  indices: any[]
  commodities: any[]
  crypto: any[]
  forex: any[]
  bonds: any[]
}

export default function MarketTicker() {
  const [marketData, setMarketData] = useState<MarketData>(STATIC_MARKET_DATA)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    // 从 API 获取实时数据
    async function fetchMarketData() {
      setLoading(true)
      setError(false)

      try {
        const response = await fetch('/api/market-data')
        if (!response.ok) {
          throw new Error('获取数据失败')
        }
        const data = await response.json()

        if (data && data.indices) {
          setMarketData(data)
        }
      } catch (err) {
        console.error('获取市场数据失败:', err)
        setError(true)
        // 降级使用静态数据
        setMarketData(STATIC_MARKET_DATA)
      } finally {
        setLoading(false)
      }
    }

    fetchMarketData()

    // 每 5 分钟刷新一次数据
    const interval = setInterval(fetchMarketData, 5 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

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
      value: item.price,
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

  // 折叠功能：首页只显示15个（3行），支持展开
  const displayItems = expanded ? allItems : allItems.slice(0, 15)

  return (
    <div className="market-ticker">
      <div className="ticker-header">
        <span className="ticker-icon">📊</span>
        <span className="ticker-title">市场动态</span>
        <span className="ticker-time">
          {loading && '更新中...'}
          {!loading && error && '✗'}
          {!loading && !error && new Date(marketData.updatedAt).toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>

      <div className="ticker-grid">
        {displayItems.map((item, i) => (
          <div key={i} className="ticker-card">
            <div className="ticker-card-name">{item.name}</div>
            <div className="ticker-card-value">{item.value}</div>
            <div className={`ticker-card-change ${getChangeColor(item.change)}`}>
              {item.change}
            </div>
          </div>
        ))}
      </div>

      {/* 折叠按钮 */}
      {allItems.length > 15 && (
        <button
          className={`ticker-expand-btn ${expanded ? 'expanded' : ''}`}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? '收起' : `展开全部 ${allItems.length} 个指标`}
        </button>
      )}
    </div>
  )
}
