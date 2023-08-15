import { build, emptyDir, PackageJson } from "https://deno.land/x/dnt@0.38.0/mod.ts";
import * as flagsModule from "https://deno.land/std@0.194.0/flags/mod.ts";

const args = flagsModule.parse(Deno.args, {
  string: ["d"],
  default: {
    d: "./dist",
  },
});
const distDir = args.d;

await emptyDir(distDir);

const packageJson = JSON.parse(
  new TextDecoder().decode(await Deno.readFile("./package.json")),
) as PackageJson;

delete packageJson.scripts;
delete packageJson.devDependencies;

await build({
  entryPoints: ["./src/index.ts"],
  outDir: distDir,
  shims: {
    deno: true,
  },
  package: packageJson,
  packageManager: "pnpm",
  postBuild() {
    (async () => {
      const process = new Deno.Command("pnpm", {
        args: ["link", "-g"],
        cwd: distDir,
        stderr: "piped",
        stdout: "piped",
        stdin: "null",
      }).spawn();
      process.stderr.pipeTo(Deno.stderr.writable, { preventClose: true });
      process.stdout.pipeTo(Deno.stdout.writable, { preventClose: true });
      const { code, signal, success } = await process.status;
      if (!success) {
        throw new Error(
          `pnpm link failed with code ${code} and signal ${signal}`,
        );
      }
    })().catch(console.error);
    //Deno.copyFileSync("CHANGELOG.md", "npm/CHANGELOG.md");
    //Deno.copyFileSync("LICENSE", "npm/LICENSE");
    //Deno.copyFileSync("README.md", "npm/README.md");
  },
});
