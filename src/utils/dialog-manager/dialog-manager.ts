import { scrollLock } from "../scroll-lock.js";

class DialogManager {
  private activeModals = new Set<string>();

  registerModal(id: string): void {
    const wasEmpty = this.activeModals.size === 0;
    this.activeModals.add(id);

    if (wasEmpty) {
      scrollLock.lock();
    }
  }

  unregisterModal(id: string): void {
    this.activeModals.delete(id);

    if (this.activeModals.size === 0) {
      scrollLock.unlock();
    }
  }

  clear(): void {
    this.activeModals.clear();
    scrollLock.unlock();
  }
}

export const dialogManager = new DialogManager();
