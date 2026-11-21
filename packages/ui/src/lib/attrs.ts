/** Returns a copy of an attrs bag without the listed keys. */
export function omitAttrs<T extends object>(attrs: T, ...keys: string[]): Record<string, unknown> {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => !keys.includes(key)));
}
