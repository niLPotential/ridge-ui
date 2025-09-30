import * as angleSlider from "@zag-js/angle-slider";
import { AlpineMachine } from "@ridge-ui/lib";

export const parts = angleSlider.anatomy.build();

export class AngleSlider extends AlpineMachine<any> {
  constructor(
    evaluateProps: (
      callback: (value: Partial<angleSlider.Props>) => void,
    ) => void,
  ) {
    super(angleSlider.machine, evaluateProps);
  }

  get __dragging(): boolean {
    return this.state.matches("dragging");
  }

  get __value(): number {
    return this.context.get("value");
  }
  get __valueAsDegree(): string {
    return this.computed("valueAsDegree");
  }

  get __disabled() {
    return this.prop("disabled");
  }
  get __invalid() {
    return this.prop("invalid");
  }
  get __readOnly() {
    return this.prop("readOnly");
  }
  get __interactive() {
    return this.computed("interactive");
  }

  __setValue(value: number) {
    this.send({ type: "VALUE.SET", value });
  }
}
