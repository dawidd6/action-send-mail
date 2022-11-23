import { build as esbuild } from "esbuild";
import fs from "fs";

export const defaultBuildOptions = {
  bundle: true,
  entryPoints: ["main.js"],
  keepNames: true, // keep names during minification or class names will be cryptic in logs
  metafile: !!process.env.ESBUILD_METADATA,
  minify: true,
  outfile: "dist/main.cjs",
  platform: "node",
  plugins: [],
  target: "node16", // AWS lambda only supports node16, also adjust target in tsconfig.json
};

export function build(buildOptions) {
  esbuild(Object.assign({}, defaultBuildOptions, buildOptions))
    .then((result) => {
      if (process.env.ESBUILD_METADATA) {
        fs.writeFileSync("meta.json", JSON.stringify(result.metafile));
      }
    })
    .catch(() => process.exit(1));
}

build();
