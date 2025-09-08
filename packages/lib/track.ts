import Alpine from "alpinejs";

export const useTrack = (deps: any[], effect: VoidFunction) => {
  Alpine.reactive([...deps.map((d) => d())]);
  Alpine.effect(() => {
    effect();
  });
};
