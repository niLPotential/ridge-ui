import type { AnatomyPart } from "@zag-js/anatomy";
import {
  dataAttr,
  getEventPoint,
  getEventStep,
  isLeftClick,
} from "@zag-js/dom-query";
import * as angleSlider from "@zag-js/angle-slider";
import { Component } from "./component.ts";

export class AngleSlider extends Component<any> {
  parts: Record<string, AnatomyPart>;

  constructor(userProps: Partial<angleSlider.Props>) {
    super(angleSlider.machine, userProps);
    this.parts = angleSlider.anatomy.build();
  }

  get dragging() {
    // @ts-ignore: matches
    return this.state.matches("dragging");
  }

  get value() {
    return this.context.get("value");
  }
  get valueAsDegree() {
    return this.computed("valueAsDegree");
  }

  private get disabled() {
    return this.prop("disabled");
  }
  private get invalid() {
    return this.prop("invalid");
  }
  private get readOnly() {
    return this.prop("readOnly");
  }
  private get interactive() {
    return this.computed("interactive");
  }

  setValue(value: any) {
    this.send({ type: "VALUE.SET", value });
  }

  get root() {
    return {
      ...this.parts.root.attrs,
      ":data-disabled": () => dataAttr(this.disabled),
      ":data-invalid": () => dataAttr(this.invalid),
      ":data-readonly": () => dataAttr(this.readOnly),
      ":style": () => ({
        "--value": this.value,
        "--angle": this.valueAsDegree,
      }),
    };
  }

  get label() {
    return {
      ...this.parts.label.attrs,
      ":data-disabled": () => dataAttr(this.disabled),
      ":data-invalid": () => dataAttr(this.invalid),
      ":data-readonly": () => dataAttr(this.readOnly),
    };
  }

  get hiddenInput() {
    return {
      type: "hidden",
      value: this.value,
      name: this.prop("name"),
    };
  }

  get control() {
    return {
      ...this.parts.control.attrs,
      role: "presentation",
      ":data-disabled": () => dataAttr(this.disabled),
      ":data-invalid": () => dataAttr(this.invalid),
      ":data-readonly": () => dataAttr(this.readOnly),
      "@pointerdown": (event: any) => {
        if (!this.interactive) return;
        if (!isLeftClick(event)) return;
        this.send({
          type: "CONTROL.POINTER_DOWN",
          point: getEventPoint(event),
        });
        event.stopPropagation();
      },
      ":style": () => ({
        touchAction: "none",
        userSelect: "none",
        WebkitUserSelect: "none",
      }),
    };
  }

  get thumb() {
    return {
      ...this.parts.thumb.attrs,
      role: "slider",
      "aria-valuemax": 360,
      "aria-valuemin": 0,
      ":aria-valuenow": () => this.value,
      ":tabIndex": () => this.readOnly || this.interactive ? 0 : undefined,
      ":data-disabled": () => dataAttr(this.disabled),
      ":data-invalid": () => dataAttr(this.invalid),
      ":data-readonly": () => dataAttr(this.readOnly),
      "@focus": () => {
        this.send({ type: "THUMB.FOCUS" });
      },
      "@blur": () => {
        this.send({ type: "THUMB.BLUR" });
      },
      "@keydown": (event: any) => {
        if (!this.interactive) return;
        const step = getEventStep(event) * this.prop("step");

        switch (event.key) {
          case "ArrowLeft":
          case "ArrowUp":
            event.preventDefault();
            this.send({ type: "THUMB.ARROW_DEC", step });
            break;
          case "ArrowRight":
          case "ArrowDown":
            event.preventDefault();
            this.send({ type: "THUMB.ARROW_INC", step });
            break;
          case "Home":
            event.preventDefault();
            this.send({ type: "THUMB.HOME" });
            break;
          case "End":
            event.preventDefault();
            this.send({ type: "THUMB.END" });
            break;
          default:
            break;
        }
      },
      ":style": () => ({
        rotate: `var(--angle)`,
      }),
    };
  }
  get valueText() {
    return {
      ...this.parts.valueText.attrs,
    };
  }

  get markerGroup() {
    return {
      ...this.parts.markerGroup.attrs,
    };
  }
  marker = (props: angleSlider.MarkerProps) => ({
    ...this.parts.marker.attrs,
    "data-value": props.value,
    ":data-state": () =>
      props.value < this.value
        ? "under-value"
        : props.value > this.value
        ? "over-value"
        : "at-value",
    ":data-disabled": () => dataAttr(this.disabled),
    ":style": () => ({
      "--marker-value": props.value,
      rotate: `calc(var(--marker-value) * 1deg)`,
    }),
  });
}
