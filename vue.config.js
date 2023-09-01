/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path')

module.exports = {
  publicPath: process.env.NODE_ENV === 'development' ? '/' : './',
  devServer: {
    before(app) {
      if (process.env.VUE_APP_ENV === 'mock') {
        const mockerAPI = require('mocker-api')
        mockerAPI(app, path.resolve(__dirname, './src/mock/index.js'), {
          priority: 'mocker',
          proxy: {
            '/base/(.*)': 'http://alpha-api.xxx.com'
          },
          pathRewrite: {
            '^/base/': ''
          }
        })
      }
    }
  }
}
