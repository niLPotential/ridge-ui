import { dataAttr, visuallyHiddenStyle } from "@zag-js/dom-query";
import * as checkbox from "@zag-js/checkbox";
import { AlpineMachine } from "@ridge-ui/lib";

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

  get root() {
    return {
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
        "$event.target === $refs['hidden-input'] && $event.stopPropagation() ",
    };
  }
  get label() {
    return {
      ...this.dataAttrs,
      dir: this.prop("dir"),
      ":id": "$id('label')",
    };
  }

  get control() {
    return {
      ...this.dataAttrs,
      dir: this.prop("dir"),
      ":id": "$id('control')",
      "aria-hidden": true,
    };
  }

  get indicator() {
    return {
      ...this.dataAttrs,
      dir: this.prop("dir"),
      ":hidden": () => !this.indeterminate && !this.checked,
    };
  }

  get hiddenInput() {
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
