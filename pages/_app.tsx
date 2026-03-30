import type { AppProps } from 'next/app'
import Script from 'next/script'
import '../styles/globals.css'

// Umami 全局类型声明
declare global {
  interface Window {
    umami?: {
      track: (event: string, data?: Record<string, unknown>) => void
    }
  }
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Umami 数据统计 - 追踪所有页面访问 */}
      <Script
        defer
        src="https://cloud.umami.is/script.js"
        data-website-id="c522a8a6-d94f-459f-9c20-864162d66657"
        strategy="afterInteractive"
      />
      <Component {...pageProps} />
    </>
  )
}
