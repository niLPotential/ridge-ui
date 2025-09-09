import Alpine from "alpinejs";
import { isEqual, isFunction } from "@zag-js/utils";

function access(value: any) {
  if (isFunction(value)) return value();
  return value;
}

/**
 * Inspired by Zag's svelte implementation.
 *
 * @param deps Dependencies to track
 * @param effect Effect to trigger when deps change
 */
export const track = (deps: any[], effect: VoidFunction) => {
  let prevDeps: any[] = [];
  let isFirstRun = true;
  Alpine.effect(() => {
    if (isFirstRun) {
      prevDeps = deps.map((d) => access(d));
      isFirstRun = false;
      return;
    }
    let changed = false;
    for (let i = 0; i < deps.length; i++) {
      if (!isEqual(prevDeps[i], deps[i])) {
        changed = true;
        break;
      }
    }
    if (changed) {
      prevDeps = deps.map((d) => access(d));
      effect();
    }
  });
};
