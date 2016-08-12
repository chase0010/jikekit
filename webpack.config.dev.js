var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
  'webpack-dev-server/client?http://192.168.1.110:9090', // WebpackDevServer host and port
  'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
  './client/app'
  ],
  output: {
    path: './bundle',
    filename: 'bundle.js',
    publicPath: 'http://192.168.1.110:9090/build/'
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
        loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015']
      },
      { 
        test: /.css$/,
        exclude: ['/node_modules/',path.resolve(__dirname, 'src/styles')], 
        loader: "style-loader!css-loader?module&localIdentName=[name]-[local]-[hash:base64:10]"
      },
      { 
        test: /.css$/,
        include: ['/node_modules/',path.resolve(__dirname, 'src/styles')], 
        loader: "style-loader!css-loader"
      },
      {
        test: /\.less/,
        exclude: path.resolve(__dirname, 'src/styles'),
        loader: 'style!css?modules&localIdentName=[name]-[local]-[hash:base64:10]!less'
      },
      {
        test: /\.json$/,   
        loader: 'json'
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