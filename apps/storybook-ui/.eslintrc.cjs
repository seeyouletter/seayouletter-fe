module.exports = {
  extends: [
    'custom',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:storybook/recommended',
    'plugin:mdx/recommended',
  ],

  overrides: [
    {
      parser: 'eslint-mdx',
      files: ['**/*.mdx', '**/*.md'],
      extends: ['plugin:mdx/recommended'],
    },
  ],
};
