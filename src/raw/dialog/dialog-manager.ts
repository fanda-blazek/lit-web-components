import { scrollLock } from "../../utils/scroll-lock.js";

class DialogManager {
  private activeModals: string[] = [];

  registerModal(id: string): void {
    if (this.activeModals.length === 0) {
      scrollLock.lock();
    }
    // Add the new dialog to the top of the stack
    this.activeModals.push(id);
  }

  unregisterModal(id: string): void {
    // Remove the dialog from the stack
    this.activeModals = this.activeModals.filter((modalId) => modalId !== id);

    if (this.activeModals.length === 0) {
      scrollLock.unlock();
    }
  }

  isTopmost(id: string): boolean {
    if (this.activeModals.length === 0) {
      return false;
    }
    return this.activeModals[this.activeModals.length - 1] === id;
  }

  clear(): void {
    this.activeModals = [];
    scrollLock.unlock();
  }
}

export const dialogManager = new DialogManager();
