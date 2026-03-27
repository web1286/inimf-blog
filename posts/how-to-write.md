---
title: 如何写一篇新文章
date: '2026-03-27'
summary: 关于如何在这个博客添加新文章的操作说明。
tags:
  - 指南
---

## 写文章的方式

这个博客用 Markdown 格式写文章。每篇文章是 `posts/` 文件夹里的一个 `.md` 文件。

## 文件命名

文件名就是文章的 URL。比如：

- `posts/hello-world.md` → `www.inimf.com/posts/hello-world`
- `posts/my-trip-to-beijing.md` → `www.inimf.com/posts/my-trip-to-beijing`

建议用英文或拼音命名，不用空格，用 `-` 连接。

## 文章头部信息

每篇文章开头需要写这些信息：

```
---
title: 文章标题
date: '2026-03-27'
summary: 一句话描述，显示在首页列表里
tags:
  - 标签1
  - 标签2
---
```

## 正文写法

正文支持标准 Markdown 语法：

- `## 二级标题`
- `**粗体**`、`*斜体*`
- `[链接文字](URL)`
- `` `行内代码` ``
- 代码块、表格、引用块等

## 发布流程

1. 在 `posts/` 文件夹新建一个 `.md` 文件
2. 写好内容并保存
3. 提交到 GitHub（`git add . && git commit -m "新文章" && git push`）
4. Vercel 自动检测到更新，约 1 分钟后网站更新

就这么简单 ✅
