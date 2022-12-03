const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/client/index.js',
  mode: 'production',
  output: {
    path: path.join(__dirname, 'dist'),
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: './src/client/views/index.html',
    }),
  ],
};
