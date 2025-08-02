import { isBrowser } from "./dom";
import { isWebKit, isIOS } from "./platform";

let isLocked = false;
let scrollPosition = { x: 0, y: 0 };
let previousBodyPaddingRight = "";
let previousBodyOverflow = "";
let previousHtmlOverflow = "";

function getScrollbarWidth() {
  if (!isBrowser()) return 0;
  // Use Math.max to handle negative values in Firefox
  return Math.max(0, window.innerWidth - document.documentElement.clientWidth);
}

function getScrollbarHeight() {
  if (!isBrowser()) return 0;
  // Use Math.max to handle negative values in Firefox
  return Math.max(
    0,
    window.innerHeight - document.documentElement.clientHeight,
  );
}

function hasScrollbar() {
  if (!isBrowser()) return false;
  return document.documentElement.scrollHeight > window.innerHeight;
}

function saveScrollPosition() {
  scrollPosition = {
    x: window.pageXOffset || document.documentElement.scrollLeft,
    y: window.pageYOffset || document.documentElement.scrollTop,
  };
}

function restoreScrollPosition() {
  window.scrollTo(scrollPosition.x, scrollPosition.y);
}

function lockScroll() {
  if (!isBrowser() || isLocked) return;

  const doc = document.documentElement;
  const body = document.body;

  if (!doc || !body) return;

  // Pinch-zoom in Safari causes a shift. Don't lock if there's any pinch-zoom.
  if (
    isWebKit() &&
    window.visualViewport &&
    window.visualViewport.scale !== 1
  ) {
    return;
  }

  isLocked = true;

  // Save current scroll position
  saveScrollPosition();

  // Save original styles we'll modify
  previousBodyPaddingRight = body.style.paddingRight;
  previousBodyOverflow = body.style.overflow;
  previousHtmlOverflow = doc.style.overflow;

  // Calculate and apply scrollbar compensation
  const scrollbarWidth = getScrollbarWidth();
  if (scrollbarWidth > 0) {
    body.style.paddingRight = `${scrollbarWidth}px`;
  }

  // Apply overflow hidden to both html and body for better cross-browser support
  body.style.overflow = "hidden";
  doc.style.overflow = "hidden";

  // For iOS Safari, we need additional handling
  if (isIOS()) {
    body.style.position = "fixed";
    body.style.top = `-${scrollPosition.y}px`;
    body.style.left = `-${scrollPosition.x}px`;
    body.style.width = "100%";
  }
}

function unlockScroll() {
  if (!isBrowser() || !isLocked) return;

  const doc = document.documentElement;
  const body = document.body;

  if (!doc || !body) return;

  isLocked = false;

  // Restore body styles
  body.style.paddingRight = previousBodyPaddingRight;
  body.style.overflow = previousBodyOverflow;
  doc.style.overflow = previousHtmlOverflow;

  // iOS Safari specific cleanup
  if (isIOS()) {
    body.style.position = "";
    body.style.top = "";
    body.style.left = "";
    body.style.width = "";
  }

  // Restore scroll position after styles are reset
  restoreScrollPosition();
}

function isScrollLocked() {
  return isLocked;
}

function reset() {
  isLocked = false;
  scrollPosition = { x: 0, y: 0 };
  previousBodyPaddingRight = "";
  previousBodyOverflow = "";
  previousHtmlOverflow = "";

  if (!isBrowser()) return;

  const doc = document.documentElement;
  const body = document.body;

  if (doc && body) {
    body.style.paddingRight = "";
    body.style.overflow = "";
    body.style.position = "";
    body.style.top = "";
    body.style.left = "";
    body.style.width = "";
    doc.style.overflow = "";
  }
}

export const scrollLock = {
  lock: lockScroll,
  unlock: unlockScroll,
  isLocked: isScrollLocked,
  reset,
  hasScrollbar,
  getScrollbarWidth,
  getScrollbarHeight,
};
