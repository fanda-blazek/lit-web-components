import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { generateId } from "../../utils/generate-id.js";

@customElement("raw-dialog-root")
export class RawDialogRoot extends LitElement {
  static styles = css`
    :host {
      display: contents;
    }
  `;

  @property({ type: String })
  id = generateId("dialog-root");

  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: String })
  dismissable = "true";

  @state()
  private _modal = true;

  @state()
  private _opening = false;

  @state()
  private _closing = false;

  connectedCallback() {
    super.connectedCallback();
    this._updateDataAttributes();
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has("open") || changedProperties.has("_modal")) {
      this._updateDataAttributes();
    }
  }

  private _updateDataAttributes() {
    this.toggleAttribute("data-open", this.open);
    this.toggleAttribute("data-closed", !this.open);
    this.toggleAttribute("data-modal", this._modal);
    this.toggleAttribute("data-opening", this._opening);
    this.toggleAttribute("data-closing", this._closing);
    this.toggleAttribute("data-animating", this._opening || this._closing);
  }

  show() {
    this._modal = false;
    this.open = true;
    this._dispatchOpenEvent(false);
  }

  showModal() {
    this._modal = true;
    this.open = true;
    this._dispatchOpenEvent(true);
  }

  close() {
    this.open = false;
    this._modal = false;
    this._dispatchCloseEvent();
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

  private _dispatchCloseEvent() {
    this.dispatchEvent(
      new CustomEvent("close", {
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "raw-dialog-root": RawDialogRoot;
  }
}
