import type { FeatureFlag } from "@/types";

const FLAGS: Record<string, FeatureFlag> = {
  "new-booking-flow": {
    key: "new-booking-flow",
    enabled: true,
    description: "Redesigned multi-step booking form",
  },
  "loyalty-points-display": {
    key: "loyalty-points-display",
    enabled: true,
    description: "Show loyalty points earning estimate on room cards",
  },
  "dynamic-pricing-badge": {
    key: "dynamic-pricing-badge",
    enabled: false,
    description: "Show dynamic pricing indicator when rates fluctuate",
  },
};

export function isFeatureEnabled(flagKey: string): boolean {
  if (typeof process !== "undefined" && process.env) {
    const envKey = `NEXT_PUBLIC_FF_${flagKey.toUpperCase().replace(/-/g, "_")}`;
    const envVal = process.env[envKey];
    if (envVal === "true") return true;
    if (envVal === "false") return false;
  }
  const flag = FLAGS[flagKey];
  if (!flag) return false;
  return flag.enabled;
}

export function getAllFlags(): FeatureFlag[] {
  return Object.values(FLAGS);
}

export function getFlag(flagKey: string): FeatureFlag | undefined {
  return FLAGS[flagKey];
}
