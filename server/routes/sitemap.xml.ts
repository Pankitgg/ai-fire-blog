import { defineEventHandler } from 'h3'

const BASE_URL = 'https://ai-nous.com' // 根据实际域名修改

export default defineEventHandler(async (event) => {
  const routes = [
    '/',
    '/blog',
    '/ai/chatOnce',
    '/ai/chatStream',
    '/book/book',
    '/search',
    '/specialColumn'
  ]

  // 获取动态博客列表 (如果有 API 可以调用，或者直接在这里 hardcode 一些示例)
  // 这里为了简单起见，先只列出静态页面。
  // 如果需要动态生成，可以使用 $fetch 调用后端接口获取文章 ID 列表。
  try {
     // 调用后端接口获取所有文章 ID
     // 接口地址: http://60.205.182.150:29090/blog/getBlogList
     // 参数: { pageNum: 1, pageSize: 1000, action: 0 } (假设文章总数不超过1000，或者需要分多次拉取，这里先取前1000)
     const API_URL = 'http://60.205.182.150:29090/api/blog/getBlogListByAction'
     
     const response: any = await $fetch(API_URL, {
        method: 'POST',
        body: {
          pageNum: 1,
          pageSize: 1000,
          action: 0 // 获取最新博客
        }
     })

     if (response && response.code === 1 && response.data && Array.isArray(response.data.list)) {
        response.data.list.forEach((post: any) => {
          if (post.id) {
            routes.push(`/detail/${post.id}`)
          }
        })
     }
  } catch (e) {
    console.error('Failed to fetch dynamic routes for sitemap', e)
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes
    .map((route) => {
      return `
    <url>
      <loc>${BASE_URL}${route}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>${route === '/' ? 1.0 : 0.8}</priority>
    </url>`
    })
    .join('')}
</urlset>`

  setResponseHeader(event, 'Content-Type', 'application/xml')
  return sitemap
})
