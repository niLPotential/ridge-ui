import * as accordion from "@zag-js/accordion";
import { AlpineMachine } from "@ridge-ui/lib";

export const parts = accordion.anatomy.build();

export class Accordion extends AlpineMachine<any> {
  constructor(
    evaluateProps: (
      callback: (value: Partial<accordion.Props>) => void,
    ) => void,
  ) {
    super(accordion.machine, evaluateProps);
  }

  get __focusedValue() {
    return this.context.get("focusedValue");
  }
  get __value() {
    return this.context.get("value");
  }
  get __multiple() {
    return this.prop("multiple");
  }

  __setValue(value: string[]) {
    let nextValue = value;
    if (!this.__multiple && nextValue.length > 1) {
      nextValue = [nextValue[0]];
    }
    this.send({ type: "VALUE.SET", value: nextValue });
  }

  __isExpanded(props: accordion.ItemProps) {
    return this.__value.includes(props.value);
  }
  __isFocused(props: accordion.ItemProps) {
    return this.__focusedValue === props.value;
  }
  __isDisabled(props: accordion.ItemProps) {
    return Boolean(props.disabled ?? this.prop("disabled"));
  }
}
