const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.tsx',
    contentScript: './src/contentScript.tsx'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      chunks: ['index']
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/background.js', to: 'background.js' },
        { from: 'public/manifest.json', to: 'manifest.json' },
        { from: 'public/icon.png', to: 'icon.png' }
      ]
    })
  ],
  devtool: 'inline-source-map'
};
