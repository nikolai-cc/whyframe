import { defineConfig } from 'vite'
import inspect from 'vite-plugin-inspect'
import vue from '@vitejs/plugin-vue'
import { whyframe } from '@whyframe/core'
import { whyframeVue } from '@whyframe/vue'

export default defineConfig({
  plugins: [
    inspect(),
    whyframe({
      templateHtml: {
        basic: './src/frames/basic/index.html'
      }
    }),
    whyframeVue(),
    vue()
  ]
})
