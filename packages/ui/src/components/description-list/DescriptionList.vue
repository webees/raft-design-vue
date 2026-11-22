<script setup lang="ts">
import { cn } from "../../lib/cn";
import { useLabelValueFit } from "../../lib/label-value-fit";
import { descriptionList, type DescriptionListDirection } from "./description-list.variants";

defineOptions({ name: "RaftDescriptionList", inheritAttrs: false });

const props = withDefaults(
  defineProps<{ direction?: DescriptionListDirection; class?: string }>(),
  {
    direction: "vertical",
  },
);

const attrs = useAttrs();
const list = ref<HTMLElement | null>(null);
const styles = computed(() => descriptionList({ direction: props.direction }));

useLabelValueFit(list, () => props.direction === "horizontal", {
  label: ":scope > [data-slot=description-item] > [data-slot=description-term]",
  value: ":scope > [data-slot=description-item] > [data-slot=description-details]",
});

const rootClass = computed(() => cn(styles.value.root(), "group/description-list", props.class));
</script>

<template>
  <dl
    ref="list"
    v-bind="{ ...attrs, class: undefined }"
    data-slot="description-list"
    :data-direction="direction"
    :class="rootClass"
  >
    <slot />
  </dl>
</template>
