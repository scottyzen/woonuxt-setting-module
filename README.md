<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: WooNuxt Settings
- Package name: woonuxt-settings
- Description: A Nuxt module that manages connecting to the WooNuxt Setting WordPress plugin
-->

# My Module

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

> My new Nuxt module

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

<!-- Highlight some of the features your module provide here -->

- Adds the following enviorment variables:
  - `PRIMARY_COLOR` - The primary color of the site
  - `PUBLIC_INTROSPECTION_ENABLED` - Whether or not the GraphQL API is publicly available
  - `PUBLIC_GRAPHQL_ENDPOINT` - The publicly available GraphQL endpoint
  - `LOGO` - The logo of the site
  - `PRODUCTS_PER_PAGE` - The number of products to show per page
  - `GLOBAL_PRODUCT_ATTRIBUTES` - The global product attributes (This is used for filtering products)
  - `MAX_PRICE` - The most expensive product price
  - `FRONT_END_URL` - The URL of the front end (This is used for the checkout redirect)
  - `STRIPE_PUBLISHABLE_KEY` - The Stripe publishable key

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

That's it! You can now use My Module in your Nuxt app ✨

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/woonuxt-settings/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/woonuxt-settings
[npm-downloads-src]: https://img.shields.io/npm/dm/woonuxt-settings.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/woonuxt-settings
[license-src]: https://img.shields.io/npm/l/woonuxt-settings.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/woonuxt-settings
