import type { Ref } from "vue";

const TABBABLE = [
  "a[href]",
  "area[href]",
  "button",
  "input",
  "select",
  "textarea",
  "iframe",
  "summary",
  "[contenteditable]:not([contenteditable='false'])",
  "[tabindex]",
].join(",");

function tabbables(): HTMLElement[] {
  return Array.from(document.querySelectorAll<HTMLElement>(TABBABLE)).filter((el) => {
    const kept = el.getAttribute("data-tabindex");
    return (
      (el.tabIndex >= 0 || (kept !== null && !kept.startsWith("-"))) &&
      !(el as HTMLButtonElement).disabled &&
      !el.hasAttribute("data-base-ui-focus-guard") &&
      !el.hasAttribute("data-reka-focus-guard") &&
      !el.closest("[inert]") &&
      (typeof el.checkVisibility !== "function" || el.checkVisibility())
    );
  });
}

function follows(a: Node, b: Node) {
  return Boolean(b.compareDocumentPosition(a) & Node.DOCUMENT_POSITION_FOLLOWING);
}

function tourTabOrder(target: Element, popup: HTMLElement) {
  const all = tabbables();
  const inPopup = all.filter((el) => el !== popup && popup.contains(el));
  const page = all.filter((el) => !popup.contains(el));
  const atTarget = page.filter((el) => el === target || target.contains(el));
  const before =
    atTarget[atTarget.length - 1] ?? page.filter((el) => !follows(el, target)).pop() ?? null;
  const after = page.find((el) => follows(el, target) && !target.contains(el)) ?? null;
  return { first: inPopup[0] ?? null, last: inPopup[inPopup.length - 1] ?? null, before, after };
}

function isTypingOutside(popup: Element | null) {
  const active = document.activeElement;
  if (!(active instanceof HTMLElement) || popup?.contains(active)) return false;
  return (
    active.isContentEditable ||
    active instanceof HTMLTextAreaElement ||
    (active instanceof HTMLInputElement &&
      !["button", "checkbox", "radio", "submit", "reset"].includes(active.type)) ||
    active.getAttribute("role") === "textbox"
  );
}

function restoreLocated(el: Element, before: string | null) {
  if (el.getAttribute("data-located") !== "held") return;
  if (before === null) el.removeAttribute("data-located");
  else el.setAttribute("data-located", before);
}

export function startCoachMarkStop(
  target: Element,
  popupRef: Ref<HTMLElement | null>,
  nextRef: Ref<HTMLElement | null>,
  opened: boolean,
): () => void {
  const before = target.getAttribute("data-located");
  target.setAttribute("data-located", "held");

  let frame = 0;
  let tries = 0;
  const focusNext = () => {
    const next = nextRef.value;
    if (!next) {
      if (tries++ < 5) frame = requestAnimationFrame(focusNext);
      return;
    }
    const popup = popupRef.value;
    const active = document.activeElement;
    const wasInBubble = !active || active === document.body || Boolean(popup?.contains(active));
    if (opened ? !isTypingOutside(popup) : wasInBubble) next.focus({ preventScroll: true });
  };
  frame = requestAnimationFrame(focusNext);

  const onKeyDown = (event: KeyboardEvent) => {
    const popup = popupRef.value;
    if (
      event.defaultPrevented ||
      event.key !== "Tab" ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      !popup
    )
      return;
    const active = document.activeElement;
    if (!(active instanceof HTMLElement)) return;
    const { first, last, before: pageBefore, after } = tourTabOrder(target, popup);
    let to: HTMLElement | null = null;
    if (popup.contains(active)) {
      if (!event.shiftKey && active === last) to = after;
      else if (event.shiftKey && active === first) to = pageBefore;
    } else if (!event.shiftKey && active === pageBefore) to = first;
    else if (event.shiftKey && active === after) to = last;
    if (!to) return;
    event.preventDefault();
    to.focus();
  };
  document.addEventListener("keydown", onKeyDown);

  return () => {
    cancelAnimationFrame(frame);
    document.removeEventListener("keydown", onKeyDown);
    restoreLocated(target, before);
  };
}
