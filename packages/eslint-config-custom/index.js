module.exports = {
  'extends': ['next', 'turbo', 'prettier'],
  'rules': {
    '@next/next/no-html-link-for-pages': 'off',
    'react/jsx-key': 'off',
  },
  'overrides': [
    {
      'files': '**/*.+(ts|tsx)',
      'parser': '@typescript-eslint/parser',
      'plugins': ['@typescript-eslint'],
      'extends': ['plugin:@typescript-eslint/recommended'],
    },
  ],
};
