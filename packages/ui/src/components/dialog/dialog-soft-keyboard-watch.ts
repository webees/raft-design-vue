import { defineComponent, watch } from "vue";

import { useMobileViewport } from "../../lib/use-mobile-viewport";
import { useSoftKeyboard, type SoftKeyboardViewport } from "../../lib/use-soft-keyboard";

/**
 * Rendered inside the popup, so the visual viewport is only observed while the
 * dialog is open, and only below 768px (dialog.md, "On a phone").
 */
export default defineComponent({
  name: "RaftDialogSoftKeyboardWatch",
  emits: {
    change: (_keyboard: SoftKeyboardViewport | null) => true,
  },
  setup(_props, { emit }) {
    const isMobile = useMobileViewport();
    const keyboard = useSoftKeyboard(isMobile);
    watch(keyboard, (value) => emit("change", value), { immediate: true });
    return () => null;
  },
});
