import { dataAttr } from "@zag-js/dom-query";
import * as checkbox from "@zag-js/checkbox";
import { Component } from "./component.ts";

export class Checkbox extends Component<checkbox.Schema> {
  constructor(userProps: Partial<checkbox.Props>) {
    super(checkbox.machine, userProps);
  }

  get disabled() {
    return this.prop("disabled");
  }
  private get readOnly() {
    return this.prop("readOnly");
  }
  private get invalid() {
    return this.prop("invalid");
  }

  get focused() {
    return !this.disabled && this.context.get("focused");
  }
  private get focusVisible() {
    return !this.disabled && this.context.get("focusVisible");
  }

  get checked() {
    return this.computed("checked");
  }
  get checkedState() {
    return this.checked;
  }
  get indeterminate() {
    return this.computed("indeterminate");
  }

  private get dataAttrs() {
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
    };
  }

  get root() {
    return {
      ...this.dataAttrs,
      dir: this.prop("dir"),
      "@pointermove": () => {
        if (this.disabled) return;
        this.send({ type: "CONTEXT.SET", context: { hovered: true } });
      },
      "@pointerleave": () => {
        if (this.disabled) return;
        this.send({ type: "CONTEXT.SET", context: { hovered: false } });
      },
    };
  }
  get label() {
    return {
      ...this.dataAttrs,
      dir: this.prop("dir"),
    };
  }

  get control() {
    return {
      ...this.dataAttrs,
      dir: this.prop("dir"),
      "aria-hidden": true,
    };
  }

  get indicator() {
    return {
      ...this.dataAttrs,
      dir: this.prop("dir"),
      hidden: !this.indeterminate && !this.checked,
    };
  }

  get hiddenInput() {
    return {
      type: "checkbox",
      ":required": () => this.prop("required"),
      ":defaultChecked": () => this.checked,
      ":disabled": () => this.disabled,
      ":aria-invalid": () => this.invalid,
      name: this.prop("name"),
      form: this.prop("form"),
      value: this.prop("value"),
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
