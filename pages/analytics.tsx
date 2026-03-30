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
          <main style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>

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
                  height: 'calc(100vh - 120px)',
                  minHeight: '700px',
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
