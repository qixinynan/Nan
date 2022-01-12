const path = require('path');

module.exports = {  
  // entry: './src/nan.ts',
  entry: './src/test.ts',
  mode:'production',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    open: true,
    static: {
      directory: path.join(__dirname, './dist'),
    }
  },
  module: {
    rules: [{
      test:  /\.ts?$/,
      // use: 'ts-loader',
      use:'awesome-typescript-loader',
      exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
};