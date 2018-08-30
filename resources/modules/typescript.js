const fs = require('fs')
const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const addPackageVersion = function (cache, pkg) {
  const pkgPath = path.join(pkg, 'package.json')
  cache[pkg] = require(pkgPath).version
}

const createCacheConfig = function createCacheConfig(id, configFile) {
  const cache = {
    env: process.env.NODE_ENV || 'development'
  }

  // Add package versions to cache
  addPackageVersion(cache, 'cache-loader')
  addPackageVersion(cache, id)

  // Add config file to cache
  if (configFile && fs.existsSync(configFile)) {
    cache.configFile = JSON.parse(fs.readFileSync(configFile, 'utf-8'))
  }

  return {
    cacheDirectory: path.resolve(process.cwd(), 'node_modules/.cache', id),
    cacheIdentifier: JSON.stringify(cache)
  }
}

// Rule finder
const findRule = (config, loader) =>
  config.module.rules.find((rule) => rule.loader === loader)

// Module rule factory
const createRule = (test) => ({
  test: test,
  use: []
})

module.exports = function (moduleOptions) {
  // Build module options
  const options = Object.assign({
      tslint: 'tslint.json',
      tsconfig: 'tsconfig.json',
      formatter: 'codeframe',
      parallel: true,
      checker: true,
      babel: null
    },
    this.options.typescript,
    moduleOptions
  )

  // Compiler flags
  const isProduction = process.env.NODE_ENV === 'production'
  const useThreads = isProduction && options.parallel

  // Resolve config paths
  const cwd = process.cwd()
  const tslint = path.resolve(cwd, options.tslint)
  const tsconfig = path.resolve(cwd, options.tsconfig)

  // Create TypeScript checker plugin
  const tsChecker = new ForkTsCheckerWebpackPlugin({
    tsconfig: fs.existsSync(tsconfig) && tsconfig,
    tslint: fs.existsSync(tslint) && tslint,
    checkSyntacticErrors: useThreads,
    formatter: options.formatter,
    vue: true
  })

  // Resolve .ts and .tsx file extensions
  this.nuxt.options.extensions.unshift('ts', 'tsx')

  // Extend webpack config
  this.extendBuild((config) => {
    const nuxtVueRule = findRule(config, 'vue-loader')
    const nuxtBabelRule = findRule(config, 'babel-loader')
    const nuxtBabelOptions = (nuxtBabelRule || {}).options

    // Babel loader factory
    const babelLoader = () => ({
      loader: 'babel-loader',
      options: Object.assign({}, nuxtBabelOptions, options.babel)
    })

    // TypeScript loader factory
    const tsLoader = (loaderOptions) => ({
      loader: 'ts-loader',
      options: Object.assign({
          configFile: tsconfig,
          transpileOnly: options.checker,
          happyPackMode: useThreads
        },
        loaderOptions
      )
    })

    // Resolve .ts and .tsx file extensions
    config.resolve.extensions.unshift('.ts', '.tsx')

    // Add TypeScript checker plugin
    if (options.checker) config.plugins.push(tsChecker)

    // Create TypeScript rule
    const tsRule = createRule(/((client|server)\.js)|(\.tsx?)$/)

    // Add TypeScript rule
    config.module.rules.unshift(tsRule)

    // Add cache-loader
    tsRule.use.push({
      loader: 'cache-loader',
      options: createCacheConfig('ts-loader', tsconfig)
    })

    // Add thread-loader
    if (useThreads) tsRule.use.push('thread-loader')

    // Add babel-loader
    tsRule.use.push(babelLoader())

    // Add ts-loader
    tsRule.use.push(tsLoader({
      appendTsxSuffixTo: [/\.vue$/]
    }))

    // Add ts and tsx loaders to vue-loader
    if (nuxtVueRule) {
      const loaders = nuxtVueRule.options.loaders || {}
      nuxtVueRule.options.loaders = loaders
      loaders.ts = [babelLoader(), tsLoader()]
      loaders.tsx = [babelLoader(), tsLoader()]
    }
  })
}
