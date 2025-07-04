import { test, expect } from "playwright-test-coverage";

test("should navigate to the about page", async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto("/");
  // Find an element with the text 'About' and click on it
  await page.click("text=about");
  // The new URL should be "/about" (baseURL is used there)
  await expect(page).toHaveURL("/about");
  // The new page should contain an h1 with "About"
  // await expect(page.locator("h1")).toContainText("About");
});

test("should test do something", async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto("/");
  // Find an element with the text 'About' and click on it
  await page.click("text=Do Something");
  // The new URL should be "/about" (baseURL is used there)
  // The new page should contain an h1 with "About"
  await expect(page.locator("p")).toContainText("Something was done");
});
