// import {} from "@zag-js/popper";
import * as combobox from "@zag-js/combobox";
import { AlpineMachine } from "@ridge-ui/lib";
import * as dom from "./dom.ts";

export class Combobox extends AlpineMachine<any> implements combobox.Api {
  constructor(userProps: Partial<combobox.Props>) {
    super(combobox.machine, userProps);
  }

  private get translations() {
    return this.prop("translations");
  }
  private get collection() {
    return this.prop("collection");
  }

  get disabled() {
    return !!this.prop("disabled");
  }
  private get interactive() {
    return this.computed("isInteractive");
  }
  private get invalid() {
    return !!this.prop("invalid");
  }
  private get required() {
    return !!this.prop("required");
  }
  private get readOnly() {
    return !!this.prop("readOnly");
  }

  get open() {
    return this.state.hasTag("open");
  }
  get focused() {
    return this.state.hasTag("focused");
  }
  private get composite() {
    return this.prop("composite");
  }
  get highlightedValue() {
    return this.context.get("highlightedValue");
  }

  getItemState(props: combobox.ItemProps): combobox.ItemState {
    const value = this.collection.getItemValue(props.item);
    return {
      value,
      disabled: Boolean(
        this.collection.getItemDisabled(props.item) || this.disabled,
      ),
      highlighted: this.highlightedValue === value,
      selected: this.context.get("value").includes(value),
    };
  }

  get inputValue() {
    return this.context.get("inputValue");
  }
  get highlightedItem() {
    return this.context.get("highlightedItem");
  }
  get value() {
    return this.context.get("value");
  }
  get valueAsString() {
    return this.computed("valueAsString");
  }
  get hasSelectedItems() {
    return this.computed("hasSelectedItems");
  }
  get selectedItems() {
    return this.computed("selectedItems");
  }
  get multiple() {
    return !!this.prop("multiple");
  }

  syncSelectedItems() {
    this.send({ type: "SELECTED_ITEMS.SYNC" });
  }
  reposition = (options = {}) =>
    this.send({ type: "POSITIONING.SET", options });
  setHighlightValue = (value: any) =>
    this.send({ type: "HIGHLIGHTED_VALUE.SET", value });
  clearHighlightValue() {
    this.send({ type: "HIGHLIGHTED_VALUE.CLEAR" });
  }
  selectValue = (value: any) => this.send({ type: "ITEM.SELECT", value });
  setValue = (value: any) => this.send({ type: "VALUE.SET", value });
  setInputValue = (value: any, reason = "script") =>
    this.send({ type: "INPUT_VALUE.SET", value, src: reason });
  clearValue = (value: any) =>
    (value != null)
      ? this.send({ type: "ITEM.CLEAR", value })
      : this.send({ type: "VALUE.CLEAR" });
  //   focus() {
  //     dom.getInputEl(this.scope)?.focus();
  //   }
  setOpen(nextOpen: any, reason = "script") {
    const open = this.state.hasTag("open");
    if (open === nextOpen) return;
    this.send({ type: nextOpen ? "OPEN" : "CLOSE", src: reason });
  }
}
