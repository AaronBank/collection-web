/*
 * @Author: Aaron
 * @Date: 2019-11-05 14:50:57
 * @LastEditors: Aaron
 * @LastEditTime: 2019-11-05 16:23:14
 * @Description: file content
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
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  plugins: [
    'prettier'
  ],
  // add your custom rules here
  rules: {
    "prettier/prettier": "off"
  }
}
