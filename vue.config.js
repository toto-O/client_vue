const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  devServer: {
    proxy: {
      "^/api": {
        target: process.env.VUE_APP_API_BASE_URL,
        ws: true, //require Conect WebSocekt
        secure: false,
        changeOrigin: true,
      },
    },
  },
  transpileDependencies: true,
});
