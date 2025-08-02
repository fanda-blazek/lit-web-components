import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { generateId } from "../../utils/generate-id.js";
import { dialogManager } from "./dialog-manager.js";
import type { RawDialog } from "./dialog.js";

@customElement("raw-dialog-root")
export class RawDialogRoot extends LitElement {
  // Static properties
  static styles = css`
    :host {
      display: contents;
    }
  `;

  // Public properties
  @property({ type: String })
  id = generateId("dialog-root");

  @property({ type: Boolean, reflect: true, attribute: "data-open" })
  open = false;

  @property({ type: String })
  dismissable = "true";

  @property({ type: Boolean, reflect: true, attribute: "data-nested" })
  isNested = false;

  // Private fields
  private _rawDialog?: RawDialog;
  private _parentDialogRoot?: RawDialogRoot;
  private _isModal = false;

  // Lifecycle methods
  connectedCallback() {
    super.connectedCallback();
    this._detectNestedDialog();
    this.addEventListener("click", this._handleActionClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", this._handleActionClick);
    this._rawDialog?.nativeDialog?.removeEventListener("close", this._handleNativeClose);
  }

  async firstUpdated() {
    this._rawDialog = this.querySelector("raw-dialog") || undefined;
    await this._rawDialog?.updateComplete;
    this._rawDialog?.nativeDialog?.addEventListener("close", this._handleNativeClose);
  }

  render() {
    return html`<slot></slot>`;
  }

  // Public methods
  show() {
    const nativeDialog = this._rawDialog?.nativeDialog;
    if (nativeDialog && !nativeDialog.open) {
      nativeDialog.show();
      this.open = true;
      this._dispatchOpenEvent(false);
    }
  }

  showModal() {
    const nativeDialog = this._rawDialog?.nativeDialog;
    if (nativeDialog && !nativeDialog.open) {
      this._isModal = true;
      dialogManager.registerModal(this.id);
      nativeDialog.showModal();
      this.open = true;
      this._dispatchOpenEvent(true);
    }
  }
  close() {
    const nativeDialog = this._rawDialog?.nativeDialog;
    if (nativeDialog && nativeDialog.open) {
      nativeDialog.close();
    } else if (this._isModal) {
      // Fallback to unlock scroll if dialog is already closed
      dialogManager.unregisterModal(this.id);
      this._isModal = false;
    }
  }

  // For nested state
  get parentDialogRoot() {
    return this._parentDialogRoot;
  }

  // Private methods
  private _handleActionClick = (event: Event) => {
    const target = event.target as HTMLElement;
    const actionTarget = target.closest<HTMLElement>("[data-action]");

    if (!actionTarget) {
      return;
    }

    // Stop propagation only after confirming an action was clicked. - This prevents the event from bubbling up to parent dialogs and closing them as well.
    event.stopPropagation();

    const action = actionTarget.dataset.action;

    switch (action) {
      case "show":
        this.show();
        break;
      case "show-modal":
        this.showModal();
        break;
      case "close":
        this.close();
        break;
    }
  };

  private _dispatchOpenEvent(modal: boolean) {
    this.dispatchEvent(
      new CustomEvent("raw-dialog-open", {
        detail: { modal },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _detectNestedDialog() {
    let parent = this.parentElement;
    while (parent) {
      if (parent instanceof RawDialogRoot) {
        this._parentDialogRoot = parent;
        this.isNested = true;
        break;
      }
      parent = parent.parentElement;
    }
  }

  private _handleNativeClose = (event: Event) => {
    // Only handle events from our own dialog element
    if (event.target !== this._rawDialog?.nativeDialog) {
      return;
    }

    if (this.open) {
      if (this._isModal) {
        dialogManager.unregisterModal(this.id);
        this._isModal = false;
      }
      this.open = false;
      this._dispatchCloseEvent();
    }
  };

  private _dispatchCloseEvent() {
    this.dispatchEvent(
      new CustomEvent("raw-dialog-close", {
        bubbles: true,
        composed: true,
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "raw-dialog-root": RawDialogRoot;
  }
}
