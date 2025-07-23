import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // 允许外部访问
    port: 5173,      // 指定端口
    strictPort: false, // 如果端口被占用，自动尝试下一个端口
    open: true,      // 自动打开浏览器
    cors: true,      // 启用CORS
    hmr: {
      host: 'localhost', // HMR主机
    },
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      'ldtoolkit.run.ingarena.net'
    ],
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  esbuild: {
    sourcemap: false,
  },
  build: {
    sourcemap: false,
  },
  define: {
    __DEV__: true,
  },
});
