import { dataAttr, visuallyHiddenStyle } from "@zag-js/dom-query";
import * as checkbox from "@zag-js/checkbox";
import {
  getControlId,
  getHiddenInputId,
  getLabelId,
  getRootId,
} from "./dom.ts";
import type { Alpine, ElementWithXAttributes } from "alpinejs";
import { AlpineMachine } from "@ridge-ui/lib";

const parts = checkbox.anatomy.build();

export default function (Alpine: Alpine) {
  Alpine.directive("checkbox", (el, directive) => {
    if (!directive.value) {
      handleApi(el, Alpine);
    } else if (directive.value === "root") {
      handleRoot(el, Alpine);
    }
  }).before("bind");
}

function handleApi(el: ElementWithXAttributes, Alpine: Alpine) {
  Alpine.bind(el, {
    "x-data"() {
      const { send, context, prop, computed, scope } = new AlpineMachine(
        checkbox.machine,
        Alpine.$data(el),
      );
      const disabled = !!prop("disabled");
      const readOnly = !!prop("readOnly");
      const required = !!prop("required");
      const invalid = !!prop("invalid");

      const focused = !disabled && context.get("focused");
      const focusVisible = !disabled && context.get("focusVisible");

      const checked = computed("checked");
      const indeterminate = computed("indeterminate");

      const dataAttrs = {
        "data-active": dataAttr(context.get("active")),
        "data-focus": dataAttr(focused),
        "data-focus-visible": dataAttr(focusVisible),
        "data-readonly": dataAttr(readOnly),
        "data-hover": dataAttr(context.get("hovered")),
        "data-disabled": dataAttr(disabled),
        "data-state": indeterminate
          ? "indeterminate"
          : checked
          ? "checked"
          : "unchecked",
        "data-invalid": dataAttr(invalid),
        "data-required": dataAttr(required),
      };
      return {
        checked,
        disabled,
        indeterminate,
        focused,
        checkedState: checked,
        setChecked(checked: boolean) {
          send({ type: "CHECKED.SET", checked, isTrusted: false });
        },
        toggleChecked() {
          send({
            type: "CHECKED.TOGGLE",
            checked: checked,
            isTrusted: false,
          });
        },
        "__dataAttrs": dataAttrs,
        "__prop": prop,
        "__scope": scope,
        "__send": send,
      };
    },
  });
}

function handleRoot(el: ElementWithXAttributes, Alpine: Alpine) {
  Alpine.bind(el, {
    ...parts.root.attrs,
    ...this.$data.dataAttrs,
    dir: this.$data.__prop("dir"),
    id: getRootId(this.$data.__scope),
    for: getHiddenInputId(this.$data.__scope),
    "@pointermove": () => {
      if (this.$data.disabled) return;
      this.$data.send({ type: "CONTEXT.SET", context: { hovered: true } });
    },
    "@pointerleave": () => {
      if (this.$data.disabled) return;
      this.$data.send({ type: "CONTEXT.SET", context: { hovered: false } });
    },
    "@click":
      "$event.target === $refs['hidden-input'] && $event.stopPropagation()",
  });
}

function handleLabel(el: ElementWithXAttributes, Alpine: Alpine) {
  Alpine.bind(el, {
    ...parts.label.attrs,
    ...this.$data.dataAttrs,
    dir: this.$data.__prop("dir"),
    id: getLabelId(this.$data.__scope),
  });
}

function handleControl(el: ElementWithXAttributes, Alpine: Alpine) {
  Alpine.bind(el, {
    ...parts.control.attrs,
    ...this.$data.dataAttrs,
    dir: this.$data.prop("dir"),
    id: getControlId(this.$data.scope),
    "aria-hidden": true,
  });
}

function handleIndicator(el: ElementWithXAttributes, Alpine: Alpine) {
  Alpine.bind(el, {
    ...parts.indicator.attrs,
    ...this.$data.dataAttrs,
    dir: this.$data.prop("dir"),
    hidden: !this.$data.indeterminate && !this.$data.checked,
  });
}

function handleHiddenInput(el: ElementWithXAttributes, Alpine: Alpine) {
  Alpine.bind(el, {
    id: getHiddenInputId(this.$data.scope),
    type: "checkbox",
    required: this.$data.prop("required"),
    defaultChecked: this.$data.checked,
    disabled: this.$data.disabled,
    "aria-labelledby": getLabelId(this.$data.scope),
    "aria-invalid": this.$data.invalid,
    name: this.$data.prop("name"),
    form: this.$data.prop("form"),
    value: this.$data.prop("value"),
    ":style": () => visuallyHiddenStyle,
    "@focus"() {
      const focusVisible = this.$data.isFocusVisible();
      this.$data.send({
        type: "CONTEXT.SET",
        context: { focused: true, focusVisible },
      });
    },
    "@blur"() {
      this.$data.send({
        type: "CONTEXT.SET",
        context: { focused: false, focusVisible: false },
      });
    },
    "@click"(event: any) {
      if (this.$data.readOnly) {
        event.preventDefault();
        return;
      }

      const checked = event.currentTarget.checked;
      this.$data.send({ type: "CHECKED.SET", checked, isTrusted: true });
    },
  });
}
