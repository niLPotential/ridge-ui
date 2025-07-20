import { dataAttr } from "@zag-js/dom-query";
import type { BindableContext, ComputedFn, PropFn } from "@zag-js/core";
import * as accordion from "@zag-js/accordion";
import { useMachine } from "./lib/machine.ts";

export class Accordion {
  private send: (event: any) => void;
  private context: BindableContext<any>;
  private prop: PropFn<any>;
  private computed: ComputedFn<any>;

  constructor(props: Partial<accordion.Props>) {
    const { send, context, prop, computed, init } = useMachine(
      accordion.machine,
      props,
    );
    this.send = send;
    this.context = context;
    this.prop = prop;
    this.computed = computed;
    init();
  }

  get focusedValue() {
    return this.context.get("focusedValue");
  }
  get value() {
    return this.context.get("value");
  }
  private get multiple() {
    return this.prop("multiple");
  }

  setValue(value: string[]) {
    let nextValue = value;
    if (!this.multiple && nextValue.length > 1) {
      nextValue = [nextValue[0]];
    }
    this.send({ type: "VALUE.SET", value: nextValue });
  }

  private getExpanded(props: accordion.ItemProps) {
    return this.value.includes(props.value);
  }
  private getFocused(props: accordion.ItemProps) {
    return this.focusedValue === props.value;
  }
  private getDisabled(props: accordion.ItemProps) {
    return Boolean(props.disabled ?? this.prop("disabled"));
  }
  getItemState(props: accordion.ItemProps): accordion.ItemState {
    return {
      expanded: this.getExpanded(props),
      focused: this.getFocused(props),
      disabled: this.getExpanded(props),
    };
  }

  get root() {
    return {
      dir: this.prop("dir"),
      "data-orientation": this.prop("orientation"),
    };
  }

  item(props: accordion.ItemProps) {
    return {
      dir: this.prop("dir"),
      ":data-state": () => this.getExpanded(props) ? "open" : "closed",
      ":data-focus": () => dataAttr(this.getFocused(props)),
      ":data-disabled": () => dataAttr(this.getDisabled(props)),
      "data-orientation": this.prop("orientation"),
    };
  }

  get itemContent() {
  }

  get itemIndicator() {
  }

  get itemTrigger() {
  }
}
