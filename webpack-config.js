'use strict';

var webpack = require('webpack'),
fs = require('fs');

module.exports = {
	entry: {'ResponsiveImage.js':'./src/ResponsiveImage.js'},
  output: {
    path:'dist',
    filename: "[name]"
  },
  resolve: {
    root: ["./src",/node_modules/]
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      loader: 'jsx?harmony!babel'
    }, {
      test: /\.sass/,
      loader: 'style!css!sass?sourceMap=true&indentedSyntax=sass&' +
          'includePaths[]=' + (__dirname, "./src")
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url'
    }]
  },
  plugins: [
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
    ),
    new webpack.optimize.UglifyJsPlugin({compress:{warnings:false}}),
    new webpack.IgnorePlugin(/./, /(node_modules)/)
  ]
};
