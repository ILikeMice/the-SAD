import esbuild from "npm:esbuild";
import { denoPlugins } from "jsr:@luca/esbuild-deno-loader";

const context = await esbuild.context({
	plugins: [...denoPlugins()],
	bundle: true,
	entryPoints: ["extension/mod.ts", "extension/popup.ts", "extension/dom.ts"],
	outdir: "extension",
});

await context.watch();
