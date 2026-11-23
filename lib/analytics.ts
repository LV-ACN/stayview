import type { AnalyticsEvent } from "@/types";

const ANALYTICS_ENDPOINT = process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT ?? "/api/analytics";

const eventQueue: AnalyticsEvent[] = [];
let flushTimer: ReturnType<typeof setTimeout> | null = null;

function flush(): void {
  if (eventQueue.length === 0) return;

  const batch = eventQueue.splice(0, eventQueue.length);

  if (typeof navigator !== "undefined" && navigator.sendBeacon) {
    navigator.sendBeacon(ANALYTICS_ENDPOINT, JSON.stringify(batch));
  }
}

function enqueue(event: AnalyticsEvent): void {
  eventQueue.push(event);

  if (flushTimer) clearTimeout(flushTimer);
  flushTimer = setTimeout(flush, 2000);
}

export function trackPageView(pageName: string, properties?: Record<string, string | number | boolean>): void {
  enqueue({
    name: `${pageName}_page_view`,
    properties: {
      ...properties,
      url: typeof window !== "undefined" ? window.location.href : "",
    },
    timestamp: Date.now(),
  });
}

export function trackEvent(eventName: string, properties?: Record<string, string | number | boolean>): void {
  enqueue({
    name: eventName,
    properties,
    timestamp: Date.now(),
  });
}

export function trackClick(pageName: string, element: string, properties?: Record<string, string | number | boolean>): void {
  trackEvent(`${pageName}_${element}_click`, properties);
}

export function trackFormSubmit(pageName: string, formName: string, properties?: Record<string, string | number | boolean>): void {
  trackEvent(`${pageName}_${formName}_submit`, properties);
}
