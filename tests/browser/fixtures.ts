import { expect, test as base } from "@playwright/test";

/**
 * Every public route the site builds. `routes.spec.ts` cross-checks this list
 * against the generated `dist/` tree, so a new page cannot be added without
 * also being covered here.
 */
export const ROUTES = [
  "/",
  "/privacy/",
  "/account-deletion/",
  "/support/",
] as const;

export type Route = (typeof ROUTES)[number];

export const PAGE_TITLES: Record<Route, string> = {
  "/": "Sonus Auris — A Dashcam for Audio",
  "/privacy/": "Privacy Policy — Sonus Auris",
  "/account-deletion/": "Delete your account and data — Sonus Auris",
  "/support/": "Support — Sonus Auris",
};

export const MOBILE_VIEWPORT = { width: 390, height: 844 };
export const DESKTOP_VIEWPORT = { width: 1440, height: 900 };
export const ACCOUNT_ORIGIN = "https://user.sonusauris.app";
const SESSION_PREFIX = `${ACCOUNT_ORIGIN}/auth/session/`;

/**
 * Auto-applied fixture that fails any test whose page logged a console error,
 * threw an uncaught exception, failed a request, or reached an unapproved
 * origin. The sole cross-origin allowance is the token-blind session status /
 * refresh contract on the Rust customer web server. It is stubbed anonymous by
 * default so the public-site suite is deterministic and never reaches a live
 * account service.
 */
export const test = base.extend<{ pageProblems: string[] }>({
  pageProblems: [
    async ({ page, baseURL }, use) => {
      const problems: string[] = [];
      const origin = new URL(baseURL ?? "http://127.0.0.1:4321").origin;

      await page.route(`${ACCOUNT_ORIGIN}/auth/session/**`, async (route) => {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          headers: {
            "Access-Control-Allow-Origin": origin,
            "Access-Control-Allow-Credentials": "true",
            "Cache-Control": "no-store",
          },
          body: JSON.stringify({
            authenticated: false,
            refreshAfterSeconds: 3000,
          }),
        });
      });

      page.on("console", (message) => {
        if (message.type() === "error") {
          problems.push(`console.error: ${message.text()}`);
        }
      });
      page.on("pageerror", (error) => {
        problems.push(`pageerror: ${error.message}`);
      });
      page.on("requestfailed", (request) => {
        problems.push(
          `requestfailed: ${request.url()} (${request.failure()?.errorText})`,
        );
      });
      page.on("request", (request) => {
        const url = request.url();
        if (!url.startsWith("http")) return;
        if (new URL(url).origin === origin) return;
        if (url.startsWith(SESSION_PREFIX)) return;
        problems.push(`off-origin request: ${url}`);
      });

      await use(problems);

      expect(
        problems,
        "page logged errors, failed requests, or requested an unapproved origin",
      ).toEqual([]);
    },
    { auto: true },
  ],
});

export { expect };
