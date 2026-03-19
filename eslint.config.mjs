import js from '@eslint/js';
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import tseslint from "typescript-eslint";
import reactCompiler from "eslint-plugin-react-compiler";
import globals from 'globals';

const eslintConfig = defineConfig([
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "dist/**",
    "node_modules/**",
    "*.config.*",
    "next-env.d.ts",
    "src/generated/**",
    "prisma/**",
  ]),

  js.configs.recommended,
  ...nextVitals,
  ...nextTs,

  ...tseslint.configs.recommendedTypeChecked,

  reactCompiler.configs.recommended,

  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
        ...globals.node, 
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      react: {
        version: "detect", 
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { fixStyle: "inline-type-imports" }
      ],
      
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": "error",

      "react-compiler/react-compiler": "error",

      "no-warning-comments": [
        "error", 
        { 
          terms: ["todo", "fix", "replace"], 
          location: "anywhere" 
        }
  ],
    },
  },

  {
    files: ["**/*.js", "**/*.mjs", "**/*.cjs"],
    ...tseslint.configs.disableTypeChecked,
  },
]);

export default eslintConfig;