import { onBeforeUnmount, onMounted, watch, type Ref } from "vue";

export function useOverflowTitle(
  element: Ref<HTMLElement | null | undefined>,
  title?: () => string | undefined,
) {
  let observer: ResizeObserver | undefined;

  const sync = () => {
    const node = element.value;
    if (!node) return;

    const explicit = title?.();
    if (explicit) {
      node.title = explicit;
      return;
    }

    const text = node.textContent?.trim() ?? "";
    if (text && node.scrollWidth > node.clientWidth + 1) {
      node.title = text;
    } else {
      node.removeAttribute("title");
    }
  };

  onMounted(() => {
    observer = new ResizeObserver(sync);
    if (element.value) observer.observe(element.value);
    sync();
  });

  watch(element, (node, previous) => {
    if (previous && observer) observer.unobserve(previous);
    if (node && observer) observer.observe(node);
    sync();
  });

  onBeforeUnmount(() => observer?.disconnect());

  return sync;
}
