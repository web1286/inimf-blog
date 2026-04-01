import { useState } from 'react';
import { useRouter } from 'next/router';

export default function SearchBox() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // 跳转到搜索页，这里暂时跳转到 posts 页面
      // 后续可以改成 /search?q=xxx
      router.push('/posts');
    }
  };

  return (
    <form onSubmit={handleSearch} className="search-box">
      <input
        type="text"
        placeholder="搜索文章、事件、作者..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />
      <button type="submit" className="search-button" aria-label="搜索">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
      </button>
    </form>
  );
}
