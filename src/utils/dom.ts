export function isBrowser(): boolean {
  return typeof document !== "undefined";
}

export function getNavigator(): Navigator | null {
  return isBrowser() ? window.navigator : null;
}
