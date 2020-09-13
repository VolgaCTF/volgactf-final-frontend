const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const zopfli = require('@gfx/zopfli')
const BrotliPlugin = require('brotli-webpack-plugin')

function getBrandingRootPath () {
  let rootPath = process.env.BRANDING_ROOT_PATH || 'branding-default'
  if (!path.isAbsolute(rootPath)) {
    rootPath = path.join(__dirname, rootPath)
  }
  return rootPath
}

function getBrandingScriptPath () {
  return path.join(getBrandingRootPath(), 'js')
}

module.exports = (env, argv) => {
  const plugins = [
    new CleanWebpackPlugin()
  ]
  if (argv.mode === 'production') {
    plugins.push(new CompressionPlugin({
      compressionOptions: {
        numiterations: 15
      },
      algorithm(input, compressionOptions, callback) {
        return zopfli.gzip(input, compressionOptions, callback)
      }
    }))
    plugins.push(new BrotliPlugin({
      asset: '[path].br[query]',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8
    }))
  } else if (argv.mode === 'development') {
    plugins.push(new webpack.HotModuleReplacementPlugin())
  }

  return {
    entry: './src/index.js',
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          options: { presets: ["@babel/env"] }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/'
              }
            }
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'images/'
              }
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: ['*', '.js', '.jsx'],
      alias: {
        Branding: getBrandingScriptPath()
      }
    },
    output: {
      path: path.resolve(__dirname, 'dist/'),
      publicPath: '/dist/',
      filename: 'bundle.js'
    },
    devServer: {
      contentBase: path.join(__dirname, 'public/'),
      port: 3000,
      publicPath: 'http://localhost:3000/dist/',
      hotOnly: true,
      historyApiFallback: true
    },
    plugins: plugins
  }
}
