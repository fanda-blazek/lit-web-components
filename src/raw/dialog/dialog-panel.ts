import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { generateId } from "../../utils/generate-id.js";

@customElement("raw-dialog-panel")
export class RawDialogPanel extends LitElement {
  // Static properties
  static styles = css`
    :host {
      display: block;
    }
  `;

  // Public properties
  @property({ type: String })
  id = generateId("dialog-panel");

  // Lifecycle methods
  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "raw-dialog-panel": RawDialogPanel;
  }
}
