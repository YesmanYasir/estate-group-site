import { execFileSync } from "node:child_process";
import { randomBytes } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { fileURLToPath } from "node:url";

const wranglerCli = fileURLToPath(new URL("../node_modules/wrangler/bin/wrangler.js", import.meta.url));
function run(args, { input } = {}) {
  try {
    return execFileSync(process.execPath, [wranglerCli, ...args], {
      encoding: "utf8",
      input,
      stdio: ["pipe", "pipe", "pipe"],
    });
  } catch (error) {
    const detail = [error.stdout, error.stderr, error.message].filter(Boolean).join("\n");
    throw new Error(detail.trim());
  }
}

console.log("Cloudflare setup — this creates the free database and image bucket for your site.\n");
try { run(["whoami"]); }
catch (error) {
  console.error("Cloudflare authentication check failed:", error.message);
  console.error("Check the login with: npx wrangler whoami");
  process.exit(1);
}

let config = readFileSync("wrangler.jsonc", "utf8");
const dbId = config.match(/"database_id"\s*:\s*"([^"]+)"/)?.[1];
if (!dbId || dbId === "00000000-0000-0000-0000-000000000001") {
  console.log("Creating D1 database…");
  const created = run(["d1", "create", "estate-group"]);
  const newId = created.match(/database_id\s*=\s*["']([^"']+)["']/)?.[1] || created.match(/"database_id"\s*:\s*"([^"]+)"/)?.[1];
  if (!newId) throw new Error("Cloudflare created the database but its ID could not be read. Copy the ID shown by `npx wrangler d1 create estate-group` into wrangler.jsonc.");
  config = config.replace(/("database_id"\s*:\s*)"[^"]+"/, `$1"${newId}"`);
  writeFileSync("wrangler.jsonc", config);
} else {
  console.log("D1 database is already configured.");
}

console.log("Creating or checking the photo bucket…");
try { run(["r2", "bucket", "create", "estate-group-media"]); }
catch (error) { if (!/already exists|already owned/i.test(error.message)) throw error; }

console.log("Applying the database schema…");
run(["d1", "migrations", "apply", "estate-group", "--remote"]);

const rl = createInterface({ input: stdin, output: stdout });
const adminEmails = (await rl.question("Google admin email(s), comma-separated: ")).split(",").map((email) => email.trim().toLocaleLowerCase()).filter(Boolean);
const googleClientId = (await rl.question("Google OAuth Client ID: ")).trim();
const googleClientSecret = (await rl.question("Google OAuth Client secret: ")).trim();
rl.close();
if (!adminEmails.length || adminEmails.some((email) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) throw new Error("Enter one or more valid Google email addresses, separated by commas.");
if (!googleClientId || !googleClientSecret) throw new Error("Enter the OAuth Client ID and secret from Google Cloud, then run setup again.");
console.log("Saving the admin allowlist and Google OAuth credentials as Cloudflare Worker secrets…");
run(["secret", "put", "ADMIN_EMAIL"], { input: `${adminEmails.join(",")}\n` });
run(["secret", "put", "AUTH_GOOGLE_ID"], { input: `${googleClientId}\n` });
run(["secret", "put", "AUTH_GOOGLE_SECRET"], { input: `${googleClientSecret}\n` });
run(["secret", "put", "AUTH_SECRET"], { input: `${randomBytes(48).toString("base64url")}\n` });
console.log("\nSetup complete. Deploy with: npm run cf:deploy");
