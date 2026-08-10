import type { Page } from "@playwright/test";

import { ACCOUNT_ORIGIN, expect, test } from "./fixtures";

const SESSION_GLOB = `${ACCOUNT_ORIGIN}/auth/session/**`;

async function installSessionStub(
  page: Page,
  baseURL: string | undefined,
  authenticated: boolean,
  requests: string[],
) {
  await page.unroute(SESSION_GLOB);
  const origin = new URL(baseURL ?? "http://127.0.0.1:4321").origin;
  await page.route(SESSION_GLOB, async (route) => {
    requests.push(`${route.request().method()} ${new URL(route.request().url()).pathname}`);
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      headers: {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Credentials": "true",
        "Cache-Control": "no-store",
      },
      body: JSON.stringify({
        authenticated,
        refreshAfterSeconds: 3000,
      }),
    });
  });
}

test("anonymous session resolves Account to Log in and reveals Sign up", async ({
  page,
  baseURL,
}) => {
  const requests: string[] = [];
  await installSessionStub(page, baseURL, false, requests);

  await page.goto("/");

  const account = page.getByRole("group", { name: "Account" });
  await expect(account.getByRole("link", { name: "Log in", exact: true })).toHaveAttribute(
    "href",
    `${ACCOUNT_ORIGIN}/login`,
  );
  await expect(account.getByRole("link", { name: "Sign up", exact: true })).toBeVisible();
  await expect(account.getByRole("link", { name: "User dashboard", exact: true })).toHaveCount(0);
  expect(requests[0]).toBe("GET /auth/session/status");
});

test("existing session renders User dashboard and refreshes on foreground recovery", async ({
  page,
  baseURL,
}) => {
  const requests: string[] = [];
  await installSessionStub(page, baseURL, true, requests);

  await page.goto("/");

  const account = page.getByRole("group", { name: "Account" });
  await expect(
    account.getByRole("link", { name: "User dashboard", exact: true }),
  ).toHaveAttribute("href", `${ACCOUNT_ORIGIN}/dashboard`);
  await expect(account.locator("[data-account-signup]")).toBeHidden();
  await expect(account.getByRole("link", { name: "Log in", exact: true })).toHaveCount(0);

  await page.evaluate(() => window.dispatchEvent(new Event("online")));
  await expect
    .poll(() => requests.filter((entry) => entry === "POST /auth/session/refresh").length)
    .toBeGreaterThan(0);
});
