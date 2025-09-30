import type { Alpine, ElementWithXAttributes } from "alpinejs";
import { Avatar, parts } from "./machine.ts";
import { getFallbackId, getImageEl, getImageId, getRootId } from "./dom.ts";

export default function (Alpine: Alpine) {
  Alpine.directive("avatar", (el, { value, expression }, { evaluateLater }) => {
    if (!value) {
      Alpine.bind(el, {
        "x-data"() {
          return {
            avatar: new Avatar(evaluateLater(expression)),
          };
        },
        "x-init"() {
          (this.$data.avatar as Avatar).init();
        },
      } as any);
    } else if (value === "root") handleRootProps(el, Alpine);
    else if (value === "image") handleImageProps(el, Alpine);
    else if (value === "fallback") handleFallbackProps(el, Alpine);
  }).before("bind");

  Alpine.magic("avatar", (el, { Alpine }) => {
    const { avatar } = Alpine.$data(el) as { avatar: Avatar };

    return {
      get loaded() {
        return avatar.__loaded;
      },
      setSrc(src: string) {
        const img = getImageEl(avatar.scope);
        img?.setAttribute("src", src);
      },
      setLoaded() {
        avatar.send({ type: "img.loaded", src: "api" });
      },
      setError() {
        avatar.send({ type: "img.error", src: "api" });
      },
    };
  });
}

function handleRootProps(el: ElementWithXAttributes, Alpine: Alpine) {
  Alpine.bind(el, {
    ...parts.root.attrs,
    ":dir"() {
      return (this.$data.avatar as Avatar).prop("dir");
    },
    ":id"() {
      return getRootId((this.$data.avatar as Avatar).scope);
    },
  } as any);
}

function handleImageProps(el: ElementWithXAttributes, Alpine: Alpine) {
  Alpine.bind(el, {
    ...parts.image.attrs,
    ":hidden"() {
      return !(this.$data.avatar as Avatar).__loaded;
    },
    ":dir"() {
      return (this.$data.avatar as Avatar).prop("dir");
    },
    ":id"() {
      return getImageId((this.$data.avatar as Avatar).scope);
    },
    ":data-state"() {
      return (this.$data.avatar as Avatar).__loaded ? "visible" : "hidden";
    },
    "@load"() {
      (this.$data.avatar as Avatar).send({
        type: "img.loaded",
        src: "element",
      });
    },
    "@error"() {
      (this.$data.avatar as Avatar).send({ type: "img.error", src: "element" });
    },
  } as any);
}

function handleFallbackProps(el: ElementWithXAttributes, Alpine: Alpine) {
  Alpine.bind(el, {
    ...parts.fallback.attrs,
    ":dir"() {
      return (this.$data.avatar as Avatar).prop("dir");
    },
    ":id"() {
      return getFallbackId((this.$data.avatar as Avatar).scope);
    },
    ":hidden"() {
      return (this.$data.avatar as Avatar).__loaded;
    },
    ":data-state"() {
      return (this.$data.avatar as Avatar).__loaded ? "hidden" : "visible";
    },
  } as any);
}
