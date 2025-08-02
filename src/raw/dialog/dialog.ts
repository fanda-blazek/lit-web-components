import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { generateId } from "../../utils/generate-id.js";

@customElement("raw-dialog")
export class RawDialog extends LitElement {
  // Static properties
  static styles = css`
    :host {
      display: contents;
    }
  `;

  // Public properties
  @property({ type: String })
  id = generateId("dialog");

  // Private fields
  private _dialogElement?: HTMLDialogElement;

  // Lifecycle methods
  firstUpdated() {
    this._dialogElement = this.shadowRoot?.querySelector("dialog") || undefined;
  }

  render() {
    return html`
      <dialog>
        <slot></slot>
      </dialog>
    `;
  }

  // Public methods
  get nativeDialog() {
    return this._dialogElement;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "raw-dialog": RawDialog;
  }
}
