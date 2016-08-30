const path = require('path');
const webpack = require('webpack');
const argv = require('yargs').argv;

const SINGLE_RUN = !process.env.CONTINUOUS;
const BROWSER = process.env.BROWSER || 'PhantomJS';
const KARMA_REPORTER = process.env.KARMA_REPORTER || 'mocha';

module.exports = function(config) {
  config.set({
    basePath: '',
    browsers: [BROWSER],
    files: [{
      pattern: 'node_modules/jquery/dist/jquery.js',
      watched: false
    }, {
      pattern: 'test/bundler.js',
      watched: false
    }, {
      pattern: 'test/helpers/vendor/*.js',
      watched: false
    }],
    frameworks: ['jasmine'],
    preprocessors: {
      'test/bundler.js': ['webpack', 'sourcemap'],
    },
    reporters: [KARMA_REPORTER],
    singleRun: SINGLE_RUN,
    webpack: {
      module: {
        loaders: [{
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader?plugins=babel-plugin-rewire'
        }, {
          test: /\.json$/,
          loader: 'json'
        }]
      },
      resolve: {
        extensions: ['', '.js'],
        root: [
          path.resolve('./src'),
          path.resolve('./test/helpers')
        ]
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
          }
        })
      ],
      watch: true,
      devtool: 'inline-source-map'
    },
    webpackMiddleware: {
      noInfo: !argv.debug,
      stats: { colors: true }
    },
    plugins: [
      'karma-jasmine',
      'karma-webpack',
      'karma-sourcemap-loader',
      'karma-mocha-reporter',
      'karma-chrome-launcher',
      'karma-phantomjs-launcher'
    ]
  });
};
