import { execFileSync } from "node:child_process";
import { platform } from "node:os";

const isWindows = platform() === "win32";
const npx = isWindows ? "npx.cmd" : "npx";

execFileSync(npx, ["--yes", "skills@latest", "experimental_install", "--no-frozen-lockfile"], { stdio: "inherit", shell: isWindows });

const impeccable = isWindows
  ? ".agents/skills/impeccable/scripts/impeccable.cmd"
  : ".agents/skills/impeccable/scripts/impeccable";
execFileSync(impeccable, ["hooks", "on"], { stdio: "inherit", shell: isWindows });
