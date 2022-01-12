const path = require('path');

module.exports = {  
  // entry: './src/nan.ts',
  entry: {
    nan: './src/nan.ts',
    test: './src/test.ts'
  },
  mode:'production',
  output: {
    filename: '[name].js',
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
      use:'awesome-typescript-loader',
      exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
};