import {
  dataAttr,
  getEventPoint,
  getEventStep,
  isLeftClick,
} from "@zag-js/dom-query";
import * as angleSlider from "@zag-js/angle-slider";
import {
  AlpineMachine,
  type AnatomyPartAttrs,
  type Booleanish,
} from "@ridge-ui/lib";
import {
  getControlId,
  getHiddenInputId,
  getRootId,
  getThumbId,
  getValueTextId,
} from "./dom.ts";

const parts = angleSlider.anatomy.build();

export class AngleSlider extends AlpineMachine<any> {
  constructor(userProps: Partial<angleSlider.Props>) {
    super(angleSlider.machine, userProps);
  }

  get dragging(): boolean {
    return this.state.matches("dragging");
  }

  get value(): number {
    return this.context.get("value");
  }
  get valueAsDegree(): string {
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

  setValue(value: number) {
    this.send({ type: "VALUE.SET", value });
  }

  get root(): RootProps {
    return {
      ...parts.root.attrs,
      id: getRootId(this.scope),
      ":data-disabled": () => dataAttr(this.disabled),
      ":data-invalid": () => dataAttr(this.invalid),
      ":data-readonly": () => dataAttr(this.readOnly),
    };
  }

  get label(): LabelProps {
    return {
      ...parts.label.attrs,
      for: getHiddenInputId(this.scope),
      ":data-disabled": () => dataAttr(this.disabled),
      ":data-invalid": () => dataAttr(this.invalid),
      ":data-readonly": () => dataAttr(this.readOnly),
      "@click": this.interactive &&
        "$event.preventDefault(); $refs.thumb.focus()",
    };
  }

  get hiddenInput(): HiddenInputProps {
    return {
      type: "hidden",
      value: this.value,
      name: this.prop("name"),
      id: getHiddenInputId(this.scope),
    };
  }

  get control(): ControlProps {
    return {
      ...parts.control.attrs,
      role: "presentation",
      id: getControlId(this.scope),
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
    };
  }

  get thumb(): ThumbProps {
    return {
      ...parts.thumb.attrs,
      "x-ref": "thumb",
      id: getThumbId(this.scope),
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
        rotate: this.valueAsDegree,
      }),
    };
  }

  get valueText(): ValueTextProps {
    return {
      ...parts.valueText.attrs,
      id: getValueTextId(this.scope),
    };
  }

  get markerGroup(): MarkerGroupProps {
    return {
      ...parts.markerGroup.attrs,
    };
  }

  marker = (props: { value: number }): MarkerProps => ({
    ...parts.marker.attrs,
    ":data-value": () => props.value,
    ":data-state": () =>
      props.value < this.value
        ? "under-value"
        : props.value > this.value
        ? "over-value"
        : "at-value",
    ":data-disabled": () => dataAttr(this.disabled),
    ":style": () => ({
      rotate: `calc(${props.value} * 1deg)`,
    }),
  });
}

interface RootProps extends AnatomyPartAttrs {
  id: any;
  ":data-disabled": () => Booleanish;
  ":data-invalid": () => Booleanish;
  ":data-readonly": () => Booleanish;
}
interface LabelProps extends AnatomyPartAttrs {
  for: any;
  ":data-disabled": () => Booleanish;
  ":data-invalid": () => Booleanish;
  ":data-readonly": () => Booleanish;
  "@click": string;
}
interface HiddenInputProps {
  type: "hidden";
  value: number;
  name: string;
  id: any;
}
interface ControlProps extends AnatomyPartAttrs {
  role: "presentation";
  id: any;
  ":data-disabled": () => Booleanish;
  ":data-invalid": () => Booleanish;
  ":data-readonly": () => Booleanish;
  "@pointerdown": (event: any) => void;
}
interface ThumbProps extends AnatomyPartAttrs {
  "x-ref": "thumb";
  id: any;
  role: "slider";
  "aria-valuemax": 360;
  "aria-valuemin": 0;
  ":aria-valuenow": () => number;
  ":tabIndex": () => 0 | undefined;
  ":data-disabled": () => Booleanish;
  ":data-invalid": () => Booleanish;
  ":data-readonly": () => Booleanish;
  "@focus": () => void;
  "@blur": () => void;
  "@keydown": (event: any) => void;
  ":style": () => { rotate: string };
}
interface ValueTextProps extends AnatomyPartAttrs {
  id: any;
}
interface MarkerGroupProps extends AnatomyPartAttrs {}
interface MarkerProps extends AnatomyPartAttrs {
  ":data-value": () => number;
  ":data-state": () => "under-value" | "at-value" | "over-value";
  ":data-disabled": () => Booleanish;
  ":style": () => { rotate: string };
}
