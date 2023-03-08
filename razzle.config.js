'use strict';
const path = require('path')
module.exports = {
    options: {
      verbose: true,
    },
    modifyWebpackConfig: ({ env: { target, dev }, webpackConfig, webpackObject, options: {razzleOptions}, paths }) => {
        const appConfig = { ...webpackConfig };
        // Change the name of the server output file in production
      if (target === 'web') {
        // modify filenaming to account for multiple entry files
        appConfig.output.filename = dev
          ? 'static/js/[name].js'
          : 'static/js/[name].[hash:8].js';
        // add another entry point called vendor
        appConfig.entry.vendor = [
          // now that React has moved, we need to Razzle's polyfills because
          // vendor.js will be loaded before our other entry. Razzle looks for
          // process.env.REACT_BUNDLE_PATH and will exclude the polyfill from our normal entry,
          // so we don't need to worry about including it twice.
          // require.resolve('razzle/polyfills'),
          require.resolve('react'),
          require.resolve('react-dom'),
          // ... add any other vendor packages with require.resolve('xxx')
        ];

        appConfig.optimization = {
          splitChunks: {
            cacheGroups: {
              vendor: {
                test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                name: 'vendor',
                chunks: 'all',
              }
            }
          }
        }

        appConfig.node = { fs: "empty" };

      // }
        if (target === 'node') {
          // some changes to appConfig

          appConfig.externals = [];
        }

        appConfig.performance = Object.assign({}, {
          maxAssetSize: 100000,
          maxEntrypointSize: 300000,
          hints: false
        })
      

      }

        return appConfig;
    },
      module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: [/\.css$/, /\.scss$/],
          exclude: /node_modules/,
          loaders: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.ejs$/,
          loader: 'ejs-loader',
          query: {
            interpolate : /\{\{(.+?)\}\}/g,
            evaluate    : /\[\[(.+?)\]\]/g
          }
  }
      ]
    },
  resolve: {
      extensions: ['*', '.js', '.jsx']
  }


}
