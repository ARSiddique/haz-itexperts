// lib/track.js
export function track(eventName, params = {}) {
  try {
    if (typeof window === "undefined") return;

    const safeParams = {
      // helpful defaults
      page_path: params.page_path ?? window.location?.pathname,
      page_location: params.page_location ?? window.location?.href,
      ...params,
    };

    // gtag available
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, safeParams);
      return;
    }

    // fallback: dataLayer push
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: eventName, ...safeParams });
    }
  } catch {
    // ignore
  }
}
