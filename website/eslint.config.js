import { defineConfig } from "eslint/config";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import unocss from "@unocss/eslint-config/flat";

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  unocss,
);
