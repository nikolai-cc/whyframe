---
title: Features
layout: ../../layouts/DocsLayout.astro
---

# Features

## Component isolation

`whyframe` allows you to develop components in isolation by simply wrapping it with an `iframe`.

<!-- prettier-ignore -->
```html
<iframe data-why>
  I am isolated
</iframe>
```

It works by extracting HTML within the `iframe` as a separate module. Side effects like scripts and styles are also extracted alongside. See [How it works](/docs/how-it-works) for more details.

Due to it's naiveness, it may over extract scripts and styles that could cause compile-time or runtime warnings. Plus, since the HTML surrounding the `iframe` is removed, scripts that reference them may throw an error.

To prevent this, make sure your code have proper null-handling when accessing potentially removed HTML elements. This may improve in the future with better preliminary dead-code elimination.

## HTML source

By default, `whyframe` will inject a fallback `src` to an `iframe` if it's not provided. This makes it easier to start from the get-go. If you have a custom HTML already setup, you're free to use it too by simply specifying a `src` to it!

<!-- prettier-ignore -->
```html
<iframe data-why src="/somewhere/else.html">
  I am still isolated
</iframe>
```

To have the iframe HTML "connect" to the main page, `/somewhere/else.html` needs JavaScript to import `whyframe:app`. The import should be processed by the bundler as it contains different dev and prod code. You can then initialize like:

```js
import { createApp } from 'whyframe:app'
// if a `<div id="app">` exists
createApp(document.getElementById('app'))
```

If you'd like `whyframe` to fallback to a specific `src` by default, you can set `@whyframe/core`'s `defaultSrc` option:

```js
export default {
  plugins: [
    whyframe({
      defaultSrc: '/somewhere/else.html'
    })
  ]
}
```

## Source code

A common usecase with component isolation is to display the source code written to serve as a "write this code to acheive this HTML result" hint.

This feature is disabled by default as it introduces non-treehshake-able code. You can enable it in `iframes` with `data-why-source`:

<!-- prettier-ignore -->
```html
<iframe data-why data-why-source>
  I am a source code
</iframe>
```

and can be retrieved with `getWhyframeSource()`:

```html
<script>
  import { getWhyframeSource } from '@whyframe/core/utils'

  let iframe = null
  let source = ''

  onMount(() => {
    source = getWhyframeSource(iframe)
  })
</script>

<iframe bind:this="{iframe}" data-why data-why-source>
  I am a source code
</iframe>

<p>Source:</p>
<pre>{source}</pre>
```

## Abstracting components

Sometimes you have an `iframe` that you'd like to abstract out as a component using your UI framework of choice. This can be handy to group interactions and state with the `iframe` to build a `Story` component, or a meta-framework using `whyframe`.

```html
<!-- Story.svelte -->
<script>
  export let title = 'iframe'
  export let src = undefined
</script>

<p>{title}</p>
<iframe data-why {title} {src}>
  <slot />
</iframe>
```

`<slot />` being a direct children of `iframe` is required for `whyframe` to detect this abstraction. In JSX terms, it should be `{*.children}` or `{children}`.

Since the user will be using `<Story />` as is, without a `data-why` to signal `whyframe` to take special care, these components need to be registered in `@whyframe/core`'s `components` option:

```js
export default {
  plugins: [
    whyframe({
      components: [{ name: 'Story' }]
    })
  ]
}
```

`<Story />` will now just work!

<!-- prettier-ignore -->
```html
<Story>
  I'm in an iframe
</Story>
```

## Remote procedure call

As interacting between an iframe and the current page is a common usecase, `@whyframe/core/utils` provides a generic `createIframeRpc()` function to connect between the two.

In the current page:

```js
import { createIframeRpc } from '@whyframe/core/utils'

const rpc = createIframeRpc(iframe)

rpc.send('ping', { mgs: 'hello world' })
```

In the iframe:

```js
import { createIframeRpc } from '@whyframe/core/utils'

const rpc = createIframeRpc()

rpc.on('ping', (data) => {
  console.log(data.msg) // hello world
})
```
