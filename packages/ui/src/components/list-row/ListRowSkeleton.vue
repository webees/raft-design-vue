<script setup lang="ts">
import { computed, useAttrs } from "vue";

import { cn } from "../../lib/cn";
import Skeleton from "../skeleton/Skeleton.vue";
import ListRow from "./ListRow.vue";
import ListRowBody from "./ListRowBody.vue";
import ListRowBottom from "./ListRowBottom.vue";
import ListRowDescription from "./ListRowDescription.vue";
import ListRowMeta from "./ListRowMeta.vue";
import ListRowTitle from "./ListRowTitle.vue";
import ListRowTop from "./ListRowTop.vue";
import { listRowSkeleton } from "./list-row-skeleton.variants";
import type { ListRowVariant } from "./list-row.variants";

defineOptions({ name: "RaftListRowSkeleton", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    variant?: ListRowVariant;
    leading?: boolean;
    description?: boolean;
    class?: string;
  }>(),
  {
    variant: "default",
    leading: undefined,
    description: undefined,
    class: undefined,
  },
);

const styles = listRowSkeleton();
const attrs = useAttrs();
const leading = computed(() => props.leading ?? props.variant === "default");
const description = computed(() => props.description ?? props.variant === "default");
</script>

<template>
  <ListRow
    v-bind="{ ...attrs, class: undefined }"
    aria-hidden="true"
    data-skeleton=""
    :interactive="false"
    :variant="props.variant"
    :class="styles.row({ class: cn(props.class as string | undefined, attrs.class as string | undefined) })"
  >
    <Skeleton v-if="leading" :class="props.variant === 'default' ? styles.avatar() : styles.icon()" />
    <ListRowBody>
      <ListRowTop>
        <ListRowTitle>
          <Skeleton variant="line" :class="styles.bar({ class: styles.titleBar() })" />
        </ListRowTitle>
        <ListRowMeta v-if="props.variant === 'default'">
          <Skeleton variant="line" :class="styles.bar({ class: styles.metaBar() })" />
        </ListRowMeta>
      </ListRowTop>
      <ListRowBottom v-if="description">
        <ListRowDescription>
          <Skeleton variant="line" :class="styles.bar({ class: styles.descriptionBar() })" />
        </ListRowDescription>
      </ListRowBottom>
    </ListRowBody>
  </ListRow>
</template>
