import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { rewriteDefault } from "vue/compiler-sfc";

// https://vitejs.dev/config/
export default defineConfig({

  plugins: [vue()],

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },

  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        // pathRewrite : {'^/api':''},
        // ws: true,
        changeOrigin: true,
        rewrite(path) {
          return path.replace(/^\/api/,'');
        },
      },
    },
  },
});
