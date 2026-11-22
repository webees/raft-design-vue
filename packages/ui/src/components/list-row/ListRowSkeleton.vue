<script setup lang="ts">
import { cn } from "../../lib/cn";
import Skeleton from "../skeleton/Skeleton.vue";
import ListRow from "./ListRow.vue";
import {
  ListRowBody,
  ListRowBottom,
  ListRowDescription,
  ListRowMeta,
  ListRowTitle,
  ListRowTop,
} from "./parts";
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
    :class="
      styles.row({
        class: props.class,
      })
    "
  >
    <Skeleton
      v-if="leading"
      :class="props.variant === 'default' ? styles.avatar() : styles.icon()"
    />
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
