import * as avatar from "@zag-js/avatar";
import { AlpineMachine } from "@ridge-ui/lib";

export const parts = avatar.anatomy.build();

export class Avatar extends AlpineMachine<any> {
  constructor(
    evaluateProps: (callback: (value: Partial<avatar.Props>) => void) => void,
  ) {
    super(avatar.machine, evaluateProps);
  }

  get __loaded() {
    return this.state.matches("loaded");
  }
}
