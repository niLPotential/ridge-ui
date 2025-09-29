import * as checkbox from "@zag-js/checkbox";
import { AlpineMachine } from "@ridge-ui/lib";

export const parts = checkbox.anatomy.build();

export class Checkbox extends AlpineMachine<checkbox.Schema> {
  constructor(
    evaluateProps: (callback: (value: Partial<checkbox.Props>) => void) => void,
  ) {
    super(checkbox.machine, evaluateProps);
  }

  get __disabled() {
    return !!this.prop("disabled");
  }
  get __readOnly() {
    return !!this.prop("readOnly");
  }
  get __required() {
    return !!this.prop("required");
  }
  get __invalid() {
    return !!this.prop("invalid");
  }

  get __focused() {
    return !this.__disabled && this.context.get("focused");
  }
  get __focusVisible() {
    return !this.__disabled && this.context.get("focusVisible");
  }

  get __checked() {
    return this.computed("checked");
  }
  get __indeterminate() {
    return this.computed("indeterminate");
  }
}
