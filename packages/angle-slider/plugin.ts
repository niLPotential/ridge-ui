// import {
//   dataAttr,
//   getEventPoint,
//   getEventStep,
//   isLeftClick,
// } from "@zag-js/dom-query";
// import type { MarkerProps } from "@zag-js/angle-slider";
import type { Alpine } from "alpinejs";
import * as angleSlider from "@zag-js/angle-slider";
import { AlpineMachine, normalizeProps } from "@ridge-ui/lib";
// import { AngleSlider, parts } from "./machine.ts";
// import {
//   getControlId,
//   getHiddenInputId,
//   getRootId,
//   getThumbEl,
//   getThumbId,
//   getValueTextId,
// } from "./dom.ts";

export default function (Alpine: Alpine) {
  Alpine.directive(
    "angle-slider",
    (el, { expression, value }, { evaluateLater, evaluate }) => {
      if (!value) {
        const service = new AlpineMachine(
          angleSlider.machine,
          evaluateLater(expression),
        );
        Alpine.bind(el, {
          "x-data"() {
            return {
              api: angleSlider.connect(service, normalizeProps),
              init() {
                service.init();
              },
            };
          },
          "x-effect"() {
            this.$data.api = angleSlider.connect(service, normalizeProps);
          },
        } as any);
      } else if (value === "root") {
        Alpine.effect(() => {
          Alpine.bind(
            el,
            (Alpine.$data(el).api as angleSlider.Api).getRootProps,
          );
        });
      } else if (value === "label") {
        Alpine.effect(() => {
          Alpine.bind(
            el,
            (Alpine.$data(el).api as angleSlider.Api).getLabelProps,
          );
        });
      } else if (value === "hidden-input") {
        Alpine.effect(() => {
          Alpine.bind(
            el,
            (Alpine.$data(el).api as angleSlider.Api).getHiddenInputProps,
          );
        });
      } else if (value === "control") {
        Alpine.effect(() => {
          Alpine.bind(
            el,
            (Alpine.$data(el).api as angleSlider.Api).getControlProps,
          );
        });
      } else if (value === "thumb") {
        Alpine.effect(() => {
          Alpine.bind(
            el,
            (Alpine.$data(el).api as angleSlider.Api).getThumbProps,
          );
        });
      } else if (value === "value-text") {
        Alpine.effect(() => {
          Alpine.bind(
            el,
            (Alpine.$data(el).api as angleSlider.Api).getValueTextProps,
          );
        });
      } else if (value === "marker-group") {
        Alpine.effect(() => {
          Alpine.bind(
            el,
            (Alpine.$data(el).api as angleSlider.Api).getMarkerGroupProps,
          );
        });
      } else if (value === "marker") {
        Alpine.effect(() => {
          Alpine.bind(
            el,
            (Alpine.$data(el).api as angleSlider.Api).getMarkerProps(
              evaluate(expression),
            ),
          );
        });
      }
    },
  ).before("bind");
}

// export default function (Alpine: Alpine) {
//   Alpine.directive(
//     "angle-slider",
//     (el, { expression, value }, { evaluateLater }) => {
//       if (!value) {
//         Alpine.bind(el, {
//           "x-data"() {
//             return {
//               angleSlider: new AngleSlider(evaluateLater(expression)),
//             };
//           },
//           "x-init"() {
//             (this.$data.angleSlider as AngleSlider).init();
//           },
//         } as any);
//       } else if (value === "root") handleRootProps(el, Alpine);
//       else if (value === "label") handleLabelProps(el, Alpine);
//       else if (value === "hidden-input") handleHiddenInputProps(el, Alpine);
//       else if (value === "control") handleControlProps(el, Alpine);
//       else if (value === "thumb") handleThumbProps(el, Alpine);
//       else if (value === "value-text") handleValueTextProps(el, Alpine);
//       else if (value === "marker-group") handleMarkerGroupProps(el, Alpine);
//       else if (value === "marker") {
//         handleMarkerProps(el, Alpine, evaluateLater(expression));
//       }
//     },
//   ).before("bind");

//   Alpine.magic("angleSlider", (el, { Alpine }) => {
//     const { angleSlider } = Alpine.$data(el) as { angleSlider: AngleSlider };

//     return {
//       get value() {
//         return angleSlider.__value;
//       },
//       get valueAsDegree() {
//         return angleSlider.__valueAsDegree;
//       },
//       get dragging() {
//         return angleSlider.__dragging;
//       },
//       setValue: angleSlider.__setValue,
//     };
//   });
// }

// function handleRootProps(el: ElementWithXAttributes, Alpine: Alpine) {
//   Alpine.bind(el, {
//     ...parts.root.attrs,
//     ":id"() {
//       return getRootId((this.$data.angleSlider as AngleSlider).scope);
//     },
//     ":data-disabled"() {
//       return dataAttr((this.$data.angleSlider as AngleSlider).__disabled);
//     },
//     ":data-invalid"() {
//       return dataAttr((this.$data.angleSlider as AngleSlider).__invalid);
//     },
//     ":data-readonly"() {
//       return dataAttr((this.$data.angleSlider as AngleSlider).__readOnly);
//     },
//     ":style"() {
//       return {
//         "--value": (this.$data.angleSlider as AngleSlider).__value,
//         "--angle": (this.$data.angleSlider as AngleSlider).__valueAsDegree,
//       };
//     },
//   } as any);
// }

// function handleLabelProps(el: ElementWithXAttributes, Alpine: Alpine) {
//   Alpine.bind(el, {
//     ...parts.label.attrs,
//     ":for"() {
//       return getHiddenInputId((this.$data.angleSlider as AngleSlider).scope);
//     },
//     ":data-disabled"() {
//       return dataAttr((this.$data.angleSlider as AngleSlider).__disabled);
//     },
//     ":data-invalid"() {
//       return dataAttr((this.$data.angleSlider as AngleSlider).__invalid);
//     },
//     ":data-readonly"() {
//       return dataAttr((this.$data.angleSlider as AngleSlider).__readOnly);
//     },
//     "@click"(event: MouseEvent) {
//       if (!(this.$data.angleSlider as AngleSlider).__interactive) return;
//       event.preventDefault();
//       getThumbEl((this.$data.angleSlider as AngleSlider).scope)?.focus();
//     },
//   } as any);
// }

// function handleHiddenInputProps(el: ElementWithXAttributes, Alpine: Alpine) {
//   Alpine.bind(el, {
//     type: "hidden",
//     ":value"() {
//       return (this.$data.angleSlider as AngleSlider).__value;
//     },
//     ":name"() {
//       return (this.$data.angleSlider as AngleSlider).prop("name");
//     },
//     ":id"() {
//       return getHiddenInputId((this.$data.angleSlider as AngleSlider).scope);
//     },
//   } as any);
// }

// function handleControlProps(el: ElementWithXAttributes, Alpine: Alpine) {
//   Alpine.bind(el, {
//     ...parts.control.attrs,
//     role: "presentation",
//     ":id"() {
//       return getControlId((this.$data.angleSlider as AngleSlider).scope);
//     },
//     ":data-disabled"() {
//       return dataAttr((this.$data.angleSlider as AngleSlider).__disabled);
//     },
//     ":data-invalid"() {
//       return dataAttr((this.$data.angleSlider as AngleSlider).__invalid);
//     },
//     ":data-readonly"() {
//       return dataAttr((this.$data.angleSlider as AngleSlider).__readOnly);
//     },
//     "@pointerdown"(event: PointerEvent) {
//       if (!(this.$data.angleSlider as AngleSlider).__interactive) return;
//       if (!isLeftClick(event)) return;
//       const point = getEventPoint(event);
//       (this.$data.angleSlider as AngleSlider).send({
//         type: "CONTROL.POINTER_DOWN",
//         point,
//       });
//       event.stopPropagation();
//     },
//     ":style"() {
//       return {
//         touchAction: "none",
//         userSelect: "none",
//         WebkitUserSelect: "none",
//       };
//     },
//   } as any);
// }

// function handleThumbProps(el: ElementWithXAttributes, Alpine: Alpine) {
//   Alpine.bind(el, {
//     ...parts.thumb.attrs,
//     ":id"() {
//       return getThumbId((this.$data.angleSlider as AngleSlider).scope);
//     },
//     role: "slider",
//     ":aria-valuemax"() {
//       return 360;
//     },
//     ":aria-valuemin"() {
//       return 0;
//     },
//     ":aria-valuenow"() {
//       return (this.$data.angleSlider as AngleSlider).__value;
//     },
//     ":tabindex"() {
//       return (this.$data.angleSlider as AngleSlider).__readOnly ||
//           (this.$data.angleSlider as AngleSlider).__interactive
//         ? 0
//         : undefined;
//     },
//     ":data-disabled"() {
//       return dataAttr((this.$data.angleSlider as AngleSlider).__disabled);
//     },
//     ":data-invalid"() {
//       return dataAttr((this.$data.angleSlider as AngleSlider).__invalid);
//     },
//     ":data-readonly"() {
//       return dataAttr((this.$data.angleSlider as AngleSlider).__readOnly);
//     },
//     "@focus"() {
//       (this.$data.angleSlider as AngleSlider).send({ type: "THUMB.FOCUS" });
//     },
//     "@blur"() {
//       (this.$data.angleSlider as AngleSlider).send({ type: "THUMB.BLUR" });
//     },
//     "@keydown"(event: KeyboardEvent) {
//       if (!(this.$data.angleSlider as AngleSlider).__interactive) return;
//       const step = getEventStep(event) *
//         (this.$data.angleSlider as AngleSlider).prop("step");

//       switch (event.key) {
//         case "ArrowLeft":
//         case "ArrowUp":
//           event.preventDefault();
//           (this.$data.angleSlider as AngleSlider).send({
//             type: "THUMB.ARROW_DEC",
//             step,
//           });
//           break;
//         case "ArrowRight":
//         case "ArrowDown":
//           event.preventDefault();
//           (this.$data.angleSlider as AngleSlider).send({
//             type: "THUMB.ARROW_INC",
//             step,
//           });
//           break;
//         case "Home":
//           event.preventDefault();
//           (this.$data.angleSlider as AngleSlider).send({ type: "THUMB.HOME" });
//           break;
//         case "End":
//           event.preventDefault();
//           (this.$data.angleSlider as AngleSlider).send({ type: "THUMB.END" });
//           break;
//         default:
//           break;
//       }
//     },
//     ":style"() {
//       return {
//         rotate: `var(--angle)`,
//       };
//     },
//   } as any);
// }

// function handleValueTextProps(el: ElementWithXAttributes, Alpine: Alpine) {
//   Alpine.bind(el, {
//     ...parts.valueText.attrs,
//     ":id"() {
//       return getValueTextId((this.$data.angleSlider as AngleSlider).scope);
//     },
//   } as any);
// }

// function handleMarkerGroupProps(el: ElementWithXAttributes, Alpine: Alpine) {
//   Alpine.bind(el, {
//     ...parts.markerGroup.attrs,
//   });
// }

// function handleMarkerProps(
//   el: ElementWithXAttributes,
//   Alpine: Alpine,
//   evaluateProps: (callback: (markerProps: MarkerProps) => void) => void,
// ) {
//   Alpine.bind(el, () => {
//     let props: MarkerProps;
//     evaluateProps((markerProps) => {
//       props = markerProps;
//     });
//     return {
//       ...parts.marker.attrs,
//       ":data-value"() {
//         return props.value;
//       },
//       ":data-state"() {
//         return props.value < (this.$data.angleSlider as AngleSlider).__value
//           ? "under-value"
//           : props.value > (this.$data.angleSlider as AngleSlider).__value
//           ? "over-value"
//           : "at-value";
//       },
//       ":data-disabled"() {
//         return dataAttr((this.$data.angleSlider as AngleSlider).__disabled);
//       },
//       ":style"() {
//         return {
//           "--marker-value": props.value,
//           rotate: `calc(var(--marker-value) * 1deg)`,
//         };
//       },
//     } as any;
//   });
// }
