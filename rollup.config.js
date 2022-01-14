import typescript from "rollup-plugin-typescript";
export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/nan.js",
      format: "es",
    },
  ],
  plugins: [
    typescript({
      exclude: "node_modules/**",
      typescript: require("typescript"),
    }),
  ],
};


