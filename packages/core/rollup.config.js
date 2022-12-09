// rollup.config.js
import typescript from "rollup-plugin-typescript2";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import localResolve from "@haensl/rollup-plugin-local-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";
const globals = {
  react: "React",
};
export default {
  input: "src/index.ts",
  output: [
    {
      file: "lib/index.umd.js",
      format: "umd",
      sourcemap: true,
      name: "fabform-core",
      globals,
    },
    {
      format: "es",
      file: "lib/index.es.js",
      sourcemap: true,
      globals,
    },
    {
      file: "lib/index.cjs.js",
      format: "cjs",
      sourcemap: true,
      name: "fabform-core",
      exports: "named",
      globals,
    },
  ],
  plugins: [
    peerDepsExternal(),
    typescript(),
    resolve(),
    localResolve(),
    commonjs(),
  ],
  external: Object.keys(pkg.peerDependencies || {}),
};
