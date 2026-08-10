import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const navSource = await readFile(
  new URL("../src/components/Nav.astro", import.meta.url),
  "utf8",
);
const layoutSource = await readFile(
  new URL("../src/layouts/Base.astro", import.meta.url),
  "utf8",
);
const sessionClient = await readFile(
  new URL("../public/account-session.js", import.meta.url),
  "utf8",
);
const sessionWorker = await readFile(
  new URL("../public/account-session-sw.js", import.meta.url),
  "utf8",
);

test("marketing account actions terminate at the Sonus Auris Rust web server", () => {
  assert.match(navSource, /const APP_ORIGIN = "https:\/\/user\.sonusauris\.app";/);
  assert.match(navSource, /const LOGIN_URL = `\$\{APP_ORIGIN\}\/login`;/);
  assert.match(navSource, /const SIGNUP_URL = `\$\{APP_ORIGIN\}\/signup`;/);
  assert.match(navSource, /const DASHBOARD_URL = `\$\{APP_ORIGIN\}\/dashboard`;/);
  assert.match(navSource, /data-account-primary/);
  assert.match(navSource, /data-login-href=\{LOGIN_URL\}/);
  assert.match(navSource, /data-dashboard-href=\{DASHBOARD_URL\}/);
  assert.match(navSource, /data-account-signup/);
  assert.match(navSource, /aria-label="Account" aria-live="polite"/);
});

test("unknown session state is neutral and never claims the user is logged out", () => {
  assert.match(navSource, />Account<\/a>/);
  assert.match(navSource, /data-account-signup[\s\S]*?hidden[\s\S]*?>Sign up<\/a>/);
  assert.doesNotMatch(navSource, />Log in<\/a>/);
  assert.doesNotMatch(navSource, />Dashboard<\/a>/);
});

test("session-aware client switches between anonymous and authenticated navigation", () => {
  assert.match(sessionClient, /primary\.textContent = "Log in"/);
  assert.match(sessionClient, /primary\.textContent = "User dashboard"/);
  assert.match(sessionClient, /signup\.hidden = false/);
  assert.match(sessionClient, /signup\.hidden = true/);
  assert.match(sessionClient, /50 \* 60 \* 1000/);
  assert.match(sessionClient, /\/auth\/session\/status/);
  assert.match(sessionClient, /\/auth\/session\/refresh/);
  assert.match(sessionClient, /credentials: "include"/);
  assert.match(sessionClient, /visibilitychange/);
  assert.match(sessionClient, /periodicSync/);
  assert.match(sessionWorker, /periodicsync/);
  assert.match(sessionWorker, /credentials: "include"/);
  assert.match(layoutSource, /connect-src \$\{accountOrigin\}/);
  assert.match(layoutSource, /worker-src 'self'/);
});

test("account navigation preserves download access and isolates every off-origin link", () => {
  assert.match(navSource, /class="download-action" href="#download">Get the app<\/a>/);
  const isolatedExternalLinks = navSource.match(/rel="noopener noreferrer"/g) ?? [];
  assert.equal(isolatedExternalLinks.length, 3);
});

test("the static marketing site contains no browser-readable auth credentials", () => {
  const sources = [navSource, layoutSource, sessionClient, sessionWorker].join("\n");
  assert.doesNotMatch(sources, /SUPABASE_(?:SECRET|SERVICE_ROLE|ANON|PUBLISHABLE)_KEY/);
  assert.doesNotMatch(sources, /AUTH_BROWSER_.*SECRET/);
  assert.doesNotMatch(sources, /Bearer\s+[A-Za-z0-9._~-]+/);
  assert.doesNotMatch(sources, /localStorage|sessionStorage/);
  assert.doesNotMatch(sources, /access_token|refresh_token/);
});
