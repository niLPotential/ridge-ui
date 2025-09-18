import * as avatar from "@zag-js/avatar";
import { AlpineMachine } from "@ridge-ui/lib";
import { getFallbackId, getImageId, getRootId } from "./dom.ts";
import type { FallbackProps, ImageProps, RootProps } from "./types.ts";

const parts = avatar.anatomy.build();

export class Avatar extends AlpineMachine<any> implements avatar.Service {
  constructor(userProps: Partial<avatar.Props>) {
    super(avatar.machine, userProps);
  }

  get loaded(): boolean {
    return this.state.matches("loaded");
  }
  setSrc = (src: string): string => `$refs.img.setAttribute('src', ${src})`;
  setLoaded() {
    this.send({ type: "img.loaded", src: "api" });
  }
  setError() {
    this.send({ type: "img.error", src: "api" });
  }

  get root(): RootProps {
    return {
      ...parts.root.attrs,
      ":hidden": () => !this.loaded,
      dir: this.prop("dir"),
      id: getRootId(this.scope),
    };
  }

  get image(): ImageProps {
    return {
      ...parts.image.attrs,
      ":hidden": () => !this.loaded,
      dir: this.prop("dir"),
      id: getImageId(this.scope),
      ":data-state": () => this.loaded ? "visible" : "hidden",
      "@load": () => {
        this.send({ type: "img.loaded", src: "element" });
      },
      "@error": () => {
        this.send({ type: "img.error", src: "element" });
      },
    };
  }

  get fallback(): FallbackProps {
    return {
      ...parts.fallback.attrs,
      dir: this.prop("dir"),
      id: getFallbackId(this.scope),
      ":hidden": () => this.loaded,
      ":data-state": () => this.loaded ? "hidden" : "visible",
    };
  }
}
