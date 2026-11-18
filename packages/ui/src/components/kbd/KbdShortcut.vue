<script setup lang="ts">
import type { Component } from "vue";
import {
  ArrowBigUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ChevronUp,
  Command,
  CornerDownLeft,
  Delete,
  Option,
} from "lucide-vue-next";

import { cn } from "../../lib/cn";
import { useKeyboardPlatform, type KeyboardPlatform } from "../../lib/use-platform";
import Kbd from "./Kbd.vue";
import KbdGroup from "./KbdGroup.vue";
import { resolveKbdKeys, type KbdKeyIcon, type KbdKeyName } from "./kbd-keys";

defineOptions({ name: "RaftKbdShortcut", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    keys: readonly KbdKeyName[];
    size?: "sm" | "md";
    platform?: KeyboardPlatform;
    label?: string;
  }>(),
  { size: "sm" },
);
const attrs = useAttrs();
const detected = useKeyboardPlatform();
const platform = computed(() => props.platform ?? detected.value);
const ICONS: Record<KbdKeyIcon, Component> = {
  "chevron-up": ChevronUp,
  option: Option,
  "arrow-big-up": ArrowBigUp,
  command: Command,
  "corner-down-left": CornerDownLeft,
  delete: Delete,
  "arrow-up": ArrowUp,
  "arrow-down": ArrowDown,
  "arrow-left": ArrowLeft,
  "arrow-right": ArrowRight,
};
const resolved = computed(() =>
  resolveKbdKeys(props.keys, platform.value).map((key) => ({
    ...key,
    component: key.icon ? ICONS[key.icon] : undefined,
  })),
);
const rootClass = computed(() => cn("inline-flex shrink-0 items-center", attrs.class as string));
</script>

<template>
  <span
    v-bind="{ ...attrs, class: undefined }"
    data-slot="kbd-shortcut"
    :data-platform="platform"
    :class="rootClass"
  >
    <KbdGroup aria-hidden="true">
      <Kbd
        v-for="(key, index) in resolved"
        :key="`${index}-${key.name}`"
        :size="size"
        :data-glyph="key.icon ? 'icon' : 'text'"
        :class="key.icon ? 'px-0' : undefined"
      >
        <component
          :is="key.component"
          v-if="key.component"
          data-slot="kbd-icon"
          aria-hidden="true"
          class="block shrink-0"
        />
        <span
          v-else
          data-slot="kbd-text"
          class="block leading-none [text-box:trim-both_cap_alphabetic]"
        >
          {{ key.text }}
        </span>
      </Kbd>
    </KbdGroup>
    <span data-slot="kbd-shortcut-label" class="sr-only">
      {{ label ?? resolved.map((key) => key.label).join(" ") }}
    </span>
  </span>
</template>
