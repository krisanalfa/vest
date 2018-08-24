'use strict'

const resolve = require('path').resolve

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'TRAVLR'
  },
  /*
  ** Plugins
  */
  plugins: [
    { src: '~plugins/vuex-router-sync', ssr: false }
  ],
  /*
  ** Modules
  */
  modules: [
    //
  ],
  /*
  ** Global CSS
  */
  css: [
    '~/assets/scss/main.scss'
  ],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#42b983' },
  /*
  ** Point to resources
  */
  srcDir: resolve(__dirname, 'resources'),
  /*
  ** Build configuration
  */
  build: {
    publicPath: '/dist/',
    plugins: [
      //
    ]
  },
  /*
  ** When launching nuxt generate or calling nuxt.generate(),
  ** Nuxt.js will use the configuration defined in the generate property.
  */
  generate: {
    minify: {
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      decodeEntities: true,
      minifyCSS: true,
      minifyJS: true,
      processConditionalComments: true,
      removeAttributeQuotes: false,
      removeComments: true,
      removeEmptyAttributes: true,
      removeOptionalTags: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      removeTagWhitespace: true,
      sortAttributes: true,
      sortClassName: false,
      trimCustomFragments: true,
      useShortDoctype: true
    }
  }
}
