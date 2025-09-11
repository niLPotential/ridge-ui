import { dataAttr, visuallyHiddenStyle } from "@zag-js/dom-query";
import * as checkbox from "@zag-js/checkbox";
import { AlpineMachine, type AnatomyPartAttrs } from "@ridge-ui/lib";

const parts = checkbox.anatomy.build();

/**
 * Ridge UI checkbox component
 *
 * ```ts
 * Alpine.data("checkbox", (userProps: any) => new Checkbox(userProps));
 * ```
 */
export class Checkbox extends AlpineMachine<checkbox.Schema> {
  constructor(userProps: Partial<checkbox.Props>) {
    super(checkbox.machine, userProps);
  }

  get disabled(): boolean | undefined {
    return this.prop("disabled");
  }
  private get readOnly() {
    return this.prop("readOnly");
  }
  private get required() {
    return this.prop("required");
  }
  private get invalid() {
    return this.prop("invalid");
  }

  get focused(): boolean {
    return !this.disabled && this.context.get("focused");
  }
  private get focusVisible() {
    return !this.disabled && this.context.get("focusVisible");
  }

  get checked(): boolean {
    return this.computed("checked");
  }
  get checkedState(): boolean {
    return this.checked;
  }
  get indeterminate(): boolean {
    return this.computed("indeterminate");
  }

  private get dataAttrs(): DataAttrs {
    return {
      ":data-active": () => dataAttr(this.context.get("active")),
      ":data-focus": () => dataAttr(this.focused),
      ":data-focus-visible": () => dataAttr(this.focusVisible),
      ":data-readonly": () => dataAttr(this.readOnly),
      ":data-hover": () => dataAttr(this.context.get("hovered")),
      ":data-disabled": () => dataAttr(this.disabled),
      ":data-state": () =>
        this.indeterminate
          ? "indeterminate"
          : this.checked
          ? "checked"
          : "unchecked",
      ":data-invalid": () => dataAttr(this.invalid),
      ":data-required": () => dataAttr(this.required),
    };
  }

  setChecked(checked: boolean) {
    this.send({ type: "CHECKED.SET", checked, isTrusted: false });
  }
  toggleChecked() {
    this.send({
      type: "CHECKED.TOGGLE",
      checked: this.checked,
      isTrusted: false,
    });
  }

  get root(): RootProps {
    return {
      ...parts.root.attrs,
      ...this.dataAttrs,
      "x-id": () => ["root", "label", "control", "hidden-input"],
      dir: this.prop("dir"),
      ":id": "$id('root')",
      ":for": "$id('hidden-input')",
      "@pointermove": () => {
        if (this.disabled) return;
        this.send({ type: "CONTEXT.SET", context: { hovered: true } });
      },
      "@pointerleave": () => {
        if (this.disabled) return;
        this.send({ type: "CONTEXT.SET", context: { hovered: false } });
      },
      "@click":
        "$event.target === $refs['hidden-input'] && $event.stopPropagation()",
    };
  }
  get label(): LabelProps {
    return {
      ...parts.label.attrs,
      ...this.dataAttrs,
      dir: this.prop("dir"),
      ":id": "$id('label')",
    };
  }

  get control(): ControlProps {
    return {
      ...parts.control.attrs,
      ...this.dataAttrs,
      dir: this.prop("dir"),
      ":id": "$id('control')",
      "aria-hidden": true,
    };
  }

  get indicator(): IndicatorProps {
    return {
      ...parts.indicator.attrs,
      ...this.dataAttrs,
      dir: this.prop("dir"),
      ":hidden": () => !this.indeterminate && !this.checked,
    };
  }

  get hiddenInput(): HiddenInputProps {
    return {
      "x-ref": "hidden-input",
      ":id": "$id('hidden-input')",
      type: "checkbox",
      ":required": () => this.prop("required"),
      ":defaultChecked": () => this.checked,
      ":disabled": () => this.disabled,
      ":aria-labelledby": "$id('label')",
      ":aria-invalid": () => this.invalid,
      name: this.prop("name"),
      form: this.prop("form"),
      value: this.prop("value"),
      ":style": () => visuallyHiddenStyle,
      "@focus": () => {
        this.send({
          type: "CONTEXT.SET",
          context: { focused: true, focusVisible: true },
        });
      },
      "@blur": () => {
        this.send({
          type: "CONTEXT.SET",
          context: { focused: false, focusVisible: false },
        });
      },
      "@click": (event: any) => {
        if (this.readOnly) {
          event.preventDefault();
          return;
        }
        const checked = event.currentTarget.checked;
        this.send({ type: "CHECKED.SET", checked, isTrusted: true });
      },
    };
  }
}

type Booleanish = boolean | "true" | "false";
interface DataAttrs {
  ":data-active": () => Booleanish;
  ":data-focus": () => Booleanish;
  ":data-focus-visible": () => Booleanish;
  ":data-readonly": () => Booleanish;
  ":data-hover": () => Booleanish;
  ":data-disabled": () => Booleanish;
  ":data-state": () => "indeterminate" | "checked" | "unchecked";
  ":data-invalid": () => Booleanish;
  ":data-required": () => Booleanish;
}
interface RootProps extends AnatomyPartAttrs, DataAttrs {
  dir: "ltr" | "rtl" | undefined;
  "x-id": () => ["root", "label", "control", "hidden-input"];
  ":id": "$id('root')";
  ":for": "$id('hidden-input')";
  "@pointermove": () => void;
  "@pointerleave": () => void;
  "@click":
    "$event.target === $refs['hidden-input'] && $event.stopPropagation()";
}
interface LabelProps extends AnatomyPartAttrs, DataAttrs {
  dir: "ltr" | "rtl" | undefined;
  ":id": "$id('label')";
}
interface ControlProps extends AnatomyPartAttrs, DataAttrs {
  dir: "ltr" | "rtl" | undefined;
  ":id": "$id('control')";
  "aria-hidden": true;
}
interface IndicatorProps extends AnatomyPartAttrs, DataAttrs {
  dir: "ltr" | "rtl" | undefined;
  ":hidden": () => boolean;
}
interface HiddenInputProps {
  "x-ref": "hidden-input";
  ":id": "$id('hidden-input')";
  type: "checkbox";
  ":required": () => boolean | undefined;
  ":defaultChecked": () => boolean;
  ":disabled": () => boolean | undefined;
  ":aria-labelledby": "$id('label')";
  ":aria-invalid": () => boolean | undefined;
  name: string | undefined;
  form: string | undefined;
  value: string | undefined;
  ":style": () => typeof visuallyHiddenStyle;
  "@focus": () => void;
  "@blur": () => void;
  "@click": (event: any) => void;
}
