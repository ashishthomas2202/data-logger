import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import electron from "vite-plugin-electron";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // electron({
    //   main: {
    //     // Shortcut of `build.lib.entry`
    //     entry: "src/electron/main.js",
    //   },
    //   preload: {
    //     // Shortcut of `build.rollupOptions.input`
    //     input: "src/electron/preload.js",
    //   },
    // }),
  ],
});
