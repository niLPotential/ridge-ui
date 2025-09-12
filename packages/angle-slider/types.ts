import type { AnatomyPartAttrs, Booleanish } from "@ridge-ui/lib";

export interface RootProps extends AnatomyPartAttrs {
  id: any;
  ":data-disabled": () => Booleanish;
  ":data-invalid": () => Booleanish;
  ":data-readonly": () => Booleanish;
}
export interface LabelProps extends AnatomyPartAttrs {
  for: any;
  ":data-disabled": () => Booleanish;
  ":data-invalid": () => Booleanish;
  ":data-readonly": () => Booleanish;
  "@click": string;
}
export interface HiddenInputProps {
  type: "hidden";
  value: number;
  name: string;
  id: any;
}
export interface ControlProps extends AnatomyPartAttrs {
  role: "presentation";
  id: any;
  ":data-disabled": () => Booleanish;
  ":data-invalid": () => Booleanish;
  ":data-readonly": () => Booleanish;
  "@pointerdown": (event: any) => void;
}
export interface ThumbProps extends AnatomyPartAttrs {
  "x-ref": "thumb";
  id: any;
  role: "slider";
  "aria-valuemax": 360;
  "aria-valuemin": 0;
  ":aria-valuenow": () => number;
  ":tabIndex": () => 0 | undefined;
  ":data-disabled": () => Booleanish;
  ":data-invalid": () => Booleanish;
  ":data-readonly": () => Booleanish;
  "@focus": () => void;
  "@blur": () => void;
  "@keydown": (event: any) => void;
  ":style": () => { rotate: string };
}
export interface ValueTextProps extends AnatomyPartAttrs {
  id: any;
}
export interface MarkerGroupProps extends AnatomyPartAttrs {}
export interface MarkerProps extends AnatomyPartAttrs {
  ":data-value": () => number;
  ":data-state": () => "under-value" | "at-value" | "over-value";
  ":data-disabled": () => Booleanish;
  ":style": () => { rotate: string };
}
