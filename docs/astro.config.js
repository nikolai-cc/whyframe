// @ts-nocheck
import path from 'node:path'
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import svelte from '@astrojs/svelte'
import vue from '@astrojs/vue'
import solid from '@astrojs/solid-js'
import preact from '@astrojs/preact'
import react from '@astrojs/react'
import inspect from 'vite-plugin-inspect'
import { whyframe } from '@whyframe/core'
import { whyframeAstro } from '@whyframe/astro'
import { whyframeSvelte } from '@whyframe/svelte'
import { whyframeVue } from '@whyframe/vue'
import { whyframeJsx } from '@whyframe/jsx'

export default defineConfig({
  site: 'https://whyframe.dev',
  integrations: [
    mdx(),
    svelte({
      onwarn: (warning, handler) => {
        if (warning.code === 'css-unused-selector') return
        if (warning.filename?.includes('HeroDemo.svelte')) return
        handler(warning)
      }
    }),
    vue(),
    solid(),
    preact(),
    react()
  ],
  vite: {
    plugins: [
      inspect(),
      whyframe({
        defaultSrc: '/frames/default'
      }),
      whyframeAstro({
        defaultFramework: 'svelte'
      }),
      whyframeSvelte(),
      whyframeVue(),
      whyframeJsx()
    ],
    resolve: {
      alias: {
        '@': path.resolve('./src')
      }
    }
  }
})
