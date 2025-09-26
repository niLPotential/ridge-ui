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
  Alpine.directive("checkbox", (el, { value, expression }, { evaluate }) => {
    if (!value) useMachine(el, Alpine, evaluate(expression));
    else if (value === "root") handleRootProps(el, Alpine);
    else if (value === "label") handleLabelProps(el, Alpine);
    else if (value === "control") handleControlProps(el, Alpine);
    else if (value === "indicator") handleIndicatorProps(el, Alpine);
    else if (value === "hidden-input") handleHiddenInputProps(el, Alpine);
  }).before("bind");

  Alpine.magic("checkbox", (el, { Alpine }) => {
    const $data = Alpine.$data(el) as any;

    return {
      get checked() {
        return $data.__checked;
      },
      get disabled() {
        return $data.__disabled;
      },
      get indeterminate() {
        return $data.__indeterminate;
      },
      get focused() {
        return $data.__focused;
      },
      get checkedState() {
        return $data.__checked;
      },

      setChecked(checked: boolean) {
        $data.send({ type: "CHECKED.SET", checked, isTrusted: false });
      },

      toggleChecked() {
        $data.send({
          type: "CHECKED.TOGGLE",
          checked: $data.__checked,
          isTrusted: false,
        });
      },
    };
  });
}

function useMachine(
  el: ElementWithXAttributes,
  Alpine: Alpine,
  userProps: any,
) {
  Alpine.bind(el, {
    "x-data": () => new Checkbox(userProps),
  });
}

function handleRootProps(el: ElementWithXAttributes, Alpine: Alpine) {
  Alpine.bind(el, () => {
    const $data = Alpine.$data(el) as any;

    return {
      ...parts.root.attrs,
      ":data-active": () => dataAttr($data.context.get("active")),
      ":data-focus": () => dataAttr($data.__focused),
      ":data-focus-visible": () => dataAttr($data.__focusVisible),
      ":data-readonly": () => dataAttr($data.__readOnly),
      ":data-hover": () => dataAttr($data.context.get("hovered")),
      ":data-disabled": () => dataAttr($data.__disabled),
      ":data-state": () =>
        $data.__indeterminate
          ? "indeterminate"
          : $data.__checked
          ? "checked"
          : "unchecked",
      ":data-invalid": () => dataAttr($data.__invalid),
      ":data-required": () => dataAttr($data.__required),

      ":dir": () => $data.prop("dir"),
      ":id": () => getRootId($data.scope),
      ":for": () => getHiddenInputId($data.scope),
      "@pointermove"() {
        if ($data.__disabled) return;
        $data.send({ type: "CONTEXT.SET", context: { hovered: true } });
      },
      "@pointerleave"() {
        if ($data.__disabled) return;
        $data.send({ type: "CONTEXT.SET", context: { hovered: false } });
      },
      "@click"(event) {
        const target = getEventTarget<Element>(event);
        if (target === getHiddenInputEl($data.scope)) {
          event.stopPropagation();
        }
      },
    };
  });
}

function handleLabelProps(el: ElementWithXAttributes, Alpine: Alpine) {
  Alpine.bind(el, () => {
    const $data = Alpine.$data(el) as any;

    return {
      ...parts.label.attrs,
      ":data-active": () => dataAttr($data.context.get("active")),
      ":data-focus": () => dataAttr($data.__focused),
      ":data-focus-visible": () => dataAttr($data.__focusVisible),
      ":data-readonly": () => dataAttr($data.__readOnly),
      ":data-hover": () => dataAttr($data.context.get("hovered")),
      ":data-disabled": () => dataAttr($data.__disabled),
      ":data-state": () =>
        $data.__indeterminate
          ? "indeterminate"
          : $data.__checked
          ? "checked"
          : "unchecked",
      ":data-invalid": () => dataAttr($data.__invalid),
      ":data-required": () => dataAttr($data.__required),

      ":dir": () => $data.prop("dir"),
      ":id": () => getLabelId($data.scope),
    };
  });
}

function handleControlProps(el: ElementWithXAttributes, Alpine: Alpine) {
  Alpine.bind(el, () => {
    const $data = Alpine.$data(el) as any;

    return {
      ...parts.control.attrs,
      ":data-active": () => dataAttr($data.context.get("active")),
      ":data-focus": () => dataAttr($data.__focused),
      ":data-focus-visible": () => dataAttr($data.__focusVisible),
      ":data-readonly": () => dataAttr($data.__readOnly),
      ":data-hover": () => dataAttr($data.context.get("hovered")),
      ":data-disabled": () => dataAttr($data.__disabled),
      ":data-state": () =>
        $data.__indeterminate
          ? "indeterminate"
          : $data.__checked
          ? "checked"
          : "unchecked",
      ":data-invalid": () => dataAttr($data.__invalid),
      ":data-required": () => dataAttr($data.__required),

      ":dir": () => $data.prop("dir"),
      ":id": () => getControlId($data.scope),
      ":aria-hidden": () => true,
    };
  });
}

function handleIndicatorProps(el: ElementWithXAttributes, Alpine: Alpine) {
  Alpine.bind(el, () => {
    const $data = Alpine.$data(el) as any;

    return {
      ...parts.indicator.attrs,
      ":data-active": () => dataAttr($data.context.get("active")),
      ":data-focus": () => dataAttr($data.__focused),
      ":data-focus-visible": () => dataAttr($data.__focusVisible),
      ":data-readonly": () => dataAttr($data.__readOnly),
      ":data-hover": () => dataAttr($data.context.get("hovered")),
      ":data-disabled": () => dataAttr($data.__disabled),
      ":data-state": () =>
        $data.__indeterminate
          ? "indeterminate"
          : $data.__checked
          ? "checked"
          : "unchecked",
      ":data-invalid": () => dataAttr($data.__invalid),
      ":data-required": () => dataAttr($data.__required),

      ":dir": () => $data.prop("dir"),
      ":hidden": () => !$data.__indeterminate && !$data.__checked,
    };
  });
}

function handleHiddenInputProps(el: ElementWithXAttributes, Alpine: Alpine) {
  Alpine.bind(el, () => {
    const $data = Alpine.$data(el) as any;

    return {
      ":id": () => getHiddenInputId($data.scope),
      ":type": () => "checkbox",
      ":required": () => $data.prop("required"),
      ":defaultChecked": () => $data.__checked,
      ":disabled": () => $data.__disabled,
      ":aria-labelledby": () => getLabelId($data.scope),
      ":aria-invalid": () => $data.__invalid,
      ":name": () => $data.prop("name"),
      ":form": () => $data.prop("form"),
      ":value": () => $data.prop("value"),
      ":style": () => visuallyHiddenStyle,
      "@focus"() {
        const focusVisible = isFocusVisible();
        $data.send({
          type: "CONTEXT.SET",
          context: { focused: true, focusVisible },
        });
      },
      "@blur"() {
        $data.send({
          type: "CONTEXT.SET",
          context: { focused: false, focusVisible: false },
        });
      },
      "@click"(event) {
        if ($data.__readOnly) {
          event.preventDefault();
          return;
        }

        // @ts-ignore event target
        const checked = event.currentTarget.checked;
        $data.send({ type: "CHECKED.SET", checked, isTrusted: true });
      },
    };
  });
}
