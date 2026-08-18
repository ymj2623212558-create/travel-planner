/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // 静态导出：产出 out/ 目录（HTML/JS/CSS），由后端 FastAPI 托管（单项目部署）
  output: 'export',
  images: { unoptimized: true },
  // 根路径 / 由后端 FastAPI 重定向到 /itinerary
}

module.exports = nextConfig
