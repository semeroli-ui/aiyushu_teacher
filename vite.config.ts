
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // 删除了 define 中的 API_KEY，这样前端打包后的代码里就不会包含你的私钥
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});
