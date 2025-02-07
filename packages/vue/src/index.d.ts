import type { ParserOptions } from '@vue/compiler-dom'
import type { FilterPattern, Plugin } from 'vite'

export interface Options {
  include?: FilterPattern
  exclude?: FilterPattern
  parserOptions?: ParserOptions
}

export function whyframeVue(options?: Options): Plugin
