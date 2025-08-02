import { getNavigator, isBrowser } from "./dom";

function matchUserAgent(pattern: RegExp): boolean {
  const nav = getNavigator();
  if (!nav) return false;

  const userAgentData = (nav as any).userAgentData;
  if (userAgentData?.brands) {
    const brands = userAgentData.brands as Array<{
      brand: string;
      version: string;
    }>;
    if (brands.some((item) => pattern.test(item.brand))) {
      return true;
    }
  }

  // Fallback to traditional userAgent
  return pattern.test(nav.userAgent);
}

function matchPlatform(pattern: RegExp): boolean {
  const nav = getNavigator();
  if (!nav) return false;

  const userAgentData = (nav as any).userAgentData;
  if (userAgentData?.platform) {
    return pattern.test(userAgentData.platform);
  }

  // Fallback to traditional platform
  return pattern.test(nav.platform);
}

// Platform detection functions
export function isMacOS(): boolean {
  return matchPlatform(/^Mac/i);
}

export function isIPhone(): boolean {
  return matchPlatform(/^iPhone/i);
}

export function isIPad(): boolean {
  // iPad detection - newer iPads report as Mac fix by checking navigator.maxTouchPoints
  return (
    matchPlatform(/^iPad/i) ||
    (isMacOS() && "maxTouchPoints" in navigator && navigator.maxTouchPoints > 1)
  );
}

export function isIOS(): boolean {
  return isIPhone() || isIPad();
}

export function isApple(): boolean {
  return isMacOS() || isIOS();
}

export function isSafari(): boolean {
  // Safari detection - check for webkit but not Chrome
  return matchUserAgent(/Safari/i) && !matchUserAgent(/Chrome|Chromium|CriOS/i);
}

export function isChrome(): boolean {
  return matchUserAgent(/Chrome|Chromium|CriOS/i);
}

export function isFirefox(): boolean {
  return matchUserAgent(/Firefox|FxiOS/i);
}

export function isAndroid(): boolean {
  return matchUserAgent(/Android/i);
}

export function isWindows(): boolean {
  return matchPlatform(/^Win/i);
}

export function isLinux(): boolean {
  return matchPlatform(/^Linux/i);
}

// Touch support detection
export function hasTouchSupport(): boolean {
  if (!isBrowser()) return false;
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    (navigator as any).msMaxTouchPoints > 0
  );
}

// Mobile detection
export function isMobile(): boolean {
  return isIOS() || isAndroid() || matchUserAgent(/Mobile|Tablet/i);
}

// WebKit detection
export function isWebKit(): boolean {
  if (!isBrowser()) return false;
  return (
    "WebkitAppearance" in document.documentElement.style ||
    "webkitRequestAnimationFrame" in window
  );
}
