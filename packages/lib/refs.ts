/**
 * Inspired by Zag's vanilla-ts example and vue implementation.
 *
 * @param refs References to hold
 * @returns Getter and setter of reference
 */
export function createRefs<T>(refs: T) {
  const ref = { current: refs };
  return {
    get<K extends keyof T>(key: K): T[K] {
      return ref.current[key];
    },
    set<K extends keyof T>(key: K, value: T[K]) {
      ref.current[key] = value;
    },
  };
}
