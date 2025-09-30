import { dataAttr, getEventKey, isSafari } from "@zag-js/dom-query";
import type { EventKeyMap } from "@zag-js/types";
import type { ItemProps } from "@zag-js/accordion";
import type { Alpine, ElementWithXAttributes } from "alpinejs";
import { Accordion, parts } from "./machine.ts";
import {
  getItemContentId,
  getItemId,
  getItemTriggerId,
  getRootId,
} from "./dom.ts";

export default function (Alpine: Alpine) {
  Alpine.directive(
    "accordion",
    (el, { expression, value }, { evaluateLater }) => {
      if (!value) {
        Alpine.bind(el, {
          "x-data"() {
            return {
              accordion: new Accordion(evaluateLater(expression)),
            };
          },
          "x-init"() {
            (this.$data.accordion as Accordion).init();
          },
        } as any);
      } else if (value === "root") handleRootProps(el, Alpine);
      else if (value === "item") {
        handleItemProps(el, Alpine, evaluateLater(expression));
      } else if (value === "item-content") {
        handleItemContentProps(el, Alpine, evaluateLater(expression));
      } else if (value === "item-indicator") {
        handleItemIndicatorProps(el, Alpine, evaluateLater(expression));
      } else if (value === "item-trigger") {
        handleItemTriggerProps(el, Alpine, evaluateLater(expression));
      }
    },
  ).before("bind");

  Alpine.magic("accordion", (el, { Alpine }) => {
    const { accordion } = Alpine.$data(el) as { accordion: Accordion };

    return {
      get focusedValue() {
        return accordion.__focusedValue;
      },
      get value() {
        return accordion.__value;
      },
      setValue: accordion.__setValue,
      getItemState: accordion.__getItemState,
    };
  });
}

function handleRootProps(el: ElementWithXAttributes, Alpine: Alpine) {
  Alpine.bind(el, {
    ...parts.root.attrs,
    ":dir"() {
      return (this.$data.accordion as Accordion).prop("dir");
    },
    ":id"() {
      return getRootId((this.$data.accordion as Accordion).scope);
    },
    ":data-orientation"() {
      return (this.$data.accordion as Accordion).prop("orientation");
    },
  } as any);
}

function handleItemProps(
  el: ElementWithXAttributes,
  Alpine: Alpine,
  evaluateProps: (callback: (itemProps: ItemProps) => void) => void,
) {
  Alpine.bind(el, function () {
    let props: ItemProps;
    evaluateProps((itemProps) => {
      props = itemProps;
    });
    // @ts-ignore item props
    const itemState = (this.$data.accordion as Accordion).__getItemState(props);
    return {
      ...parts.item.attrs,
      ":dir"() {
        return (this.$data.accordion as Accordion).prop("dir");
      },
      ":id"() {
        return getItemId(
          (this.$data.accordion as Accordion).scope,
          props.value,
        );
      },
      ":data-state"() {
        return itemState.expanded ? "open" : "closed";
      },
      ":data-focus"() {
        return dataAttr(itemState.focused);
      },
      ":data-disabled"() {
        return dataAttr(itemState.disabled);
      },
      ":data-orientation"() {
        return (this.$data.accordion as Accordion).prop("orientation");
      },
    } as any;
  });
}

function handleItemContentProps(
  el: ElementWithXAttributes,
  Alpine: Alpine,
  evaluateProps: (callback: (itemProps: ItemProps) => void) => void,
) {
  Alpine.bind(el, function () {
    let props: ItemProps;
    evaluateProps((itemProps) => {
      props = itemProps;
    });
    // @ts-ignore item props
    const itemState = (this.$data.accordion as Accordion).__getItemState(props);
    return {
      ...parts.itemContent.attrs,
      ":dir"() {
        return (this.$data.accordion as Accordion).prop("dir");
      },
      role: "region",
      ":id"() {
        return getItemContentId(
          (this.$data.accordion as Accordion).scope,
          props.value,
        );
      },
      ":aria-labelledby"() {
        return getItemTriggerId(
          (this.$data.accordion as Accordion).scope,
          props.value,
        );
      },
      ":hidden"() {
        return !itemState.expanded;
      },
      ":data-state"() {
        return itemState.expanded ? "open" : "closed";
      },
      ":data-disabled"() {
        return dataAttr(itemState.disabled);
      },
      ":data-focus"() {
        return dataAttr(itemState.focused);
      },
      ":data-orientation"() {
        return (this.$data.accordion as Accordion).prop("orientation");
      },
    } as any;
  });
}

function handleItemIndicatorProps(
  el: ElementWithXAttributes,
  Alpine: Alpine,
  evaluateProps: (callback: (itemProps: ItemProps) => void) => void,
) {
  Alpine.bind(el, function () {
    let props: ItemProps;
    evaluateProps((itemProps) => {
      props = itemProps;
    });
    // @ts-ignore item props
    const itemState = (this.$data.accordion as Accordion).__getItemState(props);
    return {
      ...parts.itemIndicator.attrs,
      ":dir"() {
        return (this.$data.accordion as Accordion).prop("dir");
      },
      "aria-hidden": true,
      ":data-state"() {
        return itemState.expanded ? "open" : "closed";
      },
      ":data-disabled"() {
        return dataAttr(itemState.disabled);
      },
      ":data-focus"() {
        return dataAttr(itemState.focused);
      },
      ":data-orientation"() {
        return (this.$data.accordion as Accordion).prop("orientation");
      },
    } as any;
  });
}

function handleItemTriggerProps(
  el: ElementWithXAttributes,
  Alpine: Alpine,
  evaluateProps: (callback: (itemProps: ItemProps) => void) => void,
) {
  Alpine.bind(el, function () {
    let props: ItemProps;
    evaluateProps((itemProps) => {
      props = itemProps;
    });
    // @ts-ignore item props
    const itemState = (this.$data.accordion as Accordion).__getItemState(props);
    return {
      ...parts.itemTrigger.attrs,
      type: "button",
      ":dir"() {
        return (this.$data.accordion as Accordion).prop("dir");
      },
      ":id"() {
        return getItemTriggerId(
          (this.$data.accordion as Accordion).scope,
          props.value,
        );
      },
      ":aria-controls"() {
        return getItemContentId(
          (this.$data.accordion as Accordion).scope,
          props.value,
        );
      },
      ":aria-expanded"() {
        return itemState.expanded;
      },
      disabled() {
        return itemState.disabled;
      },
      ":data-orientation"() {
        return (this.$data.accordion as Accordion).prop("orientation");
      },
      ":aria-disabled"() {
        return itemState.disabled;
      },
      ":data-state"() {
        return itemState.expanded ? "open" : "closed";
      },
      ":data-ownedby"() {
        return getRootId((this.$data.accordion as Accordion).scope);
      },
      "@focus"() {
        if (itemState.disabled) return;
        (this.$data.accordion as Accordion).send({ type: "TRIGGER.BLUR" });
      },
      "@click"(event: any) {
        if (itemState.disabled) return;
        if (isSafari()) {
          event.currentTarget.focus();
        }
        (this.$data.accordion as Accordion).send({
          type: "TRIGGER.CLICK",
          value: props.value,
        });
      },
      "@keydown"(event: any) {
        if (event.defaultPrevented) return;
        if (itemState.disabled) return;

        const keyMap: EventKeyMap = {
          ArrowDown: () => {
            if ((this.$data.accordion as Accordion).computed("isHorizontal")) {
              return;
            }
            (this.$data.accordion as Accordion).send({
              type: "GOTO.NEXT",
              value: props.value,
            });
          },
          ArrowUp: () => {
            if ((this.$data.accordion as Accordion).computed("isHorizontal")) {
              return;
            }
            (this.$data.accordion as Accordion).send({
              type: "GOTO.PREV",
              value: props.value,
            });
          },
          ArrowRight: () => {
            if (!(this.$data.accordion as Accordion).computed("isHorizontal")) {
              return;
            }
            (this.$data.accordion as Accordion).send({
              type: "GOTO.NEXT",
              value: props.value,
            });
          },
          ArrowLeft: () => {
            if (!(this.$data.accordion as Accordion).computed("isHorizontal")) {
              return;
            }
            (this.$data.accordion as Accordion).send({
              type: "GOTO.PREV",
              value: props.value,
            });
          },
          Home: () => {
            (this.$data.accordion as Accordion).send({
              type: "GOTO.FIRST",
              value: props.value,
            });
          },
          End: () => {
            (this.$data.accordion as Accordion).send({
              type: "GOTO.LAST",
              value: props.value,
            });
          },
        };
        const key = getEventKey(event, {
          dir: (this.$data.accordion as Accordion).prop("dir"),
          orientation: (this.$data.accordion as Accordion).prop("orientation"),
        });

        const exec = keyMap[key];

        if (exec) {
          exec(event);
          event.preventDefault();
        }
      },
    } as any;
  });
}
