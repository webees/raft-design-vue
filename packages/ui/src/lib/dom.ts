/**
 * Resolve a template ref to its DOM element. Vue keeps the component
 * instance for component roots and the element itself for native ones, so
 * every DOM-facing component was unwrapping `$el` by hand.
 */
export function toElement<T extends HTMLElement = HTMLElement>(value: unknown): T | null {
  const node = value instanceof HTMLElement ? value : (value as { $el?: unknown } | null)?.$el;
  return node instanceof HTMLElement ? (node as T) : null;
}
