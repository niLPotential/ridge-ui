import type { AnatomyPartAttrs, Booleanish } from "@ridge-ui/lib";
import type { visuallyHiddenStyle } from "@zag-js/dom-query";

interface DataAttrs {
  ":data-active": () => Booleanish;
  ":data-focus": () => Booleanish;
  ":data-focus-visible": () => Booleanish;
  ":data-readonly": () => Booleanish;
  ":data-hover": () => Booleanish;
  ":data-disabled": () => Booleanish;
  ":data-state": () => "indeterminate" | "checked" | "unchecked";
  ":data-invalid": () => Booleanish;
  ":data-required": () => Booleanish;
}
export interface RootProps extends AnatomyPartAttrs, DataAttrs {
  dir: "ltr" | "rtl" | undefined;
  id: any;
  for: any;
  "@pointermove": () => void;
  "@pointerleave": () => void;
  "@click":
    "$event.target === $refs['hidden-input'] && $event.stopPropagation()";
}
export interface LabelProps extends AnatomyPartAttrs, DataAttrs {
  dir: "ltr" | "rtl" | undefined;
  id: any;
}
export interface ControlProps extends AnatomyPartAttrs, DataAttrs {
  dir: "ltr" | "rtl" | undefined;
  id: any;
  "aria-hidden": true;
}
export interface IndicatorProps extends AnatomyPartAttrs, DataAttrs {
  dir: "ltr" | "rtl" | undefined;
  ":hidden": () => boolean;
}
export interface HiddenInputProps {
  "x-ref": "hidden-input";
  id: any;
  type: "checkbox";
  ":required": () => boolean | undefined;
  ":defaultChecked": () => boolean;
  ":disabled": () => boolean | undefined;
  ":aria-labelledby": "$id('label')";
  ":aria-invalid": () => boolean | undefined;
  name: string | undefined;
  form: string | undefined;
  value: string;
  ":style": () => typeof visuallyHiddenStyle;
  "@focus": () => void;
  "@blur": () => void;
  "@click": (event: any) => void;
}
