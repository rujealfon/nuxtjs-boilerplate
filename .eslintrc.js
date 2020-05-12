/**
 * https://medium.com/@gogl.alex/how-to-properly-set-up-eslint-with-prettier-for-vue-or-nuxt-in-vscode-e42532099a9c
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'eslint:recommended',
    'plugin:nuxt/recommended',
    'plugin:prettier/recommended',
    'plugin:vue/strongly-recommended',
    'prettier',
    'prettier/standard',
    'prettier/vue'
  ],
    plugins: [
    'prettier'
  ],
  globals: {
    $nuxt: true
  },
  rules: {
  'prettier/prettier': ['error', { 'semi': false }],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'semi': [2, 'never'],
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/max-attributes-per-line': 'off',
  },
}
