import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { formatDistanceToNow, parseISO } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { EVENTS } from '../data/events'
import config from '../blog.config'

export default function EventsPage() {
  // 重要事件按时间线正序（过去→现在→未来）
  const displayEvents = [...EVENTS].sort((a, b) => a.datetime.localeCompare(b.datetime))

  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <>
      <Head>
        <title>重要事件 - {config.title}</title>
        <meta name="description" content="追踪全球重要事件与发展轨迹" />
      </Head>

      <Layout title="重要事件" hideSidebar>
        <div className="events-page">
          <div className="events-page-header">
            <h1 className="events-page-title">重要事件</h1>
            <p className="events-page-desc">追踪全球重要事件与发展轨迹</p>
          </div>

          <div className="events-timeline">
            {displayEvents.map((ev, i) => {
              const relTime = mounted
                ? formatDistanceToNow(parseISO(ev.datetime), { addSuffix: true, locale: zhCN })
                : ''
              return (
                <div key={i} className="events-timeline-item">
                  <div className="events-item-icon">
                    <span className="events-dot" />
                  </div>
                  <div className="events-item-content">
                    <div className="events-meta">
                      <time className="events-datetime">{ev.datetime.slice(0, 10)}</time>
                      <span className="events-reltime">{relTime}</span>
                      {ev.status && (
                        <span className={`ev-status-tag ev-status-${ev.status === '突发重大' ? 'alert' : ev.status === '持续发酵' ? 'ongoing' : 'pending'}`}>
                          {ev.status}
                        </span>
                      )}
                    </div>
                    <h3 className="events-title">{ev.title}</h3>
                    {ev.content && <p className="events-content">{ev.content}</p>}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} }
}
