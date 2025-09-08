import type {
  Bindable,
  BindableContext,
  ComputedFn,
  Machine,
  MachineSchema,
  PropFn,
} from "@zag-js/core";
import { useMachine } from "./machine.ts";

export class Component<T extends MachineSchema> {
  state: Bindable<T["state"]>;
  send: (event: any) => void;
  context: BindableContext<T>;
  prop: PropFn<T>;
  computed: ComputedFn<T>;

  constructor(machine: Machine<T>, userProps: Partial<T["props"]> = {}) {
    const { state, send, context, prop, computed, init } = useMachine(
      machine,
      userProps,
    );
    this.state = state;
    this.send = send;
    this.context = context;
    this.prop = prop;
    this.computed = computed;
    init();
  }
}
