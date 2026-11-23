import { test, expect } from "@playwright/test";

test.describe("Room Listing Page", () => {
  test("displays the page title", async ({ page }) => {
    await page.goto("/rooms");
    await expect(page.getByRole("heading", { name: "Our Rooms & Suites" })).toBeVisible();
  });

  test("shows room cards", async ({ page }) => {
    await page.goto("/rooms");
    const cards = page.locator("a[href^='/rooms/']");
    await expect(cards.first()).toBeVisible();
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test("filters rooms by category", async ({ page }) => {
    await page.goto("/rooms");
    await page.selectOption("#category-filter", "suite");
    const cards = page.locator("a[href^='/rooms/']");
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test("shows empty state when no rooms match", async ({ page }) => {
    await page.goto("/rooms");
    await page.selectOption("#category-filter", "penthouse");
    await page.selectOption("#bed-filter", "twin");
    await expect(page.getByText("No rooms match your filters")).toBeVisible();
  });

  test("navigates to room detail page", async ({ page }) => {
    await page.goto("/rooms");
    const firstCard = page.locator("a[href^='/rooms/']").first();
    const href = await firstCard.getAttribute("href");
    await firstCard.click();
    await page.waitForURL(`**${href}`);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(page.url()).toContain("/rooms/");
  });

  // GAP: No E2E tests for the V2 redesign behind feature flag
  // To run V2 tests, use: NEXT_PUBLIC_FF_ROOM_LISTING_V2=true npm run test:e2e
  // GAP: No tests for amenity filter interactions
  // GAP: No tests for loyalty points badge visibility
  // GAP: No tests for waitlist CTA on sold-out rooms
});

test.describe("Room Detail Page", () => {
  test("displays room information", async ({ page }) => {
    await page.goto("/rooms/harbor-view-king");
    await expect(page.getByRole("heading", { name: "Harbor View King" })).toBeVisible();
    await expect(page.getByText("₹4,200")).toBeVisible();
  });

  test("shows 404 for invalid room", async ({ page }) => {
    await page.goto("/rooms/nonexistent-room");
    await expect(page.getByText("Room Not Found")).toBeVisible();
  });

  test("has booking CTA button", async ({ page }) => {
    await page.goto("/rooms/harbor-view-king");
    await expect(page.getByRole("button", { name: "Book This Room" })).toBeVisible();
  });
});
