const request = require('request');
const path = require('path');
const webpack = require('webpack'); // eslint-disable-line import/no-extraneous-dependencies
const config = require('./src/config');

const resolve = dir => path.join(__dirname, './', dir);
const SOURCE_PATH = resolve('src');
const OUTPUT_PATH = resolve('dist');

module.exports = {
  devtool: 'source-map',
  context: SOURCE_PATH,
  entry: [path.join(SOURCE_PATH, 'main.jsx')],
  output: {
    path: OUTPUT_PATH,
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(html,json)$/,
        exclude: /node_modules/,
        use: {
          loader: 'file-loader',
          query: {
            name: '[name].[ext]',
          },
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      resolve('node_modules'),
      SOURCE_PATH,
    ],
    alias: {
      '@': SOURCE_PATH,
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: SOURCE_PATH,
    historyApiFallback: {
      disableDotRule: true,
    },
    host: '192.168.1.38',
    port: 3000,
    compress: false,
    inline: true,
    hot: true,
    setup: (app) => {
      app.get('/login', (req, res) => {
        const authOptions = {
          url: config.spotify.accounts.token,
          headers: {
            'Authorization': 'Basic ' + (new Buffer(`${config.spotify.clientId}:${config.spotify.clientSecret}`).toString('base64')),
          },
          form: {
            grant_type: 'client_credentials',
          },
          json: true,
        };

        request.post(authOptions, (error, response, body) => {
          if (!error && response.statusCode === 200) {
            res.redirect(`/?token=${body.access_token}`);
          }
        });
      });
    },
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true,
      colors: {
        green: '\u001b[32m',
      },
    },
  },
};
