// import {} from "@zag-js/popper";
import {
  ariaAttr,
  dataAttr,
  isContextMenuEvent,
  isDownloadingEvent,
  isLeftClick,
  isOpeningInNewTab,
} from "@zag-js/dom-query";
// import type { EventKeyMap } from "@zag-js/types";
import * as combobox from "@zag-js/combobox";
import { AlpineMachine } from "@ridge-ui/lib";
import * as dom from "./dom.ts";

const parts = combobox.anatomy.build();

export class Combobox extends AlpineMachine<any> implements combobox.Api {
  constructor(userProps: Partial<combobox.Props>) {
    super(combobox.machine, userProps);
  }

  private get translations() {
    return this.prop("translations");
  }
  get collection() {
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
  focus() {
    dom.getInputEl(this.scope)?.focus();
  }
  setOpen(nextOpen: any, reason = "script") {
    const open = this.state.hasTag("open");
    if (open === nextOpen) return;
    this.send({ type: nextOpen ? "OPEN" : "CLOSE", src: reason });
  }

  getRootProps() {
    return {
      ...parts.root.attrs,
      dir: this.prop("dir"),
      id: dom.getRootId(this.scope),
      ":data-invalid": () => dataAttr(this.invalid),
      ":data-readonly": () => dataAttr(this.readOnly),
    };
  }

  getLabelProps() {
    return {
      ...parts.label.attrs,
      dir: this.prop("dir"),
      htmlFor: dom.getInputId(this.scope),
      id: dom.getLabelId(this.scope),
      ":data-readonly": () => dataAttr(this.readOnly),
      ":data-disabled": () => dataAttr(this.disabled),
      ":data-invalid": () => dataAttr(this.invalid),
      ":data-required": () => dataAttr(this.required),
      ":data-focus": () => dataAttr(this.focused),
      "@click": (event: any) => {
        if (this.composite) return;
        event.preventDefault();
        dom.getTriggerEl(this.scope)?.focus({ preventScroll: true });
      },
    };
  }

  getControlProps() {
    return {
      ...parts.control.attrs,
      dir: this.prop("dir"),
      id: dom.getControlId(this.scope),
      ":data-state": () => this.open ? "open" : "closed",
      ":data-focus": () => dataAttr(this.focused),
      ":data-disabled": () => dataAttr(this.disabled),
      ":data-invalid": () => dataAttr(this.invalid),
    };
  }

  getPositionerProps() {
    return {
      ...parts.positioner.attrs,
      dir: this.prop("dir"),
      id: dom.getPositionerId(this.scope),
      //   style: popperStyles.floating,
    };
  }

  getInputProps() {
    return {
      ...parts.input.attrs,
      dir: this.prop("dir"),
      "aria-invalid": ariaAttr(this.invalid),
      "data-invalid": dataAttr(this.invalid),
      "data-autofocus": dataAttr(this.prop("autoFocus")),
      name: this.prop("name"),
      form: this.prop("form"),
      disabled: this.disabled,
      required: this.prop("required"),
      autoComplete: "off",
      autoCorrect: "off",
      autoCapitalize: "none",
      spellCheck: "false",
      readOnly: this.readOnly,
      placeholder: this.prop("placeholder"),
      id: dom.getInputId(this.scope),
      type: "text",
      role: "combobox",
      defaultValue: this.context.get("inputValue"),
      "aria-autocomplete": this.computed("autoComplete") ? "both" : "list",
      "aria-controls": dom.getContentId(this.scope),
      "aria-expanded": open,
      "data-state": this.open ? "open" : "closed",
      "aria-activedescendant": this.highlightedValue
        ? dom.getItemId(this.scope, this.highlightedValue)
        : undefined,
      "@click": (event: any) => {
        if (event.defaultPrevented) return;
        if (!this.prop("openOnClick")) return;
        if (!this.interactive) return;
        this.send({ type: "INPUT.CLICK", src: "input-click" });
      },
      "@focus": () => {
        if (this.disabled) return;
        this.send({ type: "INPUT.FOCUS" });
      },
      "@blur": () => {
        if (this.disabled) return;
        this.send({ type: "INPUT.BLUR" });
      },
      "@change": (event: any) => {
        this.send({
          type: "INPUT.CHANGE",
          value: event.currentTarget.value,
          src: "input-change",
        });
      },
      // "@keydown":(event:any)=> {
      //   if (event.defaultPrevented) return
      //   if (!this.interactive) return

      //   if (event.ctrlKey || event.shiftKey || isComposingEvent(event)) return

      //   const openOnKeyPress = this.prop("openOnKeyPress")
      //   const isModifierKey = event.ctrlKey || event.metaKey || event.shiftKey
      //   const keypress = true

      //   const keymap: EventKeyMap = {
      //     ArrowDown(event: any) {
      //       if (!openOnKeyPress && !open) return
      //       this.send({ type: event.altKey ? "OPEN" : "INPUT.ARROW_DOWN", keypress, src: "arrow-key" })
      //       event.preventDefault()
      //     },
      //     ArrowUp() {
      //       if (!openOnKeyPress && !open) return
      //       send({ type: event.altKey ? "CLOSE" : "INPUT.ARROW_UP", keypress, src: "arrow-key" })
      //       event.preventDefault()
      //     },
      //     Home(event) {
      //       if (isModifierKey) return
      //       send({ type: "INPUT.HOME", keypress })
      //       if (open) {
      //         event.preventDefault()
      //       }
      //     },
      //     End(event) {
      //       if (isModifierKey) return
      //       send({ type: "INPUT.END", keypress })
      //       if (open) {
      //         event.preventDefault()
      //       }
      //     },
      //     Enter(event) {
      //       send({ type: "INPUT.ENTER", keypress, src: "item-select" })

      //       // when there's a form owner, allow submitting custom value if `allowCustomValue` is true
      //       const submittable = computed("isCustomValue") && prop("allowCustomValue")
      //       // Also allow submission when there's no highlighted item (bug fix)
      //       const hasHighlight = highlightedValue != null
      //       // Allow submission when alwaysSubmitOnEnter is true
      //       const alwaysSubmit = prop("alwaysSubmitOnEnter")

      //       if (open && !submittable && !alwaysSubmit && hasHighlight) {
      //         event.preventDefault()
      //       }

      //       if (highlightedValue == null) return

      //       const itemEl = dom.getItemEl(scope, highlightedValue)
      //       if (isAnchorElement(itemEl)) {
      //         prop("navigate")?.({ value: highlightedValue, node: itemEl, href: itemEl.href })
      //       }
      //     },
      //     Escape() {
      //       send({ type: "INPUT.ESCAPE", keypress, src: "escape-key" })
      //       event.preventDefault()
      //     },
      //   }

      //   const key = getEventKey(event, { dir: prop("dir") })
      //   const exec = keymap[key]
      //   exec?.(event)
    };
  }

  getTriggerProps() {
    return {};
  }

  getContentProps() {
    return {
      ...parts.content.attrs,
      dir: this.prop("dir"),
      id: dom.getContentId(this.scope),
      role: !this.composite ? "dialog" : "listbox",
      tabIndex: -1,
      hidden: !this.open,
      "data-state": this.open ? "open" : "closed",
      "data-placement": this.context.get("currentPlacement"),
      "aria-labelledby": dom.getLabelId(this.scope),
      "aria-multiselectable": this.prop("multiple") && this.composite
        ? true
        : undefined,
      "data-empty": dataAttr(this.collection.size === 0),
      "@pointerdown"(event: any) {
        if (!isLeftClick(event)) return;
        // prevent options or elements within listbox from taking focus
        event.preventDefault();
      },
    };
  }

  getListProps() {
    return {
      ...parts.list.attrs,
      role: !this.composite ? "listbox" : undefined,
      "data-empty": dataAttr(this.collection.size === 0),
      "aria-labelledby": dom.getLabelId(this.scope),
      "aria-multiselectable": this.prop("multiple") && !this.composite
        ? true
        : undefined,
    };
  }

  getClearTriggerProps() {
    return {
      ...parts.clearTrigger.attrs,
      dir: this.prop("dir"),
      id: dom.getClearTriggerId(this.scope),
      type: "button",
      tabIndex: -1,
      disabled: this.disabled,
      "data-invalid": dataAttr(this.invalid),
      "aria-label": this.translations.clearTriggerLabel,
      "aria-controls": dom.getInputId(this.scope),
      ":hidden": () => !this.context.get("value").length,
      "@pointerdown": (event: any) => {
        if (!isLeftClick(event)) return;
        event.preventDefault();
      },
      "@click": (event: any) => {
        if (event.defaultPrevented) return;
        if (!this.interactive) return;
        this.send({ type: "VALUE.CLEAR", src: "clear-trigger" });
      },
    };
  }

  getItemProps(props: combobox.ItemProps) {
    const { value, highlighted, selected, disabled } = this.getItemState(props);
    return {
      ...parts.item.attrs,
      dir: this.prop("dir"),
      id: dom.getItemId(this.scope, this.value),
      role: "option",
      tabIndex: -1,
      "data-highlighted": dataAttr(highlighted),
      "data-state": selected ? "checked" : "unchecked",
      "aria-selected": ariaAttr(highlighted),
      "aria-disabled": ariaAttr(disabled),
      "data-disabled": dataAttr(disabled),
      "data-value": value,
      "@pointermove": () => {
        if (disabled) return;
        if (highlighted) return;
        this.send({ type: "ITEM.POINTER_MOVE", value });
      },
      "pointerleave": (event: any) => {
        if (props.persistFocus) return;
        if (disabled) return;
        const prev = event.previous();
        const mouseMoved = prev?.type.includes("POINTER");
        if (!mouseMoved) return;
        this.send({ type: "ITEM.POINTER_LEAVE", value });
      },
      "@click": (event: any) => {
        if (isDownloadingEvent(event)) return;
        if (isOpeningInNewTab(event)) return;
        if (isContextMenuEvent(event)) return;
        if (disabled) return;
        this.send({ type: "ITEM.CLICK", src: "item-select", value });
      },
    };
  }

  getItemTextProps(props: combobox.ItemProps) {
    return {
      ...parts.itemText.attrs,
      dir: this.prop("dir"),
      ":data-state": () =>
        this.getItemState(props).selected ? "checked" : "unchecked",
      ":data-disabled": () => dataAttr(this.getItemState(props).disabled),
      ":data-highlighted": () => dataAttr(this.getItemState(props).highlighted),
    };
  }

  getItemIndicatorProps(props: combobox.ItemProps) {
    const { selected } = this.getItemState(props);
    return {
      "aria-hidden": true,
      ...parts.itemIndicator.attrs,
      dir: this.prop("dir"),
      ":data-state": () => selected ? "checked" : "unchecked",
      ":hidden": () => !selected,
    };
  }

  getItemGroupProps({ id }: combobox.ItemGroupProps) {
    return {
      ...parts.itemGroup.attrs,
      dir: this.prop("dir"),
      id: dom.getItemGroupId(this.scope, id),
      "aria-labelledby": dom.getItemGroupLabelId(this.scope, id),
      "data-empty": dataAttr(this.collection.size === 0),
      role: "group",
    };
  }

  getItemGroupLabelProps({ htmlFor }: combobox.ItemGroupLabelProps) {
    return {
      ...parts.itemGroupLabel.attrs,
      dir: this.prop("dir"),
      id: dom.getItemGroupLabelId(this.scope, htmlFor),
      role: "presentation",
    };
  }
}
