import { defineNuxtModule } from '@nuxt/kit';
import { $fetch } from 'ohmyfetch';

type Plugin = {
  name?: string;
  id?: string;
  version?: string;
  minRequiredVersion: string;
};

const WPGraphQLPlugin: Plugin = {
  id: 'cGx1Z2luOndwLWdyYXBocWwvd3AtZ3JhcGhxbC5waHA=',
  minRequiredVersion: '1.17.0',
};
const WooGraphQLPlugin: Plugin = {
  id: 'cGx1Z2luOndwLWdyYXBocWwtd29vY29tbWVyY2Uvd3AtZ3JhcGhxbC13b29jb21tZXJjZS5waHA',
  minRequiredVersion: '0.18.2',
};
const WPGraphQLCors: Plugin = {
  id: 'cGx1Z2luOndwLWdyYXBocWwtY29ycy0yLjEvd3AtZ3JhcGhxbC1jb3JzLnBocA==',
  minRequiredVersion: '2.1',
};

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
  pluginWPGraphQL: plugin(id: "${WPGraphQLPlugin.id}") {
    name
    version
  }
  pluginWooGraphQL: plugin(id: "${WooGraphQLPlugin.id}") {
    name
    version
  }
  pluginWPCORS: plugin(id: "${WPGraphQLCors.id}") {
    name
    version
  }
}
`;

// Module options TypeScript inteface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: { name: 'woonuxt', configKey: 'woonuxt' },
  defaults: {},
  async setup(_, nuxt) {
    // const resolver = createResolver(import.meta.url);

    const GQL_HOST = process.env.GQL_HOST || null;

    if (!GQL_HOST) {
      console.log('\u001B[1;35mGQL_HOST is missing. Make sure you have the GQL_HOST environment variable set.');
      return;
    }

    try {
      const { data } = await $fetch(GQL_HOST, {
        method: 'POST',
        body: JSON.stringify({ query }),
      });

      // Plugins Versions
      const WPGRAPHQL_VERSION = data.pluginWPGraphQL?.version || null;
      const WOOGQL_VERSION = data.pluginWooGraphQL?.version || null;
      const WPCORS_VERSION = data.pluginWPCORS?.version || null;
      const pluginTableOutput = [];

      if (WPGRAPHQL_VERSION && WPGRAPHQL_VERSION < WPGraphQLPlugin.minRequiredVersion) {
        pluginTableOutput.push({
          'Plugin Name': 'WPGraphQL',
          Installed: WPGRAPHQL_VERSION,
          Required: WPGraphQLPlugin.minRequiredVersion,
        });
      }

      if (WOOGQL_VERSION && WOOGQL_VERSION < WooGraphQLPlugin.minRequiredVersion) {
        pluginTableOutput.push({
          'Plugin Name': 'WooGraphQL',
          Installed: WOOGQL_VERSION,
          Required: WooGraphQLPlugin.minRequiredVersion,
        });
      }

      if (WPCORS_VERSION && WPCORS_VERSION < WPGraphQLCors.minRequiredVersion) {
        pluginTableOutput.push({
          'Plugin Name': 'WPGraphQL-CORS',
          Installed: WPCORS_VERSION,
          Required: WPGraphQLCors.minRequiredVersion,
        });
      }

      // Warning message in red
      if (pluginTableOutput.length > 0) {
        console.table(pluginTableOutput);
        console.log('\u001b[31mSome plugins are missing or not up to date. Make sure you have them updated and activated.');
      }

      // Default env variables
      process.env.PRIMARY_COLOR = data.woonuxtSettings?.primary_color || '#7F54B2';

      // Default runtimeConfig
      nuxt.options.runtimeConfig.public.LOGO = data.woonuxtSettings?.logo || null;
      nuxt.options.runtimeConfig.public.PRODUCTS_PER_PAGE = data.woonuxtSettings?.productsPerPage || process.env.PRODUCTS_PER_PAGE || 24;
      nuxt.options.runtimeConfig.public.GLOBAL_PRODUCT_ATTRIBUTES = data.woonuxtSettings?.global_attributes || [];
      nuxt.options.runtimeConfig.public.MAX_PRICE = data.woonuxtSettings?.maxPrice || 1000;
      nuxt.options.runtimeConfig.public.FRONT_END_URL = data.woonuxtSettings?.frontEndUrl || null;

      // Stripe
      if (data.woonuxtSettings?.stripeSettings?.enabled) {
        nuxt.options.runtimeConfig.public.STRIPE_PUBLISHABLE_KEY = data.woonuxtSettings?.stripeSettings?.testmode
          ? data.woonuxtSettings?.stripeSettings?.test_publishable_key
          : data.woonuxtSettings?.stripeSettings?.publishable_key;
      }
    } catch (error) {
      console.log(
        '\u001B[1;35mError fetching woonuxt settings. Make sure you have the latest version woonuxt-settings plugin installed and activated WordPress. You can download it from https://github.com/scottyzen/woonuxt-settings'
      );
    }
  },
});
