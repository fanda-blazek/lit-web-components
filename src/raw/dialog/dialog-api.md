---
component: Dialog
version: 0.2.0
status: proposal
tags:
  - overlay
  - modal
  - accessibility
  - attribute-driven
  - web-components
apis:
  - dialog
  - web-components
  - invoker-api
created: 2025-08-01
updated: 2025-08-01
---

Custom Dialog component based on native dialog element and build with native browser web components api. This component is an enhanced version of the native dialog focusing on scroll locking, light dismiss, nested dialog support, and a rich data attribute API for creating animations.

This API uses a root component (`<raw-dialog-root>`) to manage behavior, making `id` attributes optional for simple cases. It relies on `data-*` attributes for actions and accessibility, providing developers maximum flexibility.

## Parts

### `raw-dialog-root`
The public-facing controller component that manages the dialog's state and behavior. It listens for `data-action` attributes within its scope and coordinates all parts of the dialog.

Styles:
- `display`: `contents` - can be overwritten from the outside

Attributes:
- `id` (optional): A unique identifier, required only for programmatic control or for being targeted from outside its DOM scope.
- `open` (readonly): A boolean attribute reflecting the dialog's open state.
- `dismissable`: If set to `"false"`, the modal dialog cannot be dismissed via the `Escape` key or by clicking the backdrop. Defaults to `"true"`.

Data Attributes (read only):
- `data-open` -  Present when the dialog is in its open state.
- `data-closed` - Present when the dialog is in its closed state.
- `data-modal` - Present when the dialog is open in modal mode.
- `data-opening` - Present when the dialog is animating in.
- `data-closing` - Present when the dialog is animating out.
- `data-animating` - Present when the dialog is animating in or out.

Events:
- `open` - Dispatched when the dialog is opened. `event.detail` contains `{ modal: boolean }`.
- `close` -  Dispatched when the dialog is closed.
- `cancel` -  Dispatched when the user attempts to dismiss the dialog via the Escape key or clicking outside. Calling `preventDefault()` prevents the dialog from closing.

Methods:
- `show()` - Opens the dialog in non-modal mode.
- `showModal()` - Opens the dialog in modal mode.
- `close()` - Closes the dialog.

### `raw-dialog`
Component responsible for rendering the native `<dialog>` element providing the base core functionality and enhancing it by automatic id management (automatic id management can be omitted by providing custom IDs) and other features in this document. It inherits read-only data attributes from the root.

### `raw-dialog-backdrop`
The optional backdrop/overlay element that appears behind the dialog panel. It can be used instead of `::backdrop` css selector (on the `<raw-dialog>` element) to better support animations.

### `raw-dialog-panel`
The main dialog content container that holds the actual dialog content. It inherits read-only data attributes from the root and extending them by some others for nested dialogs.

Data Attributes (read only):
- `data-nested` - Present when the dialog is nested within another dialog.
- `data-child-dialog-open` - Present when one of the child dialogs (nested within) are in an open state.

## Attribute-Driven API
These attributes replace the need for dedicated child components, allowing you to use any HTML element.

### Action Attributes
Use these on any element (like `<button>`) to control a dialog.

- `data-action`: The action to perform (`"show-modal"`, `"show"`, `"close"`).
- `data-target`: A CSS selector for the `raw-dialog-root` to control (e.g., `"#my-dialog"`). If omitted, the action applies to the closest parent `raw-dialog-root`. - if using `data-target` - the element does not need to be placed within the `raw-dialog-root` element.

### Accessibility Attributes
Place these on elements inside your `raw-dialog-panel` to automatically wire up accessibility (`aria-labelledby` / `aria-describedby`).

- `data-raw-dialog-title`: Marks an element as the dialog's accessible name.
- `data-raw-dialog-description`: Marks an element as the dialog's accessible description.

implementation note: We should check if user provided some id to those elements, if not, we should generate one and use that.

## Features

### Modal and Non-Modal Modes
The dialog supports both modal and non-modal behaviors. In modal mode, the dialog captures focus and prevents interaction with background content. Non-modal dialogs allow interaction with other page elements while open.

### Scroll Lock
When in modal mode, the dialog automatically prevents scrolling of the background content.

The scroll is locked if the dialog is open only in `modal` mode. The `dismissable` mode does not have any effect on scroll locking behavior.

For nested dialogs, only the outermost (non-nested) dialog controls scroll locking. When you have nested dialogs, the scroll lock is managed by the root parent dialog and remains locked until all nested dialogs are closed. Child dialogs do not independently lock or unlock scroll, preventing premature scroll restoration when closing nested dialogs while parent dialogs remain open.

### Dismissible Behavior
- Clicking the `escape` key always closes the dialog.
- We should track if the user interacting (click and touch events probably) outside of the `raw-dialog-panel` component - if so and `dismissable` mode is enabled, close the dialog.
- If the `dismissable` attribute is set to `false`, the dialog cannot be closed by clicking outside of it.

### Nested Dialog Support
You can nest dialogs within one another normally. Use the `data-child-dialog-open` selector to customize the styling of the parent dialog.

## Composition

```html
<raw-dialog-root>
  <button data-action="show-modal">Open Dialog</button>

  <raw-dialog>
	  <raw-dialog-backdrop></raw-dialog-backdrop>
	  <raw-dialog-panel>
		<h2 data-raw-dialog-title>Dialog Title</h2>
		<p data-raw-dialog-description>
		  This is a description of what this dialog does.
		</p>
		<button data-action="close" type="button">Cancel</button>
		<button>Confirm</button>
	  </raw-dialog-panel>
  </raw-dialog>
</raw-dialog-root>
```

## Examples

### Basic Modal Dialog (ID-less)
This example shows how to create a dialog without needing any IDs. The `data-action` attributes automatically find their parent `raw-dialog-root`.

```html
<raw-dialog-root>
  <!-- This trigger targets its parent <raw-dialog-root> by default -->
  <button data-action="show-modal">Open Dialog</button>

<!-- Native dialog has backdrop by default, so we need to reset it if we need to use our custom one -->
  <raw-dialog class="backdrop:bg-transparent">
	  <raw-dialog-backdrop></raw-dialog-backdrop>
	  <raw-dialog-panel>
	    <h2 data-raw-dialog-title>Dialog Title</h2>

	    <p data-raw-dialog-description>
	      This is a description of what this dialog does.
	    </p>

	    <div class="dialog-content">
	      <p>Dialog content goes here...</p>
	    </div>

	    <div class="dialog-actions">
	      <!-- This close button also targets its parent -->
	      <button data-action="close" type="button">Cancel</button>
	      <button>Confirm</button>
	    </div>
	  </raw-dialog-panel>
  </raw-dialog>
</raw-dialog-root>
```

### Non-Modal Dialog (Targeted)
To control a dialog from outside its scope or with JavaScript, an `id` is required.

```html
<button data-action="show" data-target="#info-popover">Open Dialog</button>

<raw-dialog-root id="info-popover">
  <raw-dialog class="backdrop:bg-transparent">
	  <raw-dialog-panel>
	    <h3 data-raw-dialog-title>Quick Info</h3>
	    <div class="popover-content">
	      <p>This is a non-modal dialog.</p>
	    </div>
	    <button data-action="close" aria-label="Close">×</button>
	  </raw-dialog-panel>
  </raw-dialog>
</raw-dialog-root>
