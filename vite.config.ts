import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from "tailwindcss";
import path from 'path';


export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss()],
    }
  },
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, './index.html'),
        options: path.resolve(__dirname, './options/options.html')
      },
      output: {
        entryFileNames: "react/[name].js",
        chunkFileNames: "react/[name].js",
        assetFileNames: "react/[name].[ext]"
      }
    },
  }
});
