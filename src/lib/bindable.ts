import type { Bindable, BindableParams } from "@zag-js/core";
import { isFunction } from "@zag-js/utils";
import Alpine from "alpinejs";

export function bindable<T>(props: () => BindableParams<T>): Bindable<T> {
  const initial = props().value ?? props().defaultValue;

  if (props().debug) {
    console.log(`[bindable > ${props().debug}] initial`, initial);
  }

  const eq = props().isEqual ?? Object.is;

  const store = Alpine.reactive({ value: initial as T });

  const controlled = { value: props().value !== undefined };

  return {
    initial,
    ref: store,
    get() {
      return controlled.value ? (props().value as T) : store.value;
    },
    set(nextValue: T | ((prev: T) => T)) {
      const prev = store.value;
      const next = isFunction(nextValue) ? nextValue(prev) : nextValue;

      if (props().debug) {
        console.log(`[bindable > ${props().debug}] setValue`, { next, prev });
      }

      if (!controlled.value) store.value = next;
      if (!eq(next, prev)) {
        props().onChange?.(next, prev);
      }
    },
    invoke(nextValue: T, prevValue: T) {
      props().onChange?.(nextValue, prevValue);
    },
    hash(value: T) {
      return props().hash?.(value) ?? String(value);
    },
  };
}

bindable.cleanup = (_fn: VoidFunction) => {
  // No-op in vanilla implementation
};

bindable.ref = <T>(defaultValue: T) => {
  let value = defaultValue;
  return {
    get: () => value,
    set: (next: T) => {
      value = next;
    },
  };
};
