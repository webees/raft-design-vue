<script lang="ts">
import {
  Comment,
  Fragment,
  Text,
  cloneVNode,
  computed,
  defineComponent,
  getCurrentInstance,
  h,
  provide,
  ref,
  type VNode,
} from "vue";
import { cn } from "../../lib/cn";
import { STEPS_KEY, type StepsContextValue } from "./context";
import type { StepStatus } from ".";

export default defineComponent({
  name: "RaftSteps",
  inheritAttrs: false,
  props: {
    current: { type: Number, default: undefined },
    defaultCurrent: { type: Number, default: undefined },
    status: { type: String as () => StepStatus, default: "process" },
    vertical: { type: Boolean, default: false },
    finishIcon: { type: null, default: undefined },
    errorIcon: { type: null, default: undefined },
    finishLabel: { type: String, default: "Completed" },
    errorLabel: { type: String, default: "Failed" },
    onUpdateCurrent: { type: Function, default: undefined },
    class: { type: String, default: undefined },
  },
  emits: ["update:current"],
  setup(props, { attrs, slots, emit }) {
    const uncontrolledCurrent = ref<number | undefined>(props.defaultCurrent);
    const current = computed(() => props.current ?? uncontrolledCurrent.value);
    const instance = getCurrentInstance();
    const clickable = computed(
      () =>
        props.onUpdateCurrent !== undefined ||
        instance?.vnode.props?.["onUpdate:current"] !== undefined,
    );

    const select = (index: number) => {
      if (index === current.value) return;
      uncontrolledCurrent.value = index;
      emit("update:current", index);
      props.onUpdateCurrent?.(index);
    };

    const context: StepsContextValue = {
      get current() {
        return current.value;
      },
      get status() {
        return props.status;
      },
      get finishIcon() {
        return props.finishIcon;
      },
      get errorIcon() {
        return props.errorIcon;
      },
      get finishLabel() {
        return props.finishLabel;
      },
      get errorLabel() {
        return props.errorLabel;
      },
      get select() {
        return clickable.value ? select : undefined;
      },
    };

    provide(STEPS_KEY, context);

    const rootClass = computed(() =>
      cn("r-steps", props.vertical ? "r-steps--vertical" : "r-steps--horizontal", props.class),
    );

    const isRenderable = (node: VNode) =>
      node.type !== Comment && node.type !== Text && node.type !== Fragment;

    return () =>
      h(
        "ol",
        {
          ...attrs,
          "data-slot": "steps",
          class: rootClass.value,
        },
        (slots.default?.() ?? [])
          .filter(isRenderable)
          .map((child, index) =>
            cloneVNode(child, { index: index + 1, key: child.key ?? index + 1 }),
          ),
      );
  },
});
</script>
