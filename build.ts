import { build, emptyDir, PackageJson } from "https://deno.land/x/dnt@0.39.0/mod.ts";
import * as flagsModule from "https://deno.land/std@0.210.0/cli/parse_args.ts";

const textDecoder = new TextDecoder();

const args = flagsModule.parseArgs(Deno.args, {
  boolean: [
    "link",
    "publish",
    "autoformat",
  ],
  string: [
    "dist",
    "package-manager",
    "otp",
  ],
  alias: {
    "dist": ["d"],
    "link": ["l", "ln"],
    "package-manager": ["m", "pm"],
    "publish": ["p"],
    "autoformat": ["f", "format", "autofmt", "fmt"],
  },
  default: {
    dist: "./dist",
  },
});
const {
  dist: distDir,
  link: doLink,
  publish: doPublish,
  autoformat,
} = args;
const packageManager = args["package-manager"] || Deno.env.get("PACKAGE_MANAGER") ||
  "npm";

class RunCommandError extends Error {
  constructor(
    readonly command: string,
    readonly process: Deno.ChildProcess,
    readonly status: Deno.CommandStatus,
  ) {
    const { code, signal } = status;
    super(`${command} failed. Code" ${code};${signal ? `Signal: ${status.signal}` : ""}`);
  }
}
RunCommandError.prototype.name = RunCommandError.name;

async function runCommand(command: string, options?: Deno.CommandOptions) {
  const _options = {
    stderr: "piped",
    stdout: "piped",
    stdin: "null",
    ...options,
  } satisfies Deno.CommandOptions;
  const fullCommand = [command, ...options?.args || []].join(" ");
  console.log(fullCommand);
  const tryVariants = [command];
  if (Deno.build.os === "windows") {
    tryVariants.push(
      command + ".bat",
      command + ".cmd",
      command + ".ps1",
    );
  }
  let firstError: unknown;
  let process: Deno.ChildProcess | undefined;
  while (tryVariants.length) {
    try {
      process = new Deno.Command(tryVariants.pop()!, _options).spawn();
      break;
    } catch (e) {
      if (firstError === undefined) {
        firstError = e;
      }
    }
  }
  if (process === undefined) {
    throw firstError;
  }
  process.stderr.pipeTo(Deno.stderr.writable, { preventClose: true });
  process.stdout.pipeTo(Deno.stdout.writable, { preventClose: true });
  const status = await process.status;
  if (!status.success) {
    throw new RunCommandError(fullCommand, process, status);
  }
  return process;
}

function runPmCommand(command: string, options?: Deno.CommandOptions) {
  const args = [command, ...options?.args || []];
  return runCommand(packageManager, { ...options, args });
}

await emptyDir(distDir);

const packageJson = JSON.parse(textDecoder.decode(await Deno.readFile("./package.json"))) as PackageJson;

delete packageJson.scripts;
delete packageJson.devDependencies;
delete packageJson.publishConfig;

if (autoformat) {
  await format("./src");
}

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
  await runPmCommand("publish", { cwd: distDir, args: ["--no-git-checks", `--otp=${otp.replace(/s+/g, "")}`] });
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

async function format(path: string, cwd?: string) {
  await runCommand("deno", { cwd, args: ["fmt", path] });
}
