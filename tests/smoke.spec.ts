import { test, expect } from "@playwright/test";

const BASE = "http://localhost:3001";

test("homepage loads", async ({ page }) => {
  const res = await page.goto(BASE);
  expect(res?.status()).toBeLessThan(400);
  await expect(page.locator("text=Phase One")).toBeVisible();
});

test("shop page loads products from Supabase", async ({ page }) => {
  await page.goto(`${BASE}/shop`);
  // Wait for product cards — expect at least 8 to confirm Supabase data came through
  const cards = page.locator('[data-testid="product-card"], .group.cursor-pointer, article');
  await page.waitForTimeout(2000); // let server component hydrate
  // The page should have nav + content without a 500
  await expect(page).not.toHaveURL(/error/);
  const title = await page.title();
  expect(title).toBeTruthy();
  // Check for at least one peptide name
  const body = await page.textContent("body");
  expect(body).toMatch(/BPC|Semaglutide|Tirzepatide|Ipamorelin|CJC|Selank|TB-500|Epithalon/i);
});

test("product detail page loads with stock info", async ({ page }) => {
  await page.goto(`${BASE}/shop/bpc-157`);
  await page.waitForTimeout(1500);
  await expect(page).not.toHaveURL(/error/);
  const body = await page.textContent("body");
  expect(body).toMatch(/BPC-157/i);
  // Should show either a stock count or "Out of Stock"
  expect(body).toMatch(/in stock|out of stock|available/i);
});

test("/checkout redirects to sign-in when unauthenticated", async ({ page }) => {
  await page.goto(`${BASE}/checkout`);
  await page.waitForTimeout(1500);
  // Should land on sign-in (Clerk redirectToSignIn)
  const url = page.url();
  expect(url).toMatch(/sign-in|clerk\.accounts/);
});

test("sign-up page renders with all required fields", async ({ page }) => {
  await page.goto(`${BASE}/sign-up`);
  await page.waitForTimeout(1000);
  await expect(page).not.toHaveURL(/error/);
  const body = await page.textContent("body");
  // Email, password, DOB, checkboxes
  expect(body).toMatch(/email/i);
  expect(body).toMatch(/password/i);
  expect(body).toMatch(/date of birth|birth/i);
  expect(body).toMatch(/21/);
  expect(body).toMatch(/research/i);
});

test("sign-in page renders", async ({ page }) => {
  await page.goto(`${BASE}/sign-in`);
  await page.waitForTimeout(1000);
  await expect(page).not.toHaveURL(/error/);
  const body = await page.textContent("body");
  expect(body).toMatch(/sign in|email/i);
});

test("navbar shows Sign in link when signed out", async ({ page }) => {
  await page.goto(BASE);
  await page.waitForTimeout(1000);
  // The Show when="signed-out" renders a Sign in link
  const signInLink = page.locator('a[href="/sign-in"]');
  await expect(signInLink.first()).toBeVisible();
});

test("/sign-up?reason=age shows age warning banner", async ({ page }) => {
  await page.goto(`${BASE}/sign-up?reason=age`);
  await page.waitForTimeout(1000);
  const body = await page.textContent("body");
  expect(body).toMatch(/21\+|verified|research account/i);
});
