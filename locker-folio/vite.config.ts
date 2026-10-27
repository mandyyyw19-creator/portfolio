import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 监听所有网卡，方便手机等同一局域网设备用 IP:端口 访问
  server: { host: true, port: 5178 },
  preview: { host: true, port: 4178 },
  build: {
    // GitHub Pages 子路径部署：https://mandyyyw19-creator.github.io/portfolio/
    // emptyOutDir: false 在当前环境中避免安全删除 guard 拦截
    emptyOutDir: false,
  },
  // GitHub Pages 部署在 /portfolio/ 子路径下，需设置 base
  base: '/portfolio/',
})
