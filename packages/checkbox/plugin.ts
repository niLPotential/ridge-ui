// import {
//   dataAttr,
//   getEventTarget,
//   visuallyHiddenStyle,
// } from "@zag-js/dom-query";
// import { isFocusVisible } from "@zag-js/focus-visible";
import type { Alpine } from "alpinejs";
import * as checkbox from "@zag-js/checkbox";
import { AlpineMachine, normalizeProps } from "@ridge-ui/lib";
// import { Checkbox, parts } from "./machine.ts";
// import {
//   getControlId,
//   getHiddenInputEl,
//   getHiddenInputId,
//   getLabelId,
//   getRootId,
// } from "./dom.ts";

export default function (Alpine: Alpine) {
  Alpine.directive(
    "checkbox",
    (el, { expression, value }, { evaluateLater }) => {
      if (!value) {
        const service = new AlpineMachine(
          checkbox.machine,
          evaluateLater(expression),
        );
        Alpine.bind(el, {
          "x-data"() {
            return {
              api: checkbox.connect(service, normalizeProps),
              init() {
                service.init();
              },
            };
          },
          "x-effect"() {
            this.$data.api = checkbox.connect(service, normalizeProps);
          },
        } as any);
      } else if (value === "root") {
        Alpine.effect(() => {
          Alpine.bind(el, (Alpine.$data(el).api as checkbox.Api).getRootProps);
        });
      } else if (value === "label") {
        Alpine.effect(() => {
          Alpine.bind(el, (Alpine.$data(el).api as checkbox.Api).getLabelProps);
        });
      } else if (value === "control") {
        Alpine.effect(() => {
          Alpine.bind(
            el,
            (Alpine.$data(el).api as checkbox.Api).getControlProps,
          );
        });
      } else if (value === "indicator") {
        Alpine.effect(() => {
          Alpine.bind(
            el,
            (Alpine.$data(el).api as checkbox.Api).getIndicatorProps,
          );
        });
      } else if (value === "hidden-input") {
        Alpine.effect(() => {
          Alpine.bind(
            el,
            (Alpine.$data(el).api as checkbox.Api).getHiddenInputProps,
          );
        });
      }
    },
  );
}

// export default function (Alpine: Alpine) {
//   Alpine.directive(
//     "checkbox",
//     (el, { value, expression }, { evaluateLater }) => {
//       if (!value) {
//         Alpine.bind(el, {
//           "x-data": () => ({
//             checkbox: new Checkbox(evaluateLater(expression)),
//           }),
//           "x-init"() {
//             (this.$data.checkbox as Checkbox).init();
//           },
//         } as any);
//       } else if (value === "root") handleRootProps(el, Alpine);
//       else if (value === "label") handleLabelProps(el, Alpine);
//       else if (value === "control") handleControlProps(el, Alpine);
//       else if (value === "indicator") handleIndicatorProps(el, Alpine);
//       else if (value === "hidden-input") handleHiddenInputProps(el, Alpine);
//     },
//   ).before("bind");

//   Alpine.magic("checkbox", (el, { Alpine }) => {
//     const { checkbox } = Alpine.$data(el) as any;

//     return {
//       get checked() {
//         return checkbox.__checked;
//       },
//       get disabled() {
//         return checkbox.__disabled;
//       },
//       get indeterminate() {
//         return checkbox.__indeterminate;
//       },
//       get focused() {
//         return checkbox.__focused;
//       },
//       get checkedState() {
//         return checkbox.__checked;
//       },

//       setChecked(checked: boolean) {
//         checkbox.send({
//           type: "CHECKED.SET",
//           checked,
//           isTrusted: false,
//         });
//       },

//       toggleChecked() {
//         checkbox.send({
//           type: "CHECKED.TOGGLE",
//           checked: checkbox.__checked,
//           isTrusted: false,
//         });
//       },
//     };
//   });
// }

// function handleRootProps(el: ElementWithXAttributes, Alpine: Alpine) {
//   Alpine.bind(el, {
//     ...parts.root.attrs,
//     ":data-active"() {
//       return dataAttr((this.$data.checkbox as Checkbox).context.get("active"));
//     },
//     ":data-focus"() {
//       return dataAttr((this.$data.checkbox as Checkbox).__focused);
//     },
//     ":data-focus-visible"() {
//       return dataAttr((this.$data.checkbox as Checkbox).__focusVisible);
//     },
//     ":data-readonly"() {
//       return dataAttr((this.$data.checkbox as Checkbox).__readOnly);
//     },
//     ":data-hover"() {
//       return dataAttr((this.$data.checkbox as Checkbox).context.get("hovered"));
//     },
//     ":data-disabled"() {
//       return dataAttr((this.$data.checkbox as Checkbox).__disabled);
//     },
//     ":data-state"() {
//       return (this.$data.checkbox as Checkbox).__indeterminate
//         ? "indeterminate"
//         : (this.$data.checkbox as Checkbox).__checked
//         ? "checked"
//         : "unchecked";
//     },
//     ":data-invalid"() {
//       return dataAttr((this.$data.checkbox as Checkbox).__invalid);
//     },
//     ":data-required"() {
//       return dataAttr((this.$data.checkbox as Checkbox).__required);
//     },

//     ":dir"() {
//       return (this.$data.checkbox as Checkbox).prop("dir");
//     },
//     ":id"() {
//       return getRootId((this.$data.checkbox as Checkbox).scope);
//     },
//     ":for"() {
//       return getHiddenInputId((this.$data.checkbox as Checkbox).scope);
//     },
//     "@pointermove"() {
//       if ((this.$data.checkbox as Checkbox).__disabled) return;
//       (this.$data.checkbox as Checkbox).send({
//         type: "CONTEXT.SET",
//         context: { hovered: true },
//       });
//     },
//     "@pointerleave"() {
//       if ((this.$data.checkbox as Checkbox).__disabled) return;
//       (this.$data.checkbox as Checkbox).send({
//         type: "CONTEXT.SET",
//         context: { hovered: false },
//       });
//     },
//     "@click"(event: MouseEvent) {
//       const target = getEventTarget<Element>(event);
//       if (
//         target === getHiddenInputEl((this.$data.checkbox as Checkbox).scope)
//       ) {
//         event.stopPropagation();
//       }
//     },
//   } as any);
// }

// function handleLabelProps(el: ElementWithXAttributes, Alpine: Alpine) {
//   Alpine.bind(el, {
//     ...parts.label.attrs,
//     ":data-active"() {
//       return dataAttr((this.$data.checkbox as Checkbox).context.get("active"));
//     },
//     ":data-focus"() {
//       return dataAttr((this.$data.checkbox as Checkbox).__focused);
//     },
//     ":data-focus-visible"() {
//       return dataAttr((this.$data.checkbox as Checkbox).__focusVisible);
//     },
//     ":data-readonly"() {
//       return dataAttr((this.$data.checkbox as Checkbox).__readOnly);
//     },
//     ":data-hover"() {
//       return dataAttr((this.$data.checkbox as Checkbox).context.get("hovered"));
//     },
//     ":data-disabled"() {
//       return dataAttr((this.$data.checkbox as Checkbox).__disabled);
//     },
//     ":data-state"() {
//       return (this.$data.checkbox as Checkbox).__indeterminate
//         ? "indeterminate"
//         : (this.$data.checkbox as Checkbox).__checked
//         ? "checked"
//         : "unchecked";
//     },
//     ":data-invalid"() {
//       return dataAttr((this.$data.checkbox as Checkbox).__invalid);
//     },
//     ":data-required"() {
//       return dataAttr((this.$data.checkbox as Checkbox).__required);
//     },

//     ":dir"() {
//       return (this.$data.checkbox as Checkbox).prop("dir");
//     },
//     ":id"() {
//       return getLabelId((this.$data.checkbox as Checkbox).scope);
//     },
//   } as any);
// }

// function handleControlProps(el: ElementWithXAttributes, Alpine: Alpine) {
//   Alpine.bind(el, {
//     ...parts.control.attrs,
//     ":data-active"() {
//       return dataAttr((this.$data.checkbox as Checkbox).context.get("active"));
//     },
//     ":data-focus"() {
//       return dataAttr((this.$data.checkbox as Checkbox).__focused);
//     },
//     ":data-focus-visible"() {
//       return dataAttr((this.$data.checkbox as Checkbox).__focusVisible);
//     },
//     ":data-readonly"() {
//       return dataAttr((this.$data.checkbox as Checkbox).__readOnly);
//     },
//     ":data-hover"() {
//       return dataAttr((this.$data.checkbox as Checkbox).context.get("hovered"));
//     },
//     ":data-disabled"() {
//       return dataAttr((this.$data.checkbox as Checkbox).__disabled);
//     },
//     ":data-state"() {
//       return (this.$data.checkbox as Checkbox).__indeterminate
//         ? "indeterminate"
//         : (this.$data.checkbox as Checkbox).__checked
//         ? "checked"
//         : "unchecked";
//     },
//     ":data-invalid"() {
//       return dataAttr((this.$data.checkbox as Checkbox).__invalid);
//     },
//     ":data-required"() {
//       return dataAttr((this.$data.checkbox as Checkbox).__required);
//     },

//     ":dir"() {
//       return (this.$data.checkbox as Checkbox).prop("dir");
//     },
//     ":id"() {
//       return getControlId((this.$data.checkbox as Checkbox).scope);
//     },
//     ":aria-hidden"() {
//       return true;
//     },
//   } as any);
// }

// function handleIndicatorProps(el: ElementWithXAttributes, Alpine: Alpine) {
//   Alpine.bind(el, {
//     ...parts.indicator.attrs,
//     ":data-active"() {
//       return dataAttr((this.$data.checkbox as Checkbox).context.get("active"));
//     },
//     ":data-focus"() {
//       return dataAttr((this.$data.checkbox as Checkbox).__focused);
//     },
//     ":data-focus-visible"() {
//       return dataAttr((this.$data.checkbox as Checkbox).__focusVisible);
//     },
//     ":data-readonly"() {
//       return dataAttr((this.$data.checkbox as Checkbox).__readOnly);
//     },
//     ":data-hover"() {
//       return dataAttr((this.$data.checkbox as Checkbox).context.get("hovered"));
//     },
//     ":data-disabled"() {
//       return dataAttr((this.$data.checkbox as Checkbox).__disabled);
//     },
//     ":data-state"() {
//       return (this.$data.checkbox as Checkbox).__indeterminate
//         ? "indeterminate"
//         : (this.$data.checkbox as Checkbox).__checked
//         ? "checked"
//         : "unchecked";
//     },
//     ":data-invalid"() {
//       return dataAttr((this.$data.checkbox as Checkbox).__invalid);
//     },
//     ":data-required"() {
//       return dataAttr((this.$data.checkbox as Checkbox).__required);
//     },

//     ":dir"() {
//       return (this.$data.checkbox as Checkbox).prop("dir");
//     },
//     ":hidden"() {
//       return !(this.$data.checkbox as Checkbox).__indeterminate &&
//         !(this.$data.checkbox as Checkbox).__checked;
//     },
//   } as any);
// }

// function handleHiddenInputProps(el: ElementWithXAttributes, Alpine: Alpine) {
//   Alpine.bind(el, {
//     ":id"() {
//       return getHiddenInputId((this.$data.checkbox as Checkbox).scope);
//     },
//     ":type"() {
//       return "checkbox";
//     },
//     ":required"() {
//       return (this.$data.checkbox as Checkbox).prop("required");
//     },
//     ":defaultChecked"() {
//       return (this.$data.checkbox as Checkbox).__checked;
//     },
//     ":disabled"() {
//       return (this.$data.checkbox as Checkbox).__disabled;
//     },
//     ":aria-labelledby"() {
//       return getLabelId((this.$data.checkbox as Checkbox).scope);
//     },
//     ":aria-invalid"() {
//       return (this.$data.checkbox as Checkbox).__invalid;
//     },
//     ":name"() {
//       return (this.$data.checkbox as Checkbox).prop("name");
//     },
//     ":form"() {
//       return (this.$data.checkbox as Checkbox).prop("form");
//     },
//     ":value"() {
//       return (this.$data.checkbox as Checkbox).prop("value");
//     },
//     ":style"() {
//       return visuallyHiddenStyle;
//     },
//     "@focus"() {
//       const focusVisible = isFocusVisible();
//       (this.$data.checkbox as Checkbox).send({
//         type: "CONTEXT.SET",
//         context: { focused: true, focusVisible },
//       });
//     },
//     "@blur"() {
//       (this.$data.checkbox as Checkbox).send({
//         type: "CONTEXT.SET",
//         context: { focused: false, focusVisible: false },
//       });
//     },
//     "@click"(event: MouseEvent) {
//       if ((this.$data.checkbox as Checkbox).__readOnly) {
//         event.preventDefault();
//         return;
//       }

//       // @ts-ignore event target
//       const checked = event.currentTarget.checked;
//       (this.$data.checkbox as Checkbox).send({
//         type: "CHECKED.SET",
//         checked,
//         isTrusted: true,
//       });
//     },
//   } as any);
// }
