module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended'
  ],
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
  plugins: [
    'vue'
  ]
}
