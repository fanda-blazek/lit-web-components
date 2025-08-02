import {
  edgeScrollbarDialogExample,
  basicDialogExample,
  nestedDialogExample,
  basicNonDismissableDialogExample,
} from "./raw/dialog/dialog-examples";

document.querySelector<HTMLDivElement>("#examples")!.innerHTML = `
  <div class="max-w-5xl text-center mx-auto flex flex-col items-center justify-center mt-12 gap-4 p-8 rounded-xl bg-zinc-100 dark:bg-zinc-900">
    <h2 class="text-3xl font-bold">Lit Raw component examples</h1>

    <div class="mt-12 flex flex-col items-center justify-center gap-5">
      <div>
        ${basicDialogExample}
      </div>
      <div>
        ${basicNonDismissableDialogExample}
      </div>
      <div>
        ${nestedDialogExample}
      </div>
      <div>
        ${edgeScrollbarDialogExample}
      </div>
    </div>
  </div>
`;
