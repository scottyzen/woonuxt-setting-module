<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: WooNuxt Settings
- Package name: woonuxt-settings
- Description: A Nuxt module that manages connecting to the WooNuxt Setting WordPress plugin
-->

# WooNuxt Settings Module

This nuxt module simplt connects to the WooNuxt Settings WordPress plugin and injest them into Nuxt as ENV variables or the publicRuntimeConfig.

## Quick Setup

1. Add `woonuxt-settings` dependency to your project

```bash
# Using pnpm
pnpm add -D woonuxt-settings

# Using yarn
yarn add --dev woonuxt-settings

# Using npm
npm install --save-dev woonuxt-settings
```

2. Add `woonuxt-settings` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: ["woonuxt-settings"],
});
```

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/woonuxt-settings/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/woonuxt-settings
[npm-downloads-src]: https://img.shields.io/npm/dm/woonuxt-settings.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/woonuxt-settings
[license-src]: https://img.shields.io/npm/l/woonuxt-settings.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/woonuxt-settings
