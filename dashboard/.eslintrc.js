module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'prettier',
  ],
  plugins: [],
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/first-attribute-linebreak': [
      'error',
      {
        singleline: 'ignore',
        multiline: 'below',
      },
    ],
  },
}
