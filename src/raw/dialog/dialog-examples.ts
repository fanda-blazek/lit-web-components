export const basicDialogExample = `
  <raw-dialog-root>
    <button data-action="show-modal" class="px-4 py-2 text-base/6 rounded-lg bg-red-500 hover:bg-red-600 text-red-50">Open Default dialog</button>

    <raw-dialog class="backdrop:bg-transparent bg-transparent">
      <raw-dialog-backdrop class="fixed w-screen h-dvh inset-0 bg-zinc-950 opacity-50"></raw-dialog-backdrop>
      <raw-dialog-panel class="fixed bg-white max-w-lg dark:bg-zinc-900 text-zinc-900 dark:text-zinc-200 top-1/2 left-1/2 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg inset-ring-1 inset-ring-current/20 dark:border-zinc-700 p-6 shadow-lg">
        <h2 class="text-xl font-bold">This is a dialog title</h2>
        <p>Lorem ipsum dolor sit amet.</p>
        <button data-action="close">Close</button>
      </raw-dialog-panel>
    </raw-dialog>
  </raw-dialog-root>
`;

export const basicNonDismissableDialogExample = `
  <raw-dialog-root data-dismissable="false">
    <button data-action="show-modal" class="px-4 py-2 text-base/6 rounded-lg bg-red-500 hover:bg-red-600 text-red-50">Open non-dismissable dialog</button>

    <raw-dialog class="backdrop:bg-transparent bg-transparent">
      <raw-dialog-backdrop class="fixed w-screen h-dvh inset-0 bg-zinc-950 opacity-50"></raw-dialog-backdrop>
      <raw-dialog-panel class="fixed bg-white max-w-lg dark:bg-zinc-900 text-zinc-900 dark:text-zinc-200 top-1/2 left-1/2 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg inset-ring-1 inset-ring-current/20 dark:border-zinc-700 p-6 shadow-lg">
        <h2 class="text-xl font-bold">This is a dialog title</h2>
        <p>Lorem ipsum dolor sit amet.</p>
        <button data-action="close">Close</button>
      </raw-dialog-panel>
    </raw-dialog>
  </raw-dialog-root>
`;

export const nestedDialogExample = `
  <raw-dialog-root>
    <button data-action="show-modal" class="px-4 py-2 text-base/6 rounded-lg bg-red-500 hover:bg-red-600 text-red-50">Open Nested Default dialog</button>

    <raw-dialog class="backdrop:bg-transparent bg-transparent">
      <raw-dialog-backdrop class="fixed w-screen h-dvh inset-0 bg-zinc-950 opacity-50"></raw-dialog-backdrop>
      <raw-dialog-panel class="fixed bg-white max-w-lg dark:bg-zinc-900 text-zinc-900 dark:text-zinc-200 top-1/2 left-1/2 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg inset-ring-1 inset-ring-current/20 dark:border-zinc-700 p-6 shadow-lg">
        <h2 class="text-xl font-bold">This is a parent dialog title</h2>
        <p>Lorem ipsum dolor sit amet.</p>
        <button data-action="close">Close</button>

        <raw-dialog-root>
          <button data-action="show-modal" class="px-4 py-2 text-base/6 rounded-lg bg-red-500 hover:bg-red-600 text-red-50">open second dialog</button>

          <raw-dialog class="backdrop:bg-transparent bg-transparent">
            <raw-dialog-panel class="fixed bg-white max-w-sm dark:bg-zinc-900 text-zinc-900 dark:text-zinc-200 top-1/2 left-1/2 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg inset-ring-1 inset-ring-current/20 dark:border-zinc-700 p-6 shadow-lg">
              <h2 class="text-xl font-bold">This is a nested dialog title</h2>
              <p>Lorem ipsum dolor sit amet.</p>
              <button data-action="close">Close</button>
            </raw-dialog-panel>
          </raw-dialog>
        </raw-dialog-root>

      </raw-dialog-panel>
    </raw-dialog>
  </raw-dialog-root>
`;

export const edgeScrollbarDialogExample = `
  <raw-dialog-root>
    <button data-action="show-modal" class="px-4 py-2 text-base/6 rounded-lg bg-red-500 hover:bg-red-600 text-red-50">Open edge scrollbar example</button>

    <raw-dialog class="size-auto max-h-none max-w-none overflow-y-auto bg-transparent backdrop:bg-transparent">
      <raw-dialog-backdrop class="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in pointer-events-none"></raw-dialog-backdrop>

      <div class="fixed inset-0 w-screen overflow-y-auto pt-6 sm:pt-0">
        <div class="grid min-h-full grid-rows-[1fr_auto] justify-items-center sm:grid-rows-[1fr_auto_3fr] sm:p-4">
          <raw-dialog-panel class="row-start-2 w-full min-w-0 rounded-t-3xl sm:rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl ring-1 ring-gray-300 transition-all data-closed:translate-y-12 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:mb-auto sm:w-full sm:max-w-xl sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95">
            <div>
              <div class="space-y-2">
                <h2
                  data-raw-dialog-title
                  class="text-lg font-semibold text-gray-900"
                >
                  Confirm Action
                </h2>

                <p
                  data-raw-dialog-description
                  class="text-sm text-gray-600"
                >
                  Are you sure you want to proceed with this action? This cannot be undone.
                </p>
              </div>

              <div class="bg-gray-50 rounded-md p-4">
                <p class="text-sm text-gray-700">
                  This will permanently delete the selected items from your account.
                  <br>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl eget aliquam aliquet, nunc nisl aliquet nisl, eget aliquam nisl nisl eget nisl. Sed euismod, nisl eget aliquam aliquet, nunc nisl aliquet nisl, eget aliquam nisl nisl eget nisl.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl eget aliquam aliquet, nunc nisl aliquet nisl, eget aliquam nisl nisl eget nisl. Sed euismod, nisl eget aliquam aliquet, nunc nisl aliquet nisl, eget aliquam nisl nisl eget nisl.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl eget aliquam aliquet, nunc nisl aliquet nisl, eget aliquam nisl nisl eget nisl. Sed euismod, nisl eget aliquam aliquet, nunc nisl aliquet nisl, eget aliquam nisl nisl eget nisl.
                </p>
                <p class="text-sm text-gray-700">
                  This will permanently delete the selected items from your account.
                  <br>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl eget aliquam aliquet, nunc nisl aliquet nisl, eget aliquam nisl nisl eget nisl. Sed euismod, nisl eget aliquam aliquet, nunc nisl aliquet nisl, eget aliquam nisl nisl eget nisl.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl eget aliquam aliquet, nunc nisl aliquet nisl, eget aliquam nisl nisl eget nisl. Sed euismod, nisl eget aliquam aliquet, nunc nisl aliquet nisl, eget aliquam nisl nisl eget nisl.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl eget aliquam aliquet, nunc nisl aliquet nisl, eget aliquam nisl nisl eget nisl. Sed euismod, nisl eget aliquam aliquet, nunc nisl aliquet nisl, eget aliquam nisl nisl eget nisl.
                </p>
              </div>

              <div class="flex gap-3 justify-end">
                <button
                  data-action="close"
                  type="button"
                  class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Cancel
                </button>

                <button
                  class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </raw-dialog-panel>
        </div>
      </div>
    </raw-dialog>
  </raw-dialog-root>
`;
