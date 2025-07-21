import type {
  BindableContext,
  ComputedFn,
  Machine,
  MachineSchema,
  PropFn,
} from "@zag-js/core";
import { useMachine } from "./lib/machine.ts";

export class Component<T extends MachineSchema> {
  send: (event: any) => void;
  context: BindableContext<T>;
  prop: PropFn<T>;
  computed: ComputedFn<T>;

  constructor(machine: Machine<T>, userProps: Partial<T["props"]> = {}) {
    const { send, context, prop, computed, init } = useMachine(
      machine,
      userProps,
    );
    this.send = send;
    this.context = context;
    this.prop = prop;
    this.computed = computed;
    init();
  }
}
