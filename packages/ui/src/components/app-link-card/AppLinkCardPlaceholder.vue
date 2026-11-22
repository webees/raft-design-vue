<script setup lang="ts">
import { Skeleton } from "../skeleton";
import { messageCard } from "../message-embed/message-embed.variants";
import { appLinkCardFrame } from "./app-link-card-parts";
import { appLinkCard } from "./app-link-card.variants";

defineOptions({ name: "RaftAppLinkCardPlaceholder", inheritAttrs: false });

const attrs = useAttrs();
const frameClass = computed(() => appLinkCardFrame(attrs.class as string));
const body = messageCard().body();
const eyebrow = messageCard().eyebrow();
const title = messageCard().title({ className: "line-clamp-none" });
const meta = messageCard().meta();
const actions = messageCard().actions();
const line = appLinkCard().placeholderLine();
const button = appLinkCard().placeholderButton();
</script>

<template>
  <div
    v-bind="{ ...attrs, class: undefined }"
    data-slot="app-link-card-placeholder"
    aria-busy="true"
    :class="frameClass"
  >
    <slot />
    <div aria-hidden="true" :class="body">
      <div :class="[eyebrow, line]"><Skeleton variant="line" class="w-28" /></div>
      <div :class="title">
        <div :class="line"><Skeleton variant="line" class="w-full" /></div>
        <div :class="line"><Skeleton variant="line" class="w-2/3" /></div>
      </div>
      <div :class="[meta, line]"><Skeleton variant="line" class="w-40" /></div>
    </div>
    <div aria-hidden="true" :class="actions">
      <Skeleton :class="button" />
    </div>
  </div>
</template>
