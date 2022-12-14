const { mergeConfig } = require('vite');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    // "@chakra-ui/storybook-addon",
  ],
  "framework": "@storybook/react",
  // NOTE: https://github.com/chakra-ui/chakra-ui/issues/6433
  "core": {
    "builder": "@storybook/builder-vite"
  },
  "features": {
    "storyStoreV7": true,
    "emotionAlias": false,
  },
  
  async viteFinal(config, { configType }) {
    // return the customized config
    return mergeConfig(config, {
      module: {
        rules: [
          {
            test: /\.mjs$/,
            include: /node_modules/,
            type: 'javascript/auto',
          }
        ]
      }
    });
  },
}