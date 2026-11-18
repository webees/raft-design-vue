import { inject, provide, ref, type InjectionKey, type Ref } from "vue";

export type LightboxModal = boolean | "trap-focus";

const LIGHTBOX_MODAL_KEY: InjectionKey<Ref<LightboxModal>> = Symbol("raft-lightbox-modal");
const LIGHTBOX_DEPTH_KEY: InjectionKey<number> = Symbol("raft-lightbox-depth");

export function provideLightboxModal(modal: Ref<LightboxModal>) {
  provide(LIGHTBOX_MODAL_KEY, modal);
}

export function useLightboxModal(): Ref<LightboxModal> {
  return inject(LIGHTBOX_MODAL_KEY, ref(false));
}

export function createLightboxDepth(): number {
  const depth = inject(LIGHTBOX_DEPTH_KEY, 0) + 1;
  provide(LIGHTBOX_DEPTH_KEY, depth);
  return depth;
}

export function useLightboxDepth(): number {
  return inject(LIGHTBOX_DEPTH_KEY, 0);
}
