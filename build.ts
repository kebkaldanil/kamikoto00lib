import { build, emptyDir, PackageJson } from "https://deno.land/x/dnt@0.38.0/mod.ts";
import * as flagsModule from "https://deno.land/std@0.194.0/flags/mod.ts";

const args = flagsModule.parse(Deno.args, {
  boolean: [
    "link",
    "publish",
  ],
  string: [
    "dist",
    "package-manager",
    "otp",
  ],
  alias: {
    "dist": ["d"],
    "link": ["l"],
    "package-manager": ["m"],
    "publish": ["p"],
  },
  default: {
    dist: "./dist",
  },
});
const {
  dist: distDir,
  link: doLink,
  publish: doPublish
} = args;
const packageManager = args["package-manager"] || Deno.env.get("PACKAGE_MANAGER") ||
  "npm";

class RunPmCommandError extends Error {
  constructor(
    readonly command: string,
    readonly process: Deno.ChildProcess,
    readonly status: Deno.CommandStatus,
  ) {
    const { code, signal } = status;
    super(`${command} failed. Code" ${code};${signal ? `Signal: ${status.signal}` : ""}`);
  }
}
RunPmCommandError.prototype.name = RunPmCommandError.name;
async function runPmCommand(command: string, options?: Deno.CommandOptions) {
  const args = options?.args ? [command, ...options.args] : [command];
  const _options = {
    stderr: "piped",
    stdout: "piped",
    stdin: "null",
    ...options,
    args,
  } satisfies Deno.CommandOptions;
  console.log(`${packageManager} ${args.join(" ")}`);
  let process: Deno.ChildProcess;
  try {
    process = new Deno.Command(packageManager, _options).spawn();
  } catch (e) {
    if (Deno.build.os === "windows") {
      process = new Deno.Command(packageManager + ".cmd", _options).spawn();
    } else {
      throw e;
    }
  }
  process.stderr.pipeTo(Deno.stderr.writable, { preventClose: true });
  process.stdout.pipeTo(Deno.stdout.writable, { preventClose: true });
  const status = await process.status;
  if (!status.success) {
    throw new RunPmCommandError(`${packageManager} ${args.join(" ")}`, process, status);
  }
  return process;
}

await emptyDir(distDir);

const packageJson = JSON.parse(
  new TextDecoder().decode(await Deno.readFile("./package.json")),
) as PackageJson;

delete packageJson.scripts;
delete packageJson.devDependencies;
delete packageJson.publishConfig;

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
      if (doLink) {
        await link();
      }
      if (doPublish) {
        await publish();
      }
      //Deno.copyFileSync("CHANGELOG.md", "npm/CHANGELOG.md");
      //Deno.copyFileSync("LICENSE", "npm/LICENSE");
      //Deno.copyFileSync("README.md", "npm/README.md");
    } catch (e) {
      console.error(e);
    }
  },
});

async function publish() {
  let otp: string | null | undefined = args.otp || Deno.env.get("OTP");
  if (!(otp && /^(?:\d\s*){6}$/.test(otp))) {
    otp = prompt("Enter code from Authenticator for your npm account to publish: ");
    if (!(otp && /^(?:\d\s*){6}$/.test(otp))) {
      console.log("Incorrect code format, publish failed");
      return;
    }
  }
  await runPmCommand("publish", { cwd: distDir, args: ["--no-git-checks", `--otp=${String.raw`${otp}`}`] });
}

async function link() {
  let args: string[];
  switch (packageManager) {
    case "npm":
    case "yarn":
      args = [];
      break;
    case "pnpm":
      args = ["--global"];
      break;
    default:
      console.warn(`Unknown package manager ${packageManager}, can not link`);
      return;
  }
  await runPmCommand("link", { args, cwd: distDir });
}
