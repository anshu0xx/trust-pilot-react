const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
  index: path.join(__dirname, 'src', 'index.js'),
  build: path.join(__dirname, 'lib'),
  eslintrc: path.join(__dirname, '.eslintrc')
}

const common = {
  entry: {
    index: [ PATHS.index ]
  },
  output: {
    path: PATHS.build,
    filename: '[name].js',
    publicPath: '/'
  },
  target: 'web',
  resolve: {
    modulesDirectories: [
      'node_modules',
      'src'
    ],
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx'],
    alias: {
      sinon: 'node_modules/sinon/pkg/sinon.js'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      },
      __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
      __PROD__: JSON.stringify(process.env.NODE_ENV === 'production'),
      __TEST__: JSON.stringify(process.env.NODE_ENV === 'test')
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ],
  eslint: {
    configFile: PATHS.eslintrc
  },
  module: {
    loaders: [{
      test: /bootstrap-sass\/assets\/javascripts\//,
        loader: 'imports',
        query: '?jQuery=jquery'
    }, {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url',
      query: '?limit=10000&mimetype=application/font-woff'
    }, {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url',
      query: '?limit=10000&mimetype=application/font-woff2'
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url',
      query: '?limit=10000&mimetype=application/octet-stream'
    }, {
      test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url',
      query: '?limit=10000&mimetype=application/font-otf'
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file'
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url',
      query: '?limit=10000&mimetype=image/svg+xml'
    }, {
      test: /\.(js|jsx)$/,
      loaders: ['babel-loader', 'eslint'],
      exclude: /node_modules/
    }, {
      test: /\.png$/,
      loader: 'file',
      query: '?name=[name].[ext]'
    }, {
      test: /\.jpg$/,
      loader: 'file',
      query: '?name=[name].[ext]'
    }, {
      test: /\.json$/,
      loader: 'json'
    }],
  }
};

if (TARGET === 'dev' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval',
    // entry: {
      // app: [ 'webpack-hot-middleware/client' ]
    // },
    // plugins: [
      // new webpack.HotModuleReplacementPlugin(),
    // ],
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: 'css'
        },
        {
          test: /\.scss$/,
          loader: 'css!sass'
        }
      ]
    }
  });
}

if (TARGET === 'build') {
  module.exports = merge(common, {
    devtool: 'cheap-module-source-map',
    plugins: [
      new webpack.optimize.DedupePlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        preserveComments: false,
        compress: {
          warnings: false
        }
      })
    ],
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: 'style!css'
        },
        {
          test: /\.scss$/,
          loader: 'style!css!sass'
        }
      ]
    }
  })
}
