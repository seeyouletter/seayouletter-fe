module.exports = {
  extends: [
    'custom',
  ],

  overrides: [
    {
      parser: 'eslint-mdx',
      files: ['**/*.mdx', '**/*.md'],
      extends: [
        'custom', 
        'plugin:mdx/recommended',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:storybook/recommended',
        'plugin:mdx/recommended',
      ],
    },
  ],
};
