import Link from 'next/link';
import { useState } from 'react';

export default function SidebarNav() {
  const [activeItem, setActiveItem] = useState('articles');

  const navItems = [
    { id: 'articles', label: '浮生八记', icon: '📝', href: '/posts' },
    { id: 'events', label: '重要事件', icon: '📌', href: '/events' },
    { id: 'masters', label: '高手身影', icon: '👤', href: '/masters' },
    { id: 'analytics', label: '数据面板', icon: '📊', href: '/analytics' },
  ];

  return (
    <nav className="sidebar-nav">
      <div className="sidebar-nav-header">
        <span className="sidebar-nav-icon">📚</span>
        <span className="sidebar-nav-title">目录</span>
      </div>
      <div className="sidebar-nav-items">
        {navItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`sidebar-nav-item ${activeItem === item.id ? 'active' : ''}`}
            onClick={() => setActiveItem(item.id)}
          >
            <span className="sidebar-nav-icon">{item.icon}</span>
            <span className="sidebar-nav-label">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
