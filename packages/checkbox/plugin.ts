import {
  dataAttr,
  getEventTarget,
  visuallyHiddenStyle,
} from "@zag-js/dom-query";
import { isFocusVisible } from "@zag-js/focus-visible";
import type { Alpine, ElementWithXAttributes } from "alpinejs";
import { Checkbox, parts } from "./checkbox.ts";
import {
  getControlId,
  getHiddenInputEl,
  getHiddenInputId,
  getLabelId,
  getRootId,
} from "./dom.ts";

export default function (Alpine: Alpine) {
  Alpine.directive(
    "checkbox",
    (el, { value, expression }, { evaluateLater, effect }) => {
      if (!value) {
        Alpine.bind(el, {
          "x-modelable": "checkbox",
          "x-data": () => ({
            checkbox: new Checkbox({}),
          }),
          "x-init"() {
            this.$data.checkbox.init();
          },
        });
        effect(() => {
          evaluateLater(expression)(function (props: any) {
            this.$data.checkbox = new Checkbox(props);
          });
        });
      } else if (value === "root") handleRootProps(el, Alpine);
      else if (value === "label") handleLabelProps(el, Alpine);
      else if (value === "control") handleControlProps(el, Alpine);
      else if (value === "indicator") handleIndicatorProps(el, Alpine);
      else if (value === "hidden-input") handleHiddenInputProps(el, Alpine);
    },
  ).before("bind");

  Alpine.magic("checkbox", (el, { Alpine }) => {
    const { checkbox } = Alpine.$data(el) as any;

    return {
      get checked() {
        return checkbox.__checked;
      },
      get disabled() {
        return checkbox.__disabled;
      },
      get indeterminate() {
        return checkbox.__indeterminate;
      },
      get focused() {
        return checkbox.__focused;
      },
      get checkedState() {
        return checkbox.__checked;
      },

      setChecked(checked: boolean) {
        checkbox.send({
          type: "CHECKED.SET",
          checked,
          isTrusted: false,
        });
      },

      toggleChecked() {
        checkbox.send({
          type: "CHECKED.TOGGLE",
          checked: checkbox.__checked,
          isTrusted: false,
        });
      },
    };
  });
}

function handleRootProps(el: ElementWithXAttributes, Alpine: Alpine) {
  Alpine.bind(el, {
    ...parts.root.attrs,
    ":data-active"() {
      return dataAttr(this.$data.checkbox.context.get("active"));
    },
    ":data-focus"() {
      return dataAttr(this.$data.checkbox.__focused);
    },
    ":data-focus-visible"() {
      return dataAttr(this.$data.checkbox.__focusVisible);
    },
    ":data-readonly"() {
      return dataAttr(this.$data.checkbox.__readOnly);
    },
    ":data-hover"() {
      return dataAttr(this.$data.checkbox.context.get("hovered"));
    },
    ":data-disabled"() {
      return dataAttr(this.$data.checkbox.__disabled);
    },
    ":data-state"() {
      return this.$data.checkbox.__indeterminate
        ? "indeterminate"
        : this.$data.checkbox.__checked
        ? "checked"
        : "unchecked";
    },
    ":data-invalid"() {
      return dataAttr(this.$data.checkbox.__invalid);
    },
    ":data-required"() {
      return dataAttr(this.$data.checkbox.__required);
    },

    ":dir"() {
      return this.$data.checkbox.prop("dir");
    },
    ":id"() {
      return getRootId(this.$data.checkbox.scope);
    },
    ":for"() {
      return getHiddenInputId(this.$data.checkbox.scope);
    },
    "@pointermove"() {
      if (this.$data.checkbox.__disabled) return;
      this.$data.checkbox.send({
        type: "CONTEXT.SET",
        context: { hovered: true },
      });
    },
    "@pointerleave"() {
      if (this.$data.checkbox.__disabled) return;
      this.$data.checkbox.send({
        type: "CONTEXT.SET",
        context: { hovered: false },
      });
    },
    "@click"(event) {
      const target = getEventTarget<Element>(event);
      if (target === getHiddenInputEl(this.$data.checkbox.scope)) {
        event.stopPropagation();
      }
    },
  });
}

function handleLabelProps(el: ElementWithXAttributes, Alpine: Alpine) {
  Alpine.bind(el, {
    ...parts.label.attrs,
    ":data-active"() {
      return dataAttr(this.$data.checkbox.context.get("active"));
    },
    ":data-focus"() {
      return dataAttr(this.$data.checkbox.__focused);
    },
    ":data-focus-visible"() {
      return dataAttr(this.$data.checkbox.__focusVisible);
    },
    ":data-readonly"() {
      return dataAttr(this.$data.checkbox.__readOnly);
    },
    ":data-hover"() {
      return dataAttr(this.$data.checkbox.context.get("hovered"));
    },
    ":data-disabled"() {
      return dataAttr(this.$data.checkbox.__disabled);
    },
    ":data-state"() {
      return this.$data.checkbox.__indeterminate
        ? "indeterminate"
        : this.$data.checkbox.__checked
        ? "checked"
        : "unchecked";
    },
    ":data-invalid"() {
      return dataAttr(this.$data.checkbox.__invalid);
    },
    ":data-required"() {
      return dataAttr(this.$data.checkbox.__required);
    },

    ":dir"() {
      return this.$data.checkbox.prop("dir");
    },
    ":id"() {
      return getLabelId(this.$data.checkbox.scope);
    },
  });
}

function handleControlProps(el: ElementWithXAttributes, Alpine: Alpine) {
  Alpine.bind(el, {
    ...parts.control.attrs,
    ":data-active"() {
      return dataAttr(this.$data.checkbox.context.get("active"));
    },
    ":data-focus"() {
      return dataAttr(this.$data.checkbox.__focused);
    },
    ":data-focus-visible"() {
      return dataAttr(this.$data.checkbox.__focusVisible);
    },
    ":data-readonly"() {
      return dataAttr(this.$data.checkbox.__readOnly);
    },
    ":data-hover"() {
      return dataAttr(this.$data.checkbox.context.get("hovered"));
    },
    ":data-disabled"() {
      return dataAttr(this.$data.checkbox.__disabled);
    },
    ":data-state"() {
      return this.$data.checkbox.__indeterminate
        ? "indeterminate"
        : this.$data.checkbox.__checked
        ? "checked"
        : "unchecked";
    },
    ":data-invalid"() {
      return dataAttr(this.$data.checkbox.__invalid);
    },
    ":data-required"() {
      return dataAttr(this.$data.checkbox.__required);
    },

    ":dir"() {
      return this.$data.checkbox.prop("dir");
    },
    ":id"() {
      return getControlId(this.$data.checkbox.scope);
    },
    ":aria-hidden"() {
      return true;
    },
  });
}

function handleIndicatorProps(el: ElementWithXAttributes, Alpine: Alpine) {
  Alpine.bind(el, {
    ...parts.indicator.attrs,
    ":data-active"() {
      return dataAttr(this.$data.checkbox.context.get("active"));
    },
    ":data-focus"() {
      return dataAttr(this.$data.checkbox.__focused);
    },
    ":data-focus-visible"() {
      return dataAttr(this.$data.checkbox.__focusVisible);
    },
    ":data-readonly"() {
      return dataAttr(this.$data.checkbox.__readOnly);
    },
    ":data-hover"() {
      return dataAttr(this.$data.checkbox.context.get("hovered"));
    },
    ":data-disabled"() {
      return dataAttr(this.$data.checkbox.__disabled);
    },
    ":data-state"() {
      return this.$data.checkbox.__indeterminate
        ? "indeterminate"
        : this.$data.checkbox.__checked
        ? "checked"
        : "unchecked";
    },
    ":data-invalid"() {
      return dataAttr(this.$data.checkbox.__invalid);
    },
    ":data-required"() {
      return dataAttr(this.$data.checkbox.__required);
    },

    ":dir"() {
      return this.$data.checkbox.prop("dir");
    },
    ":hidden"() {
      return !this.$data.checkbox.__indeterminate &&
        !this.$data.checkbox.__checked;
    },
  });
}

function handleHiddenInputProps(el: ElementWithXAttributes, Alpine: Alpine) {
  Alpine.bind(el, {
    ":id"() {
      return getHiddenInputId(this.$data.checkbox.scope);
    },
    ":type"() {
      return "checkbox";
    },
    ":required"() {
      return this.$data.checkbox.prop("required");
    },
    ":defaultChecked"() {
      return this.$data.checkbox.__checked;
    },
    ":disabled"() {
      return this.$data.checkbox.__disabled;
    },
    ":aria-labelledby"() {
      return getLabelId(this.$data.checkbox.scope);
    },
    ":aria-invalid"() {
      return this.$data.checkbox.__invalid;
    },
    ":name"() {
      return this.$data.checkbox.prop("name");
    },
    ":form"() {
      return this.$data.checkbox.prop("form");
    },
    ":value"() {
      return this.$data.checkbox.prop("value");
    },
    ":style"() {
      return visuallyHiddenStyle;
    },
    "@focus"() {
      const focusVisible = isFocusVisible();
      this.$data.checkbox.send({
        type: "CONTEXT.SET",
        context: { focused: true, focusVisible },
      });
    },
    "@blur"() {
      this.$data.checkbox.send({
        type: "CONTEXT.SET",
        context: { focused: false, focusVisible: false },
      });
    },
    "@click"(event) {
      if (this.$data.checkbox.__readOnly) {
        event.preventDefault();
        return;
      }

      // @ts-ignore event target
      const checked = event.currentTarget.checked;
      this.$data.checkbox.send({
        type: "CHECKED.SET",
        checked,
        isTrusted: true,
      });
    },
  });
}
