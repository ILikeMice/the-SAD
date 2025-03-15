import esbuild from "npm:esbuild";
import { denoPlugins } from "jsr:@luca/esbuild-deno-loader";

const context = await esbuild.context({
	plugins: [...denoPlugins()],
	entryPoints: ["extension/mod.ts"],
	bundle: true,
	outfile: "extension/mod.js",
});

await context.watch();
