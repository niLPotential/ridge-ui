import { defineConfig } from "vite";
import deno from "@deno/vite-plugin";
import UnoCSS from "unocss/vite";

export default defineConfig({
  plugins: [deno(), UnoCSS()],
});
