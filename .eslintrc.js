module.exports = {
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017,
    ecmaFeatures: {
      legacyDecorators: true
    },
    sourceType: 'module'
  },
  env: {
    node: true,
    browser: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended'
  ],
  plugins: [
    'vue'
  ]
}
