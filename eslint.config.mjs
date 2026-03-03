import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import nextPlugin from "@next/eslint-plugin-next";

export default tseslint.config(
    ...tseslint.configs.recommended,
    {
      files: ["**/*.{js,jsx,ts,tsx}"],
      rules: {
        "@typescript-eslint/no-unused-vars": "warn",
        "@typescript-eslint/no-unused-expressions": "warn",
        "@typescript-eslint/no-explicit-any": "off",
      },
    },
    {
      files: ["src/app/*.{js,jsx,ts,tsx}"],
      plugins: {
        react: reactPlugin,
        "react-hooks": reactHooksPlugin,
        "@next/next": nextPlugin,
      },
      languageOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      settings: {
        react: {
          version: "detect",
        },
      },
      rules: {
        ...reactPlugin.configs["jsx-runtime"].rules,
        ...reactHooksPlugin.configs.recommended.rules,
        ...nextPlugin.configs.recommended.rules,
        ...nextPlugin.configs["core-web-vitals"].rules,
        "react/no-unescaped-entities": "off",
        "@typescript-eslint/no-explicit-any": "off",
      },
    },
    {
      ignores: [
        "node_modules/**",
        ".next/**",
        "out/**",
        "build/**",
        "next-env.d.ts",
      ],
    }
);
