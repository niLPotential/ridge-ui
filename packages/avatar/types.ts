import type { AnatomyPartAttrs } from "@ridge-ui/lib";

export interface RootProps extends AnatomyPartAttrs {
  ":hidden": () => boolean;
  dir: "ltr" | "rtl";
  id: any;
}
export interface ImageProps extends AnatomyPartAttrs {
  ":hidden": () => boolean;
  dir: "ltr" | "rtl";
  id: any;
  ":data-state": () => "visible" | "hidden";
  "@load": () => void;
  "@error": () => void;
}
export interface FallbackProps extends AnatomyPartAttrs {
  ":hidden": () => boolean;
  dir: "ltr" | "rtl";
  id: any;
  ":data-state": () => "visible" | "hidden";
}
