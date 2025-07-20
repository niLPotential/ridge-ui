import { dataAttr } from "@zag-js/dom-query";
import type { BindableContext, ComputedFn, PropFn } from "@zag-js/core";
import * as checkbox from "@zag-js/checkbox";
import { useMachine } from "./lib/machine.ts";

export class Checkbox {
  private send: (event: any) => void;
  private context: BindableContext<checkbox.Schema>;
  private prop: PropFn<checkbox.Schema>;
  private computed: ComputedFn<checkbox.Schema>;

  constructor(props: Partial<checkbox.Props>) {
    const { send, context, prop, computed, init } = useMachine(
      checkbox.machine,
      props,
    );
    this.send = send;
    this.context = context;
    this.prop = prop;
    this.computed = computed;
    init();
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
