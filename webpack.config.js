var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './src/entry.js',
  output: {
    path: './src',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.jsx?$/, 
        exclude: /node_modules/, 
        loaders: ['babel?presets[]=react,presets[]=es2015']
      },
      { 
        test: /.css$/,
        exclude: /node_modules/, 
        loader: "style-loader!css-loader?module&localIdentName=[name]-[local]-[hash:base64:10]"
      },
      { 
        test: /.css$/,
        include: /node_modules/, 
        loader: "style-loader!css-loader"
      },
      {
        test: /\.less/,
        exclude: path.resolve(__dirname, 'src/styles'),
        loader: 'style!css?modules&localIdentName=[name]-[local]-[hash:base64:10]!less'
      },
      {
        test: /\.less/,
        include: path.resolve(__dirname, 'src/styles'),
        loader: 'style!css!less'
      },
      { 
        test: /\.(woff|svg|eot|ttf)\??.*$/, 
        loader: 'url-loader?limit=50000&name=[path][name].[ext]'
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'file?name=[path][name].[hash].[ext]'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json', '.jsx'] 
  },
  plugins: [
   // Avoid publishing files when compilation fails
    new webpack.NoErrorsPlugin()
  ]
};