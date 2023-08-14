import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { visualizer } from "rollup-plugin-visualizer";
import { Plugin as import2CDN } from "vite-plugin-cdn-import";
import { chunkSplitPlugin } from "vite-plugin-chunk-split";
import { compression } from "vite-plugin-compression2";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),

    // 1：打包可视化
    visualizer({ open: true }),

    // 2：依赖第三方库打包排除，使用导入CDN
    // import2CDN({
    //   modules: [
    //     {
    //       name: "vue",
    //       var: "Vue",
    //       path: "https://fastly.jsdelivr.net/npm/vue@3.3.4/dist/vue.global.min.js",
    //     },
    //     {
    //       name: "vue-router",
    //       var: "VueRouter",
    //       path: "https://fastly.jsdelivr.net/npm/vue-router@4.2.4/dist/vue-router.global.min.js",
    //     },
    //     {
    //       name: "lodash-es",
    //       var: "_",
    //       path: "https://fastly.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js",
    //     },
    //   ],
    // }),

    // 3：Code Split
    chunkSplitPlugin({
      strategy: "default",
      customSplitting: {
        "vue-vendor": ["vue", "vue-router"],
        "lodash-vendor": ["lodash-es"],
      },
    }),

    // 4: 压缩打包文件 gzip
    compression({ threshold: 1024 * 1024 }),
  ],
  base: "./",
  build: {
    rollupOptions: {
      // external: ["vue", "vue-router", "lodash-es"],
      output: {
        assetFileNames: "static/[ext]/[name]-[hash].[ext]",
        chunkFileNames: "static/js/[name]-[hash].js",
        entryFileNames: "static/js/[name]-[hash].js",
        // 3：Code Split
        // manualChunks: (id) => {
        //   console.log(id);
        //   if (id.includes("node_modules")) {
        //     return id
        //       .toString()
        //       .split("node_modules/")[1]
        //       .split("/")[0]
        //       .toString();
        //   }
        // },
      },
    },

    // 4：script defer

    // 5: gzip

    // 异步组件
  },
});
