import { defineNuxtModule, extendPages, addPlugin, createResolver } from '@nuxt/kit';
import { resolve } from 'pathe';
import { $fetch } from 'ohmyfetch';

const url = process.env.GQL_HOST;

if (!url) {
  throw new Error('GQL_HOST is not defined');
}

const query = `
query getWooNuxtSettings {
  woonuxtSettings {
    primary_color
    logo
    publicIntrospectionEnabled
    frontEndUrl
    maxPrice
    productsPerPage
    global_attributes {
      slug
      showCount
      openByDefault
      label
      hideEmpty
    }
    stripeSettings {
      enabled
      testmode
      test_publishable_key
      publishable_key
    }
  }
}
`;

// Module options TypeScript inteface definition
export interface ModuleOptions { }

export default defineNuxtModule<ModuleOptions>({
  meta: { name: 'woonuxt', configKey: 'woonuxt' },
  defaults: {},
  async setup(_, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Extend pages
    extendPages((pages) => {
      pages.push({ name: 'product-page-pager', path: '/products/page/:pageNumber', file: resolve(__dirname, 'pages/products.vue') });
      pages.push({ name: 'product-category-page', path: '/product-category/:categorySlug', file: resolve(__dirname, 'pages/products.vue') });
      pages.push({ name: 'product-category-page-pager', path: '/product-category/:categorySlug/page/:pageNumber', file: resolve(__dirname, 'pages/products.vue') });
      pages.push({ name: 'order-received', path: '/checkout/order-received/:orderId', file: resolve(__dirname, 'pages/order-summary.vue') });
      pages.push({ name: 'order-summary', path: '/order-summary/:orderId', file: resolve(__dirname, 'pages/order-summary.vue') });
    });

    nuxt.options.routeRules = {
      '/checkout/order-received/**': { ssr: false },
      '/order-summary/**': { ssr: false },
    }

    try {
      const { data } = await $fetch(url, { method: 'POST', body: JSON.stringify({ query }) });

      // Default env variables
      process.env.PRIMARY_COLOR = data.woonuxtSettings?.primary_color || '#7F54B2';
      process.env.PUBLIC_INTROSPECTION_ENABLED = data.woonuxtSettings?.publicIntrospectionEnabled || 'off';

      // Default runtimeConfig
      nuxt.options.runtimeConfig.public.LOGO = data.woonuxtSettings?.logo || null;
      nuxt.options.runtimeConfig.public.PRODUCTS_PER_PAGE = data.woonuxtSettings?.productsPerPage || process.env.PRODUCTS_PER_PAGE || 24;
      nuxt.options.runtimeConfig.public.GLOBAL_PRODUCT_ATTRIBUTES = data.woonuxtSettings?.global_attributes || [];
      nuxt.options.runtimeConfig.public.MAX_PRICE = data.woonuxtSettings?.maxPrice || 1000;
      nuxt.options.runtimeConfig.public.FRONT_END_URL = nuxt.options.devServer?.url || data.woonuxtSettings?.frontEndUrl || null;

      // Stripe
      if (data.woonuxtSettings?.stripeSettings?.enabled) {
        nuxt.options.runtimeConfig.public.STRIPE_PUBLISHABLE_KEY = data.woonuxtSettings?.stripeSettings?.testmode ? data.woonuxtSettings?.stripeSettings?.test_publishable_key : data.woonuxtSettings?.stripeSettings?.publishable_key;
      }

    } catch (error) {
      console.log({ error });
      console.log(
        '\u001B[1;35mError fetching woonuxt settings. Make sure you have the woonuxt plugin installed and activated on your WordPress site. You can download it from https://woonuxt.com'
      );
    }

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))
  }
})
