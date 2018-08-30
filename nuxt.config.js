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
    //
  ],
  /*
  ** Modules
  */
  modules: [
    '~/modules/typescript'
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
  ** Typescript configuration
  */
  typescript: {
    tsconfig: resolve(__dirname, 'resources', 'tsconfig.json')
  }
}
