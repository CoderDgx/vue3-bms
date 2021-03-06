const { defineConfig } = require("@vue/cli-service");
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api": {
        target: "http://152.136.185.210:4000/",
        pathRewrite: {
          "^/api": "",
        },
        ws: true,
        changeOrigin: true,
      },
    },
  },
  outputDir: "./build",
  configureWebpack: {
    resolve: {
      alias: {
        views: "@/views",
      },
    },
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
});
