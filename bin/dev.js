const webpack = require('webpack');
const nodemon = require('nodemon');
const [webpackClientConfig, webpackServerConfig] = require('../webpack.config');
const path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const express = require('express');

const hmrServer = express();
const compiler = webpack(webpackServerConfig);
const clientCompiler = webpack(webpackClientConfig);

hmrServer.use(
  webpackDevMiddleware(clientCompiler, {
    publicPath: '/static/',
    serverSideRender: true,
    noInfo: true,
    watchOptions: {
      ignore: /dist/,
    },
    writeToDisk: true,
    stats: 'errors-only',
  })
)

hmrServer.use(webpackHotMiddleware(clientCompiler, {
  path: '/static/__webpack_hmr',
}));

hmrServer.listen(3001, () => {
  console.log('>>> HMR server successfully started')
})

compiler.run((err) => {
  if (err) {
    console.log('Compilation failed: ', err)
  }
  compiler.watch({}, (err) => {
    if (err) {
      console.log('Compilation failed: ', err)
    }
    console.log('>>> Compilation was successful')
  });

  nodemon({
    script: path.resolve(__dirname, '../dist/server/server.js'),
    watch: [
      path.resolve(__dirname, '../dist/server'),
      path.resolve(__dirname, '../dist/client'),
    ],
  })
})

