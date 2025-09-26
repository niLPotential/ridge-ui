import { dataAttr } from "@zag-js/dom-query";
import type { Alpine, ElementWithXAttributes } from "alpinejs";
// import { AlpineMachine } from "@ridge-ui/lib";
import { Checkbox } from "./checkbox.ts";

// const parts = checkbox.anatomy.build();

export default function (Alpine: Alpine) {
  Alpine.directive("checkbox", (el, directive, { evaluate }) => {
    if (!directive.value) handleApi(el, Alpine, evaluate(directive.expression)); // instance
    else if (directive.value === "root") handleRoot(el, Alpine);
    else if (directive.value === "label") handleLabel(el, Alpine);
    else if (directive.value === "control") handleControl(el, Alpine);
    else if (directive.value === "indicator") handleIndicator(el, Alpine);
    else if (directive.value === "hidden-input") handleHiddenInput(el, Alpine);
  }).before("bind");
}

function handleApi(el: ElementWithXAttributes, Alpine: Alpine, userProps: any) {
  Alpine.bind(el, {
    "x-data": () => new Checkbox(userProps),
  });
}

function handleRoot(el: ElementWithXAttributes, Alpine: Alpine) {
  Alpine.bind(el, {
    ":data-active"() {
      return dataAttr(this.$data.context.get("active"));
    },
    ":data-focus"() {
      return dataAttr(this.$data.focused);
    },
    ":data-focus-visible"() {
      return dataAttr(this.$data.focusVisible);
    },
    ":data-readonly"() {
      return dataAttr(this.$data.readOnly);
    },
    ":data-hover"() {
      return dataAttr(this.$data.context.get("hovered"));
    },
    ":data-disabled"() {
      return dataAttr(this.$data.disabled);
    },
    ":data-state"() {
      return this.$data.indeterminate
        ? "indeterminate"
        : this.$data.checked
        ? "checked"
        : "unchecked";
    },
    ":data-invalid"() {
      return dataAttr(this.$data.invalid);
    },
    ":data-required"() {
      return dataAttr(this.$data.required);
    },
    ":dir"() {
      return this.$data.prop("dir");
    },
    // id: getRootId(this.scope),
    // for: getHiddenInputId(this.scope),
    "@pointermove"() {
      if (this.$data.disabled) return;
      this.$data.send({ type: "CONTEXT.SET", context: { hovered: true } });
    },
    "@pointerleave"() {
      if (this.$data.disabled) return;
      this.$data.send({ type: "CONTEXT.SET", context: { hovered: false } });
    },
    // "@click":
    //   "$event.target === $refs['hidden-input'] && $event.stopPropagation()",
  });
}

function handleLabel(el: ElementWithXAttributes, Alpine: Alpine) {
  Alpine.bind(el, {});
}

function handleControl(el: ElementWithXAttributes, Alpine: Alpine) {
  Alpine.bind(el, {});
}

function handleIndicator(el: ElementWithXAttributes, Alpine: Alpine) {
  Alpine.bind(el, {});
}

function handleHiddenInput(el: ElementWithXAttributes, Alpine: Alpine) {
  Alpine.bind(el, {});
}
