import { defineComponent, type PropType, type VNode } from "vue";

/** Renders a pre-built list of vnodes (slot filtering). */
export const VNodeList = defineComponent({
  name: "RaftVNodeList",
  props: { nodes: { type: Array as PropType<VNode[]>, default: () => [] } },
  setup: (props) => () => props.nodes,
});
