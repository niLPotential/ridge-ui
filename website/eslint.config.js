import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import unocss from "@unocss/eslint-config/flat";

export default defineConfig({
  files: ["**/*.tsx"],
  languageOptions: {
    parser: tseslint.parser,
  },
}, unocss);
