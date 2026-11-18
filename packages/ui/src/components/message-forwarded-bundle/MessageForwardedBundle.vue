<script setup lang="ts">
import MessageEmbed from "../message-embed/MessageEmbed.vue";
import { messageForwardedBundle } from "./message-forwarded-bundle.recipes";
import { forwardedBundleFoldKey } from "./message-forwarded-bundle-fold";

defineOptions({ name: "RaftMessageForwardedBundle", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    fullWidth?: boolean;
    collapsed?: boolean;
    defaultCollapsed?: boolean;
    foldLineLimit?: number;
  }>(),
  {
    fullWidth: false,
    collapsed: undefined,
    defaultCollapsed: false,
    foldLineLimit: 8,
  },
);

const emit = defineEmits<{ "update:collapsed": [value: boolean] }>();
const attrs = useAttrs();
const internal = ref(props.defaultCollapsed);
const collapsed = computed(() => props.collapsed ?? internal.value);
const foldable = ref(false);
/** True once the items surface has measured itself (component-owned fold). */
const auto = ref(false);
const touched = ref(false);
const styles = computed(() => messageForwardedBundle({ fullWidth: props.fullWidth }));
const rootClass = computed(() => styles.value.root({ class: attrs.class as string | undefined }));

function toggle() {
  touched.value = true;
  const next = !collapsed.value;
  if (!foldable.value) return;
  if (props.collapsed === undefined) internal.value = next;
  emit("update:collapsed", next);
}

function reportFold(next: boolean) {
  foldable.value = next;
  auto.value = true;
  if (!next) {
    internal.value = false;
  } else if (!touched.value) {
    internal.value = true;
  }
}

provide(forwardedBundleFoldKey, {
  get collapsed() {
    return collapsed.value;
  },
  get auto() {
    return auto.value;
  },
  get foldable() {
    return foldable.value;
  },
  toggle,
  reportFold,
  foldLineLimit: props.foldLineLimit,
});
</script>

<template>
  <MessageEmbed
    v-bind="{ ...attrs, class: undefined }"
    :size="props.fullWidth ? undefined : 'content'"
    data-slot="message-forwarded-bundle"
    :class="rootClass"
  >
    <slot />
  </MessageEmbed>
</template>
