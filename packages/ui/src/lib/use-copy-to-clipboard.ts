type CopyToClipboardOptions = {
  timeout?: number;
};

async function writeWithFallback(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();
  if (!copied) throw new Error("Clipboard write failed.");
}

/**
 * Clipboard writes with an honest result. `copied` only becomes true after the
 * browser accepted the write, and it clears after `timeout`.
 */
export function useCopyToClipboard(options: CopyToClipboardOptions = {}) {
  const { timeout = 1400 } = options;
  const copied = ref(false);
  let timer: ReturnType<typeof setTimeout> | undefined;

  function clear() {
    if (timer) clearTimeout(timer);
    timer = undefined;
  }

  async function copyText(text: string) {
    await writeWithFallback(text);
    copied.value = true;
    clear();
    timer = setTimeout(() => {
      copied.value = false;
    }, timeout);
  }

  function reset() {
    clear();
    copied.value = false;
  }

  onBeforeUnmount(clear);

  return { copied, copyText, reset };
}
