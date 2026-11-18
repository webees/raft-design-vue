import { inject, provide, type InjectionKey } from "vue";

export type CommentMarginPlacement = {
  top?: number;
  height?: number;
  active?: boolean;
};

export interface CommentMarginContextValue {
  animate: () => boolean;
  place: (id: string, placement: CommentMarginPlacement | null) => void;
  observe: (id: string, element: Element) => () => void;
  topOf: (id: string) => number;
}

export const COMMENT_MARGIN_KEY: InjectionKey<CommentMarginContextValue> =
  Symbol("raft-comment-margin");

export function provideCommentMargin(context: CommentMarginContextValue) {
  provide(COMMENT_MARGIN_KEY, context);
}

export function useCommentMargin(): CommentMarginContextValue | null {
  return inject(COMMENT_MARGIN_KEY, null);
}
