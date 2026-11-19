import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it } from "vitest";

import Lightbox from "./Lightbox.vue";
import LightboxBody from "./LightboxBody.vue";
import LightboxClose from "./LightboxClose.vue";
import LightboxContent from "./LightboxContent.vue";
import { LightboxHeader, LightboxTitle } from "./lightbox-parts";

const components = {
  Lightbox,
  LightboxBody,
  LightboxClose,
  LightboxContent,
  LightboxHeader,
  LightboxTitle,
};

describe("Lightbox", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("renders the scrim, content and header parts in a portal", async () => {
    mount({
      components,
      template: `
        <Lightbox default-open>
          <LightboxContent>
            <LightboxHeader>
              <LightboxTitle>Preview</LightboxTitle>
            </LightboxHeader>
            <LightboxBody>Body copy</LightboxBody>
          </LightboxContent>
        </Lightbox>
      `,
    });
    await nextTick();

    const content = document.body.querySelector('[data-slot="lightbox-content"]');
    expect(content).not.toBeNull();
    expect(document.body.querySelector('[data-slot="lightbox-backdrop"]')).not.toBeNull();
    expect(content?.querySelector('[data-slot="lightbox-header"]')).not.toBeNull();
    expect(content?.querySelector('[data-slot="lightbox-title"]')?.textContent).toBe("Preview");
    expect(content?.querySelector('[data-slot="lightbox-body"]')).not.toBeNull();
  });

  it("closes from the close button", async () => {
    mount({
      components,
      template: `
        <Lightbox default-open>
          <LightboxContent>
            <LightboxClose aria-label="Close" />
            <LightboxBody>Body copy</LightboxBody>
          </LightboxContent>
        </Lightbox>
      `,
    });
    await nextTick();
    const close = document.body.querySelector<HTMLButtonElement>('[data-slot="lightbox-close"]');
    expect(close).not.toBeNull();
    close?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    await new Promise((resolve) => setTimeout(resolve, 0));
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(document.body.querySelector('[data-slot="lightbox-content"]')).toBeNull();
  });
});
