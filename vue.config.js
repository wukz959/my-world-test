const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: process.env.outputDir,
  devServer: {
    port: 2365,
    // historyApiFallback: true
    allowedHosts: 'all'
    // proxy: {
    //   '/myworld': {
    //     target: process.env.VUE_APP_BASE_URL,
    //     changeOrigin: true
    //     // pathRewrite: { '^/myworld': '' }
    //   }
    // }
  }
})
