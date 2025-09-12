import { dataAttr, getEventKey, isSafari } from "@zag-js/dom-query";
import * as accordion from "@zag-js/accordion";
import { AlpineMachine } from "@ridge-ui/lib";
import {
  getItemContentId,
  getItemId,
  getItemTriggerId,
  getRootId,
} from "./dom.ts";
import type {
  ItemContentProps,
  ItemIndicatorProps,
  ItemProps,
  ItemTriggerProps,
  RootProps,
} from "./types.ts";

const parts = accordion.anatomy.build();

export class Accordion extends AlpineMachine<any> {
  constructor(userProps: Partial<accordion.Props>) {
    super(accordion.machine, userProps);
  }

  get focusedValue(): string {
    return this.context.get("focusedValue");
  }
  get value(): string[] {
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

  get root(): RootProps {
    return {
      ...parts.root.attrs,
      dir: this.prop("dir"),
      id: getRootId(this.scope),
      "data-orientation": this.prop("orientation"),
    };
  }

  item = (props: accordion.ItemProps): ItemProps => ({
    ...parts.item.attrs,
    dir: this.prop("dir"),
    id: getItemId(this.scope, props.value),
    ":data-state": () => this.getExpanded(props) ? "open" : "closed",
    ":data-focus": () => dataAttr(this.getFocused(props)),
    ":data-disabled": () => dataAttr(this.getDisabled(props)),
    "data-orientation": this.prop("orientation"),
  });

  itemContent = (props: accordion.ItemProps):ItemContentProps => {
    return {
      ...parts.itemContent.attrs,
      dir: this.prop("dir"),
      role: "region",
      id: getItemContentId(this.scope, props.value),
      "aria-labeledby": getItemTriggerId(this.scope, props.value),
      ":hidden": () => !this.getExpanded(props),
      ":data-state": () => this.getExpanded(props) ? "open" : "closed",
      ":data-disabled": () => dataAttr(this.getDisabled(props)),
      ":data-focus": () => dataAttr(this.getFocused(props)),
      "data-orientation": this.prop("orientation"),
    };
  };

  itemIndicator = (props: accordion.ItemProps):ItemIndicatorProps => {
    return {
      ...parts.itemIndicator.attrs,
      dir: this.prop("dir"),
      "aria-hidden": true,
      ":data-state": () => this.getExpanded(props) ? "open" : "closed",
      ":data-disabled": () => dataAttr(this.getDisabled(props)),
      ":data-focus": () => dataAttr(this.getFocused(props)),
      "data-orientation": this.prop("orientation"),
    };
  };

  itemTrigger = (props: accordion.ItemProps):ItemTriggerProps => {
    return {
      ...parts.itemTrigger.attrs,
      type: "button",
      dir: this.prop("dir"),
      id: getItemTriggerId(this.scope, props.value),
      "aria-controls": getItemContentId(this.scope, props.value),
      ":aria-expanded": () => this.getExpanded(props),
      ":disabled": () => this.getDisabled(props),
      "data-orientation": this.prop("orientation"),
      ":aria-disabled": () => this.getDisabled(props),
      ":data-state": () => this.getExpanded(props) ? "open" : "closed",
      "data-ownedby": getRootId(this.scope),
      "@focus": () => {
        if (this.getDisabled(props)) return;
        this.send({ type: "TRIGGER.FOCUS", value: props.value });
      },
      "@blur": () => {
        if (this.getDisabled(props)) return;
        this.send({ type: "TRIGGER.BLUR" });
      },
      "@click": (event: any) => {
        if (this.getDisabled(props)) return;
        if (isSafari()) {
          event.currentTarget.focus();
        }
        this.send({ type: "TRIGGER.CLICK", value: props.value });
      },
      "@keydown": (event: any) => {
        if (event.defaultPrevented) return;
        if (this.getDisabled(props)) return;

        const key = getEventKey(event, {
          dir: this.prop("dir"),
          orientation: this.prop("orientation"),
        });

        switch (key) {
          case ("ArrowDown"): {
            if (this.computed("isHorizontal")) return;
            this.send({ type: "GOTO.NEXT", value: props.value });
            event.preventDefault();
            break;
          }
          case ("ArrowUp"): {
            if (this.computed("isHorizontal")) return;
            this.send({ type: "GOTO.PREV", value: props.value });
            event.preventDefault();
            break;
          }
          case ("ArrowRight"): {
            if (!this.computed("isHorizontal")) return;
            this.send({ type: "GOTO.NEXT", value: props.value });
            event.preventDefault();
            break;
          }
          case ("ArrowLeft"): {
            if (!this.computed("isHorizontal")) return;
            this.send({ type: "GOTO.PREV", value: props.value });
            event.preventDefault();
            break;
          }
          case ("Home"): {
            this.send({ type: "GOTO.FIRST", value: props.value });
            event.preventDefault();
            break;
          }
          case ("End"): {
            this.send({ type: "GOTO.LAST", value: props.value });
            event.preventDefault();
            break;
          }
        }
      },
    };
  };
}
