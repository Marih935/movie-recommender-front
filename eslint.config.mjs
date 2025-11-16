import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import nextVitals from "eslint-config-next/core-web-vitals";
import prettierConfig from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import tsResolver from "eslint-import-resolver-typescript";

const eslintConfig = defineConfig([
  globalIgnores([
    "node_modules/**",
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    ".prettierrc.cjs",
  ]),

  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...nextVitals,

  {
    plugins: {
      import: importPlugin,
    },
    settings: {
      // Ensina o plugin a resolver os aliases do tsconfig.json
      "import/resolver": {
        typescript: tsResolver,
        node: true,
      },
    },
    rules: {
      // Garante que todos os imports sejam resolvidos
      "import/no-unresolved": "error",

      "import/order": [
        "error",
        {
          "groups": [
            "builtin", // 'node:fs'
            "external", // 'react', 'next'
            "internal", // '@/'
            "parent", // '../'
            "sibling", // './'
            "index", // './index'
          ],
          "pathGroups": [
            {
              // Define o alias '@/' como 'internal'
              "pattern": "@/**",
              "group": "internal",
            },
          ],
          "pathGroupsExcludedImportTypes": ["builtin"],
          "newlines-between": "always", // Adiciona linhas em branco entre os grupos
          "alphabetize": { "order": "asc", "caseInsensitive": true },
        },
      ],
    },
  },

  {
    rules: {
      // Evita 'console.log' em produção
      "no-console": "warn",
      // Permite '_' como prefixo para variáveis não usadas (ex: '...props')
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      // Exige 'const' ou 'let'
      "no-var": "error",
      // Prefere 'const' se a variável não for reatribuída
      "prefer-const": "error",
    },
  },

  prettierConfig,
]);

export default eslintConfig;