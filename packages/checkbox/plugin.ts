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
    (el, { value, expression }, { evaluate, evaluateLater, effect }) => {
      if (!value) {
        Alpine.bind(el, {
          "x-data": () => ({
            checkbox: new Checkbox(evaluate(expression)),
          }),
          "x-init": () => {
            Alpine.$data(el).checkbox.init();
          },
        });
        effect(() => {
          evaluateLater(expression)((props: any) => {
            Alpine.$data(el).checkbox = new Checkbox(props);
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
        checkbox.send({ type: "CHECKED.SET", checked, isTrusted: false });
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
  Alpine.bind(el, () => {
    const { checkbox } = Alpine.$data(el) as any;

    return {
      ...parts.root.attrs,
      ":data-active": () => dataAttr(checkbox.context.get("active")),
      ":data-focus": () => dataAttr(checkbox.__focused),
      ":data-focus-visible": () => dataAttr(checkbox.__focusVisible),
      ":data-readonly": () => dataAttr(checkbox.__readOnly),
      ":data-hover": () => dataAttr(checkbox.context.get("hovered")),
      ":data-disabled": () => dataAttr(Alpine.$data(el).checkbox.__disabled),
      ":data-state": () =>
        checkbox.__indeterminate
          ? "indeterminate"
          : checkbox.__checked
          ? "checked"
          : "unchecked",
      ":data-invalid": () => dataAttr(checkbox.__invalid),
      ":data-required": () => dataAttr(checkbox.__required),

      ":dir": () => checkbox.prop("dir"),
      ":id": () => getRootId(checkbox.scope),
      ":for": () => getHiddenInputId(checkbox.scope),
      "@pointermove"() {
        if (checkbox.__disabled) return;
        checkbox.send({ type: "CONTEXT.SET", context: { hovered: true } });
      },
      "@pointerleave"() {
        if (checkbox.__disabled) return;
        checkbox.send({ type: "CONTEXT.SET", context: { hovered: false } });
      },
      "@click"(event) {
        const target = getEventTarget<Element>(event);
        if (target === getHiddenInputEl(checkbox.scope)) {
          event.stopPropagation();
        }
      },
    };
  });
}

function handleLabelProps(el: ElementWithXAttributes, Alpine: Alpine) {
  Alpine.bind(el, () => {
    const { checkbox } = Alpine.$data(el) as any;

    return {
      ...parts.label.attrs,
      ":data-active": () => dataAttr(checkbox.context.get("active")),
      ":data-focus": () => dataAttr(checkbox.__focused),
      ":data-focus-visible": () => dataAttr(checkbox.__focusVisible),
      ":data-readonly": () => dataAttr(checkbox.__readOnly),
      ":data-hover": () => dataAttr(checkbox.context.get("hovered")),
      ":data-disabled": () => dataAttr(checkbox.__disabled),
      ":data-state": () =>
        checkbox.__indeterminate
          ? "indeterminate"
          : checkbox.__checked
          ? "checked"
          : "unchecked",
      ":data-invalid": () => dataAttr(checkbox.__invalid),
      ":data-required": () => dataAttr(checkbox.__required),

      ":dir": () => checkbox.prop("dir"),
      ":id": () => getLabelId(checkbox.scope),
    };
  });
}

function handleControlProps(el: ElementWithXAttributes, Alpine: Alpine) {
  Alpine.bind(el, () => {
    const { checkbox } = Alpine.$data(el) as any;

    return {
      ...parts.control.attrs,
      ":data-active": () => dataAttr(checkbox.context.get("active")),
      ":data-focus": () => dataAttr(checkbox.__focused),
      ":data-focus-visible": () => dataAttr(checkbox.__focusVisible),
      ":data-readonly": () => dataAttr(checkbox.__readOnly),
      ":data-hover": () => dataAttr(checkbox.context.get("hovered")),
      ":data-disabled": () => dataAttr(checkbox.__disabled),
      ":data-state": () =>
        checkbox.__indeterminate
          ? "indeterminate"
          : checkbox.__checked
          ? "checked"
          : "unchecked",
      ":data-invalid": () => dataAttr(checkbox.__invalid),
      ":data-required": () => dataAttr(checkbox.__required),

      ":dir": () => checkbox.prop("dir"),
      ":id": () => getControlId(checkbox.scope),
      ":aria-hidden": () => true,
    };
  });
}

function handleIndicatorProps(el: ElementWithXAttributes, Alpine: Alpine) {
  Alpine.bind(el, () => {
    const { checkbox } = Alpine.$data(el) as any;

    return {
      ...parts.indicator.attrs,
      ":data-active": () => dataAttr(checkbox.context.get("active")),
      ":data-focus": () => dataAttr(checkbox.__focused),
      ":data-focus-visible": () => dataAttr(checkbox.__focusVisible),
      ":data-readonly": () => dataAttr(checkbox.__readOnly),
      ":data-hover": () => dataAttr(checkbox.context.get("hovered")),
      ":data-disabled": () => dataAttr(checkbox.__disabled),
      ":data-state": () =>
        checkbox.__indeterminate
          ? "indeterminate"
          : checkbox.__checked
          ? "checked"
          : "unchecked",
      ":data-invalid": () => dataAttr(checkbox.__invalid),
      ":data-required": () => dataAttr(checkbox.__required),

      ":dir": () => checkbox.prop("dir"),
      ":hidden": () => !checkbox.__indeterminate && !checkbox.__checked,
    };
  });
}

function handleHiddenInputProps(el: ElementWithXAttributes, Alpine: Alpine) {
  Alpine.bind(el, () => {
    const { checkbox } = Alpine.$data(el) as any;

    return {
      ":id": () => getHiddenInputId(checkbox.scope),
      ":type": () => "checkbox",
      ":required": () => checkbox.prop("required"),
      ":defaultChecked": () => checkbox.__checked,
      ":disabled": () => checkbox.__disabled,
      ":aria-labelledby": () => getLabelId(checkbox.scope),
      ":aria-invalid": () => checkbox.__invalid,
      ":name": () => checkbox.prop("name"),
      ":form": () => checkbox.prop("form"),
      ":value": () => checkbox.prop("value"),
      ":style": () => visuallyHiddenStyle,
      "@focus"() {
        const focusVisible = isFocusVisible();
        checkbox.send({
          type: "CONTEXT.SET",
          context: { focused: true, focusVisible },
        });
      },
      "@blur"() {
        checkbox.send({
          type: "CONTEXT.SET",
          context: { focused: false, focusVisible: false },
        });
      },
      "@click"(event) {
        if (checkbox.__readOnly) {
          event.preventDefault();
          return;
        }

        // @ts-ignore event target
        const checked = event.currentTarget.checked;
        checkbox.send({ type: "CHECKED.SET", checked, isTrusted: true });
      },
    };
  });
}
