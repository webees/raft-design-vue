/**
 * The boxes a row lays out: its children, looking through `display: contents`
 * wrappers. Elements that take no room (hidden inputs, focus guards) are
 * skipped.
 */
export function laidOutChildren(element: Element): Element[] {
  return Array.from(element.children).flatMap((child) => {
    const style = getComputedStyle(child);
    if (style.display === "contents") return laidOutChildren(child);
    if (style.position === "absolute" || style.position === "fixed") return [];
    if (child.getClientRects().length === 0) return [];
    const { width, height } = child.getBoundingClientRect();
    return width === 0 && height === 0 ? [] : [child];
  });
}
