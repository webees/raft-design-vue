export const COMMENT_HIGHLIGHT = "raft-comment";
export const COMMENT_HIGHLIGHT_ACTIVE = "raft-comment-active";

export function setCommentHighlights(name: string, ranges: Iterable<Range>): () => void {
  const registry = typeof CSS === "undefined" ? undefined : CSS.highlights;
  if (!registry || typeof Highlight === "undefined") return () => {};
  const list = [...ranges];
  if (list.length === 0) {
    registry.delete(name);
    return () => {};
  }
  const highlight = new Highlight(...list);
  if (name === COMMENT_HIGHLIGHT_ACTIVE) highlight.priority = 1;
  registry.set(name, highlight);
  return () => {
    if (registry.get(name) === highlight) registry.delete(name);
  };
}
