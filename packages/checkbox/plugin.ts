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
            props: evaluate(expression),
            checkbox: new Checkbox(this.props),
          }),
          "x-init": () => {
            Alpine.$data(el).checkbox.init();
          },
        });
        effect(() => {
          evaluateLater(expression)((props: any) => {
            Alpine.$data(el).props = props;
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
    // const checkbox = Alpine.$data(el) as any;

    return {
      get checked() {
        return Alpine.$data(el).checkbox.__checked;
      },
      get disabled() {
        return Alpine.$data(el).checkbox.__disabled;
      },
      get indeterminate() {
        return Alpine.$data(el).checkbox.__indeterminate;
      },
      get focused() {
        return Alpine.$data(el).checkbox.__focused;
      },
      get checkedState() {
        return Alpine.$data(el).checkbox.__checked;
      },

      setChecked(checked: boolean) {
        Alpine.$data(el).checkbox.send({
          type: "CHECKED.SET",
          checked,
          isTrusted: false,
        });
      },

      toggleChecked() {
        Alpine.$data(el).checkbox.send({
          type: "CHECKED.TOGGLE",
          checked: Alpine.$data(el).checkbox.__checked,
          isTrusted: false,
        });
      },
    };
  });
}

function handleRootProps(el: ElementWithXAttributes, Alpine: Alpine) {
  Alpine.bind(el, () => {
    // const checkbox = Alpine.$data(el) as any;

    return {
      ...parts.root.attrs,
      ":data-active": () =>
        dataAttr(Alpine.$data(el).checkbox.context.get("active")),
      ":data-focus": () => dataAttr(Alpine.$data(el).checkbox.__focused),
      ":data-focus-visible": () =>
        dataAttr(Alpine.$data(el).checkbox.__focusVisible),
      ":data-readonly": () => dataAttr(Alpine.$data(el).checkbox.__readOnly),
      ":data-hover": () =>
        dataAttr(Alpine.$data(el).checkbox.context.get("hovered")),
      ":data-disabled": () => dataAttr(Alpine.$data(el).checkbox.__disabled),
      ":data-state": () =>
        Alpine.$data(el).checkbox.__indeterminate
          ? "indeterminate"
          : Alpine.$data(el).checkbox.__checked
          ? "checked"
          : "unchecked",
      ":data-invalid": () => dataAttr(Alpine.$data(el).checkbox.__invalid),
      ":data-required": () => dataAttr(Alpine.$data(el).checkbox.__required),

      ":dir": () => Alpine.$data(el).checkbox.prop("dir"),
      ":id": () => getRootId(Alpine.$data(el).checkbox.scope),
      ":for": () => getHiddenInputId(Alpine.$data(el).checkbox.scope),
      "@pointermove"() {
        if (Alpine.$data(el).checkbox.__disabled) return;
        Alpine.$data(el).checkbox.send({
          type: "CONTEXT.SET",
          context: { hovered: true },
        });
      },
      "@pointerleave"() {
        if (Alpine.$data(el).checkbox.__disabled) return;
        Alpine.$data(el).checkbox.send({
          type: "CONTEXT.SET",
          context: { hovered: false },
        });
      },
      "@click"(event) {
        const target = getEventTarget<Element>(event);
        if (target === getHiddenInputEl(Alpine.$data(el).checkbox.scope)) {
          event.stopPropagation();
        }
      },
    };
  });
}

function handleLabelProps(el: ElementWithXAttributes, Alpine: Alpine) {
  Alpine.bind(el, () => {
    // const checkbox = Alpine.$data(el) as any;

    return {
      ...parts.label.attrs,
      ":data-active": () =>
        dataAttr(Alpine.$data(el).checkbox.context.get("active")),
      ":data-focus": () => dataAttr(Alpine.$data(el).checkbox.__focused),
      ":data-focus-visible": () =>
        dataAttr(Alpine.$data(el).checkbox.__focusVisible),
      ":data-readonly": () => dataAttr(Alpine.$data(el).checkbox.__readOnly),
      ":data-hover": () =>
        dataAttr(Alpine.$data(el).checkbox.context.get("hovered")),
      ":data-disabled": () => dataAttr(Alpine.$data(el).checkbox.__disabled),
      ":data-state": () =>
        Alpine.$data(el).checkbox.__indeterminate
          ? "indeterminate"
          : Alpine.$data(el).checkbox.__checked
          ? "checked"
          : "unchecked",
      ":data-invalid": () => dataAttr(Alpine.$data(el).checkbox.__invalid),
      ":data-required": () => dataAttr(Alpine.$data(el).checkbox.__required),

      ":dir": () => Alpine.$data(el).checkbox.prop("dir"),
      ":id": () => getLabelId(Alpine.$data(el).checkbox.scope),
    };
  });
}

function handleControlProps(el: ElementWithXAttributes, Alpine: Alpine) {
  Alpine.bind(el, () => {
    // const checkbox = Alpine.$data(el) as any;

    return {
      ...parts.control.attrs,
      ":data-active": () =>
        dataAttr(Alpine.$data(el).checkbox.context.get("active")),
      ":data-focus": () => dataAttr(Alpine.$data(el).checkbox.__focused),
      ":data-focus-visible": () =>
        dataAttr(Alpine.$data(el).checkbox.__focusVisible),
      ":data-readonly": () => dataAttr(Alpine.$data(el).checkbox.__readOnly),
      ":data-hover": () =>
        dataAttr(Alpine.$data(el).checkbox.context.get("hovered")),
      ":data-disabled": () => dataAttr(Alpine.$data(el).checkbox.__disabled),
      ":data-state": () =>
        Alpine.$data(el).checkbox.__indeterminate
          ? "indeterminate"
          : Alpine.$data(el).checkbox.__checked
          ? "checked"
          : "unchecked",
      ":data-invalid": () => dataAttr(Alpine.$data(el).checkbox.__invalid),
      ":data-required": () => dataAttr(Alpine.$data(el).checkbox.__required),

      ":dir": () => Alpine.$data(el).checkbox.prop("dir"),
      ":id": () => getControlId(Alpine.$data(el).checkbox.scope),
      ":aria-hidden": () => true,
    };
  });
}

function handleIndicatorProps(el: ElementWithXAttributes, Alpine: Alpine) {
  Alpine.bind(el, () => {
    // const checkbox = Alpine.$data(el) as any;

    return {
      ...parts.indicator.attrs,
      ":data-active": () =>
        dataAttr(Alpine.$data(el).checkbox.context.get("active")),
      ":data-focus": () => dataAttr(Alpine.$data(el).checkbox.__focused),
      ":data-focus-visible": () =>
        dataAttr(Alpine.$data(el).checkbox.__focusVisible),
      ":data-readonly": () => dataAttr(Alpine.$data(el).checkbox.__readOnly),
      ":data-hover": () =>
        dataAttr(Alpine.$data(el).checkbox.context.get("hovered")),
      ":data-disabled": () => dataAttr(Alpine.$data(el).checkbox.__disabled),
      ":data-state": () =>
        Alpine.$data(el).checkbox.__indeterminate
          ? "indeterminate"
          : Alpine.$data(el).checkbox.__checked
          ? "checked"
          : "unchecked",
      ":data-invalid": () => dataAttr(Alpine.$data(el).checkbox.__invalid),
      ":data-required": () => dataAttr(Alpine.$data(el).checkbox.__required),

      ":dir": () => Alpine.$data(el).checkbox.prop("dir"),
      ":hidden": () =>
        !Alpine.$data(el).checkbox.__indeterminate &&
        !Alpine.$data(el).checkbox.__checked,
    };
  });
}

function handleHiddenInputProps(el: ElementWithXAttributes, Alpine: Alpine) {
  Alpine.bind(el, () => {
    // const checkbox = Alpine.$data(el) as any;

    return {
      ":id": () => getHiddenInputId(Alpine.$data(el).checkbox.scope),
      ":type": () => "checkbox",
      ":required": () => Alpine.$data(el).checkbox.prop("required"),
      ":defaultChecked": () => Alpine.$data(el).checkbox.__checked,
      ":disabled": () => Alpine.$data(el).checkbox.__disabled,
      ":aria-labelledby": () => getLabelId(Alpine.$data(el).checkbox.scope),
      ":aria-invalid": () => Alpine.$data(el).checkbox.__invalid,
      ":name": () => Alpine.$data(el).checkbox.prop("name"),
      ":form": () => Alpine.$data(el).checkbox.prop("form"),
      ":value": () => Alpine.$data(el).checkbox.prop("value"),
      ":style": () => visuallyHiddenStyle,
      "@focus"() {
        const focusVisible = isFocusVisible();
        Alpine.$data(el).checkbox.send({
          type: "CONTEXT.SET",
          context: { focused: true, focusVisible },
        });
      },
      "@blur"() {
        Alpine.$data(el).checkbox.send({
          type: "CONTEXT.SET",
          context: { focused: false, focusVisible: false },
        });
      },
      "@click"(event) {
        if (Alpine.$data(el).checkbox.__readOnly) {
          event.preventDefault();
          return;
        }

        // @ts-ignore event target
        const checked = event.currentTarget.checked;
        Alpine.$data(el).checkbox.send({
          type: "CHECKED.SET",
          checked,
          isTrusted: true,
        });
      },
    };
  });
}
