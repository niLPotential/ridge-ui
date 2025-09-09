import { defineConfig, presetMini, transformerVariantGroup } from "unocss";

export default defineConfig({
  presets: [presetMini()],
  transformers: [transformerVariantGroup()],
  content: {
    filesystem: [
      "./**/*.tsx",
    ],
  },
});
