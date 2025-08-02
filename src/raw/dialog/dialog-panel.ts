import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { generateId } from "../../utils/generate-id.js";

@customElement("raw-dialog-panel")
export class RawDialogPanel extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  @property({ type: String })
  id = generateId("dialog-panel");

  @state()
  private _nested = false;

  @state()
  private _childDialogOpen = false;

  connectedCallback() {
    super.connectedCallback();
    this._updateDataAttributes();
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has("_nested") || changedProperties.has("_childDialogOpen")) {
      this._updateDataAttributes();
    }
  }

  private _updateDataAttributes() {
    // Data attributes for styling
    this.toggleAttribute("data-nested", this._nested);
    this.toggleAttribute("data-child-dialog-open", this._childDialogOpen);
  }

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "raw-dialog-panel": RawDialogPanel;
  }
}
