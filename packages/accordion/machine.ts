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

  get __focusedValue(): string {
    return this.context.get("focusedValue");
  }
  get __value(): string[] {
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

  __getItemState(props: accordion.ItemProps): accordion.ItemState {
    return {
      expanded: this.__value.includes(props.value),
      focused: this.__focusedValue === props.value,
      disabled: Boolean(props.disabled ?? this.prop("disabled")),
    };
  }
}
