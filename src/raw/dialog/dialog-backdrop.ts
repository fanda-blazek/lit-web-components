import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("raw-dialog-backdrop")
export class RawDialogBackdrop extends LitElement {
  // Static properties
  static styles = css`
    :host {
      display: block;
    }
  `;

  // Lifecycle methods
  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "raw-dialog-backdrop": RawDialogBackdrop;
  }
}
