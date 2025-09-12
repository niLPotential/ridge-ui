import type { AnatomyPartAttrs, Booleanish } from "@ridge-ui/lib";

export interface RootProps extends AnatomyPartAttrs {
  dir: "ltr" | "rtl";
  id: any;
  "data-orientation": "horizontal" | "vertical";
}
export interface ItemProps extends AnatomyPartAttrs {
  dir: "ltr" | "rtl";
  id: any;
  ":data-state": () => "open" | "closed";
  ":data-focus": () => Booleanish;
  ":data-disabled": () => Booleanish;
  "data-orientation": "horizontal" | "vertical";
}
export interface ItemContentProps extends AnatomyPartAttrs {
  dir: "ltr" | "rtl";
  role: "region";
  id: any;
  "aria-labeledby": any;
  ":hidden": () => boolean;
  ":data-state": () => "open" | "closed";
  ":data-disabled": () => Booleanish;
  ":data-focus": () => Booleanish;
  "data-orientation": "horizontal" | "vertical";
}
export interface ItemIndicatorProps extends AnatomyPartAttrs {
  dir: "ltr" | "rtl";
  "aria-hidden": true;
  ":data-state": () => "open" | "closed";
  ":data-disabled": () => Booleanish;
  ":data-focus": () => Booleanish;
  "data-orientation": "horizontal" | "vertical";
}
export interface ItemTriggerProps extends AnatomyPartAttrs {
  type: "button";
  dir: "ltr" | "rtl";
  id: any;
  "aria-controls": any;
  ":aria-expanded": () => boolean;
  ":disabled": () => boolean;
  "data-orientation": "horizontal" | "vertical";
  ":aria-disabled": () => boolean;
  ":data-state": () => "open" | "closed";
  "data-ownedby": any;
  "@focus": () => void;
  "@blur": () => void;
  "@click": (event: any) => void;
  "@keydown": (event: any) => void;
}
