import { describe, it, expect } from "vitest";
import { isFeatureEnabled, getAllFlags, getFlag } from "./feature-flags";

describe("isFeatureEnabled", () => {
  it("returns true for enabled flags", () => {
    expect(isFeatureEnabled("new-booking-flow")).toBe(true);
  });

  it("returns false for disabled flags", () => {
    expect(isFeatureEnabled("dynamic-pricing-badge")).toBe(false);
  });

  it("returns false for unknown flags", () => {
    expect(isFeatureEnabled("nonexistent-flag")).toBe(false);
  });

  it("respects NEXT_PUBLIC_FF_ environment variable override", () => {
    process.env.NEXT_PUBLIC_FF_DYNAMIC_PRICING_BADGE = "true";
    expect(isFeatureEnabled("dynamic-pricing-badge")).toBe(true);
    delete process.env.NEXT_PUBLIC_FF_DYNAMIC_PRICING_BADGE;
  });

  it("env override false takes precedence over static config", () => {
    process.env.NEXT_PUBLIC_FF_NEW_BOOKING_FLOW = "false";
    expect(isFeatureEnabled("new-booking-flow")).toBe(false);
    delete process.env.NEXT_PUBLIC_FF_NEW_BOOKING_FLOW;
  });
});

describe("getAllFlags", () => {
  it("returns all feature flags", () => {
    const flags = getAllFlags();
    expect(flags.length).toBeGreaterThan(0);
  });
});

describe("getFlag", () => {
  it("returns flag details", () => {
    const flag = getFlag("new-booking-flow");
    expect(flag?.key).toBe("new-booking-flow");
    expect(flag?.enabled).toBe(true);
  });

  it("returns undefined for unknown flag", () => {
    expect(getFlag("nonexistent")).toBeUndefined();
  });
});
