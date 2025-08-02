import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { generateId } from "../../utils/generate-id.js";

@customElement("raw-dialog-backdrop")
export class RawDialogBackdrop extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  @property({ type: String })
  id = generateId("dialog-backdrop");

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "raw-dialog-backdrop": RawDialogBackdrop;
  }
}
