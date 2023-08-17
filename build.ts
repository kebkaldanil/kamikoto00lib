import { build, emptyDir, PackageJson } from "https://deno.land/x/dnt@0.38.0/mod.ts";
import * as flagsModule from "https://deno.land/std@0.194.0/flags/mod.ts";

const args = flagsModule.parse(Deno.args, {
  string: ["d", "package-manager"],
  alias: {
    "package-manager": ["m"],
  },
  default: {
    d: "./dist",
  },
});
const distDir = args.d;
const packageManager = args["package-manager"] || Deno.env.get("PACKAGE_MANAGER") ||
  "npm";

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
  packageManager: packageManager,
  async postBuild() {
    try {
      let args: string[];
      switch (packageManager) {
        case "npm":
        case "yarn":
          args = ["link"];
          break;
        case "pnpm":
          args = ["link", "--global"];
          break;
        default:
          console.warn(`Unknown package manager ${packageManager}, can not link`);
          return;
      }
      console.log(`${packageManager} ${args.join(" ")}`);
      let process: Deno.ChildProcess;
      try {
        process = new Deno.Command(packageManager, {
          args,
          cwd: distDir,
          stderr: "piped",
          stdout: "piped",
          stdin: "null",
        }).spawn();
      } catch (e) {
        process = new Deno.Command(packageManager + ".cmd", {
          args,
          cwd: distDir,
          stderr: "piped",
          stdout: "piped",
          stdin: "null",
        }).spawn();
      }
      process.stderr.pipeTo(Deno.stderr.writable, { preventClose: true });
      process.stdout.pipeTo(Deno.stdout.writable, { preventClose: true });
      const { code, signal, success } = await process.status;
      if (!success) {
        throw new Error(
          `${packageManager} link failed with code ${code} and signal ${signal}`,
        );
      }
    } catch (e) {
      console.error(e);
    }
    //Deno.copyFileSync("CHANGELOG.md", "npm/CHANGELOG.md");
    //Deno.copyFileSync("LICENSE", "npm/LICENSE");
    //Deno.copyFileSync("README.md", "npm/README.md");
  },
});
