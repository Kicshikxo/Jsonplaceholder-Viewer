import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import { defineConfig, loadEnv, type ServerOptions } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const serverOptions: ServerOptions = {
    port: Number(env.PORT) || 3000,
    allowedHosts: true,
    proxy: {
      '/rest': {
        target: env.API_URL || 'https://dveri-bambit.bitrix24.ru/',
        changeOrigin: true,
      },
    },
  }

  return {
    plugins: [tailwindcss(), vue()],

    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },

    server: serverOptions,
    preview: serverOptions,
  }
})
