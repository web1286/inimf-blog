import { useState, useEffect, useCallback } from 'react'
import Head from 'next/head'
import Link from 'next/link'

// 密码的 SHA-256 哈希值（密码：inimf2026）
// 如需修改密码，用 JS 执行：await crypto.subtle.digest('SHA-256', new TextEncoder().encode('新密码'))，然后转十六进制替换此处
const PASSWORD_HASH = '906e66d9e79d4fc49cf335381945cc7522ec2cbe78e17321449b123f1a221210'

async function sha256(str: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str))
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

// 市场数据面板组件
function MarketDataPanel() {
  const [marketData, setMarketData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data/market-data.json')
      .then(res => res.json())
      .then(data => {
        setMarketData(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('加载市场数据失败:', err)
        setLoading(false)
      })
  }, [])

  const renderSection = (title: string, items: any[]) => {
    if (!items || items.length === 0) return null

    return (
      <div>
        <h3 style={{
          fontSize: '13px',
          fontWeight: 600,
          color: '#64748b',
          marginBottom: '12px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}>{title}</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '12px',
        }}>
          {items.map((item, idx) => {
            const isUp = item.change_percent?.startsWith('+') || item.changePercent?.startsWith('+')
            const value = item.value || item.change_percent ? item.value : item.change_percent
            const change = item.change_percent || item.changePercent || '0.00%'

            return (
              <div key={idx} style={{
                background: '#f8fafc',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
              }}>
                <div style={{
                  fontSize: '12px',
                  color: '#64748b',
                  marginBottom: '4px',
                }}>{item.name}</div>
                <div style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#1e293b',
                  marginBottom: '4px',
                }}>{value || 'N/A'}</div>
                <div style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: isUp ? '#ef4444' : '#22c55e',
                }}>{change}</div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div style={{
        background: '#fff',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        padding: '24px',
        textAlign: 'center',
        color: '#64748b',
      }}>
        加载市场数据中...
      </div>
    )
  }

  if (!marketData) {
    return (
      <div style={{
        background: '#fff',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        padding: '24px',
        textAlign: 'center',
        color: '#ef4444',
      }}>
        无法加载市场数据
      </div>
    )
  }

  return (
    <div style={{
      background: '#fff',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      padding: '20px',
      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        paddingBottom: '16px',
        borderBottom: '1px solid #e2e8f0',
      }}>
        <div>
          <h2 style={{
            fontSize: '18px',
            fontWeight: 700,
            color: '#1e293b',
            marginBottom: '4px',
          }}>全球市场数据</h2>
          <p style={{
            fontSize: '13px',
            color: '#64748b',
            margin: 0,
          }}>
            更新时间: {marketData.updatedAt || marketData.timestamp || '未知'}
          </p>
        </div>
        <span style={{
          fontSize: '12px',
          color: '#22c55e',
          background: '#f0fdf4',
          padding: '4px 12px',
          borderRadius: '20px',
          fontWeight: 500,
        }}>实时</span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
      }}>
        {renderSection('全球股指', marketData.indices)}
        {renderSection('国债收益率', marketData.treasury_bonds)}
        {renderSection('大宗商品', marketData.commodities)}
        {renderSection('加密货币', marketData.crypto)}
        {renderSection('汇率', marketData.forex)}
      </div>
    </div>
  )
}

export default function Analytics() {
  const [authed, setAuthed] = useState(false)
  const [input, setInput] = useState('')
  const [error, setError] = useState('')
  const [checking, setChecking] = useState(false)

  // 检查 sessionStorage 中是否已验证
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('analytics_authed')
      if (saved === 'true') {
        setAuthed(true)
      }
    }
  }, [])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    setChecking(true)
    setError('')

    const hash = await sha256(input.trim())
    if (hash === PASSWORD_HASH) {
      sessionStorage.setItem('analytics_authed', 'true')
      setAuthed(true)
    } else {
      setError('密码错误，请重试')
      setInput('')
    }
    setChecking(false)
  }, [input])

  const handleLogout = () => {
    sessionStorage.removeItem('analytics_authed')
    setAuthed(false)
    setInput('')
  }

  return (
    <>
      <Head>
        <title>数据面板 · inimf.com</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      {!authed ? (
        /* ===== 密码输入页 ===== */
        <div style={{
          minHeight: '100vh',
          background: '#f0f2f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif',
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '48px 40px',
            width: '360px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
            textAlign: 'center',
          }}>
            {/* 图标 */}
            <div style={{
              width: '56px', height: '56px',
              background: '#2563eb',
              borderRadius: '14px',
              margin: '0 auto 24px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '24px',
            }}>
              📊
            </div>
            <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#1a1d21', marginBottom: '6px' }}>
              数据面板
            </h1>
            <p style={{ fontSize: '14px', color: '#8896a5', marginBottom: '32px' }}>
              inimf.com · 仅站长可见
            </p>

            <form onSubmit={handleSubmit}>
              <input
                type="password"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="输入访问密码"
                autoFocus
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: error ? '1.5px solid #ef4444' : '1.5px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '15px',
                  outline: 'none',
                  marginBottom: error ? '8px' : '16px',
                  color: '#1a1d21',
                  background: '#fafbfc',
                  transition: 'border-color 0.15s',
                }}
                onFocus={(e) => { if (!error) e.target.style.borderColor = '#2563eb' }}
                onBlur={(e) => { if (!error) e.target.style.borderColor = '#e2e8f0' }}
              />
              {error && (
                <p style={{ fontSize: '13px', color: '#ef4444', marginBottom: '16px', textAlign: 'left' }}>
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={checking || !input.trim()}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: checking || !input.trim() ? '#93c5fd' : '#2563eb',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: checking || !input.trim() ? 'not-allowed' : 'pointer',
                  transition: 'background 0.15s',
                }}
              >
                {checking ? '验证中...' : '进入面板'}
              </button>
            </form>

            <div style={{ marginTop: '24px' }}>
              <Link href="/" style={{ fontSize: '13px', color: '#8896a5', textDecoration: 'none' }}>
                ← 返回首页
              </Link>
            </div>
          </div>
        </div>
      ) : (
        /* ===== 已登录：数据面板 ===== */
        <div style={{
          minHeight: '100vh',
          background: '#f0f2f5',
          fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif',
        }}>
          {/* 顶部导航 */}
          <header style={{
            background: '#fff',
            borderBottom: '1px solid #e2e8f0',
            padding: '0 24px',
            height: '56px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 100,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '18px' }}>📊</span>
              <span style={{ fontWeight: 700, fontSize: '16px', color: '#1a1d21' }}>数据面板</span>
              <span style={{
                fontSize: '12px',
                color: '#22c55e',
                background: '#f0fdf4',
                padding: '2px 8px',
                borderRadius: '20px',
                fontWeight: 500,
              }}>● 实时</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <a
                href="https://cloud.umami.is"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '13px',
                  color: '#2563eb',
                  textDecoration: 'none',
                  padding: '6px 12px',
                  border: '1px solid #2563eb',
                  borderRadius: '6px',
                }}
              >
                Umami 控制台 ↗
              </a>
              <Link href="/" style={{ fontSize: '13px', color: '#4a5568', textDecoration: 'none' }}>
                首页
              </Link>
              <button
                onClick={handleLogout}
                style={{
                  fontSize: '13px',
                  color: '#8896a5',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '6px 0',
                }}
              >
                退出
              </button>
            </div>
          </header>

          {/* 主内容 */}
          <main style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* 市场数据卡片 */}
            <MarketDataPanel />

            {/* Umami Dashboard iframe 嵌入 */}
            <div style={{
              background: '#fff',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              overflow: 'hidden',
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            }}>
              <iframe
                src="https://cloud.umami.is/share/xAfV1LGeC6I9HobB"
                style={{
                  width: '100%',
                  height: 'calc(100vh - 420px)',
                  minHeight: '500px',
                  border: 'none',
                  display: 'block',
                }}
                title="inimf.com 数据面板"
                loading="lazy"
              />
            </div>
          </main>
        </div>
      )}
    </>
  )
}
