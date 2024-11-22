import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    ignores: ["node_modules", "dist"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: globals.node,
    },
    plugins: {
      prettier,
      "@typescript-eslint": tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      "prettier/prettier": ["error"], // Ativa regras do Prettier
    },
  },
  pluginJs.configs.recommended, // Configuração padrão para JS
  {
    rules: {
      // Adiciona a configuração do Prettier desativando conflitos
      ...prettier.configs.recommended.rules,
    },
  },
];
