const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
    watch: true,
    watchOptions: {
      aggregateTimeout: 200,
      poll: 1000,
      ignored: /node_modules/,
    },
    entry: path.resolve(__dirname, "react/", "index.tsx"),
    mode: "development",
    devtool: 'inline-source-map',
    devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      port: 8888,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: ['file-loader', 'extract-loader', 'css-loader'],
        },
        {
          test: /\.less$/i,
          use: [
              {
                loader: 'file-loader',
                options: {
                  name: "[contenthash].css"
                }
              },
              'extract-loader', 
              'css-loader', 
              'less-loader'
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.css'],
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new CleanWebpackPlugin(),
    ],
}