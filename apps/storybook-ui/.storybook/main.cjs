const { mergeConfig } = require('vite');
const path = require('path');

const nextConfigPath = path.resolve(__dirname, '../next.config.js');
module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  features: {
    emotionAlias: false,
  },
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    /**
     * @inner
     * 현재 애드온에 대한 빌드 에러가 발생합니다.
     *
     * @see
     * https://github.com/chakra-ui/chakra-ui/issues/6433
     */
    // {
    //   name: "@chakra-ui/storybook-addon",
    // },
    // {
    //   name: 'storybook-addon-next',
    //   options: {
    //     nextConfigPath
    //   }
    // }
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-vite',
  },
  features: {
    storyStoreV7: true,
    emotionAlias: false,
  },

  /**
   * @see: https://chakra-ui.com/getting-started/with-storybook#troubleshooting-storybook
   */
  async viteFinal(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@ui": path.resolve(__dirname, "../../../packages/ui"),
    };
    
    return mergeConfig(config, {
      module: {
        rules: [
          {
            test: /\.mjs$/,
            include: /node_modules/,
            type: 'javascript/auto',
          },
        ],
      },
    });
  },
};
