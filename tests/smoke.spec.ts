import { expect, test } from "@playwright/test";
import { configureAxe } from "@axe-core/playwright";

// Basic smoke test to capture a screenshot of the landing page hero.
test("landing page renders hero", async ({ page }) => {
  await page.goto("/");

  const axe = configureAxe({ page });
  await axe.setTags(["wcag2a", "wcag2aa"]);

  await expect(
    page.getByRole("heading", {
      name: /30 minutes that could transform youth justice forever/i,
    }),
  ).toBeVisible();

  // wait for the counter animation to settle
  await page.waitForTimeout(1500);

  await page.screenshot({ path: "test-artifacts/hero.png", fullPage: true });

  const accessibilityScanResults = await axe.analyze();
  expect(accessibilityScanResults.violations).toEqual([]);
});
