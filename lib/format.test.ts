import { describe, it, expect } from "vitest";
import { formatCurrency, formatDate, pluralize, slugify } from "./format";

describe("formatCurrency", () => {
  it("formats INR amounts", () => {
    expect(formatCurrency(4200)).toBe("₹4,200");
  });

  it("formats large amounts with commas", () => {
    expect(formatCurrency(6000)).toBe("₹6,000");
  });
});

describe("formatDate", () => {
  it("formats date strings", () => {
    const result = formatDate("2026-12-25");
    expect(result).toContain("Dec");
    expect(result).toContain("25");
    expect(result).toContain("2026");
  });
});

describe("pluralize", () => {
  it("returns singular for count of 1", () => {
    expect(pluralize(1, "room")).toBe("room");
  });

  it("returns plural for count > 1", () => {
    expect(pluralize(3, "room")).toBe("rooms");
  });

  it("supports custom plural form", () => {
    expect(pluralize(2, "person", "people")).toBe("people");
  });
});

describe("slugify", () => {
  it("converts text to slug", () => {
    expect(slugify("Harbor View King")).toBe("harbor-view-king");
  });

  it("removes special characters", () => {
    expect(slugify("Room #1 — Deluxe")).toBe("room-1-deluxe");
  });
});
