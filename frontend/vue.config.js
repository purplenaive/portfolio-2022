const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: "../backend/public",
  devServer: {
    historyApiFallback: true,
    proxy: {
      "/api/*": {
        target: "http://localhost:3000",
        changeOrigin: true,
      }
    },
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "~@/assets/css/abstracts";
        `
      }
    }
  }
})
