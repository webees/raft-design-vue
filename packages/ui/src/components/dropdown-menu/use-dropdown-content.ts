import { computed } from "vue";

import { dropdownMenu } from "./dropdown-menu.variants";

/** Class and attribute plumbing shared by the menu content and sub-content. */
export function useDropdownContent() {
  const attrs = useAttrs();
  return {
    vars: { "--available-height": "var(--reka-dropdown-menu-content-available-height)" },
    positionerClass: computed(() => dropdownMenu().positioner()),
    contentClass: computed(() =>
      dropdownMenu().content({ class: attrs.class as string | undefined }),
    ),
    contentAttrs: computed(() => {
      const { class: _class, ...rest } = attrs;
      return rest;
    }),
  };
}
