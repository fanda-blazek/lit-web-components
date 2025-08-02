import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { generateId } from "../../utils/generate-id.js";
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

  // Lifecycle methods
  connectedCallback() {
    super.connectedCallback();
    this._detectNestedDialog();
    this._setupActionListeners();
  }

  firstUpdated() {
    this._rawDialog = this.querySelector("raw-dialog") || undefined;
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(changedProperties);
  }

  render() {
    return html`<slot></slot>`;
  }

  // Public methods
  show() {
    const nativeDialog = this._rawDialog?.nativeDialog;
    if (nativeDialog) {
      nativeDialog.show();
      this.open = true;
      this._dispatchOpenEvent(false);
    }
  }

  showModal() {
    const nativeDialog = this._rawDialog?.nativeDialog;
    if (nativeDialog) {
      nativeDialog.showModal();
      this.open = true;
      this._dispatchOpenEvent(true);
    }
  }

  close() {
    const nativeDialog = this._rawDialog?.nativeDialog;
    if (nativeDialog) {
      nativeDialog.close();
      this.open = false;
      this._dispatchCloseEvent();
    }
  }

  // For nested state
  get parentDialogRoot() {
    return this._parentDialogRoot;
  }

  // Private methods
  private _setupActionListeners() {
    // Find all elements with data-action within this root
    const actionElements = this.querySelectorAll("[data-action]");

    actionElements.forEach((element) => {
      element.addEventListener("click", this._handleActionClick.bind(this));
    });
  }

  private _handleActionClick(event: Event) {
    const target = event.target as HTMLElement;
    const action = target.getAttribute("data-action");

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
  }

  private _dispatchOpenEvent(modal: boolean) {
    this.dispatchEvent(
      new CustomEvent("open", {
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

  private _dispatchCloseEvent() {
    this.dispatchEvent(
      new CustomEvent("close", {
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
