import { defineConfig } from "vite";
import deno from "@deno/vite-plugin";
import { domco } from "domco";
import UnoCSS from "unocss/vite";

export default defineConfig({ plugins: [deno(), domco(), UnoCSS()] });
