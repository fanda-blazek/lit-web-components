import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { generateId } from "../../utils/generate-id.js";

@customElement("raw-dialog")
export class RawDialog extends LitElement {
  static styles = css`
    :host {
      display: contents;
    }
  `;

  @property({ type: String })
  id = generateId("dialog");

  private _dialogElement?: HTMLDialogElement;

  firstUpdated() {
    this._dialogElement = this.shadowRoot?.querySelector("dialog") || undefined;
  }

  get dialogElement() {
    return this._dialogElement;
  }

  render() {
    return html`
      <dialog>
        <slot></slot>
      </dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "raw-dialog": RawDialog;
  }
}
