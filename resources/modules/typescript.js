const { resolve } = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

export default function () {
  // Add .ts extension for store, middleware and more
  this.nuxt.options.extensions.push("ts");

  // Extend build
  this.extendBuild(config => {
    // Add TypeScript loader
    config.module.rules.push({
      test: /\.ts$/,
      loader: "ts-loader",
      options: {
        transpileOnly: true,
        appendTsSuffixTo: [/\.vue$/],
        configFile: resolve(__dirname, "..", "tsconfig.json"),
      },
    });

    config.plugins.push(new ForkTsCheckerWebpackPlugin({
      tsconfig: resolve(__dirname, "..", "tsconfig.json"),
      tslint: resolve(__dirname, "..", "..", "tslint.json"),
      workers: ForkTsCheckerWebpackPlugin.TWO_CPUS_FREE,
      vue: true,
    }));

    // Add .ts extension in webpack resolve
    if (config.resolve.extensions.indexOf(".ts") === -1) {
      config.resolve.extensions.push(".ts");
    }
  });
}
