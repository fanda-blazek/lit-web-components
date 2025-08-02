export const basicDialogExample = `
  <raw-dialog-root>
    <button data-action="show-modal" class="px-4 py-2 text-base/6 rounded-lg bg-red-500 hover:bg-red-600 text-red-50">Open Default dialog</button>

    <raw-dialog class="backdrop:bg-transparent bg-transparent">
      <raw-dialog-backdrop class="fixed w-screen h-dvh inset-0 bg-zinc-950 opacity-50"></raw-dialog-backdrop>
      <raw-dialog-panel class="fixed bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-200 top-1/2 left-1/2 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg">
        <p>Minimal dialog content</p>
        <button data-action="close">Close</button>
      </raw-dialog-panel>
    </raw-dialog>
  </raw-dialog-root>
`;
