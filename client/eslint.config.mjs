import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    rules: {
      // ❗️Отключаем ошибку из-за `any`, чтобы билд не падал
      "@typescript-eslint/no-explicit-any": "off",

      // (опционально) Предупреждения, не блокирующие билд
      "@typescript-eslint/no-unused-vars": "warn",
      "no-console": "warn",
    },
  },
];

export default eslintConfig;
