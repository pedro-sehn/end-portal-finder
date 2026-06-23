import next from "eslint-config-next";

const eslintConfig = [
  ...next,
  {
    ignores: ["out/**", ".next/**", "dist/**"],
  },
];

export default eslintConfig;
