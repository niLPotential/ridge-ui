export default function AngleSliderDemo() {
  return (
    <div x-data="angle-slider({})" x-bind="root">
      <label x-bind="label">
        Angle Slider: <div x-bind="value-text" x-text="valueAsDegree"></div>
      </label>
      <div x-bind="control">
        <div x-bind="thumb"></div>
        <div x-bind="markerGroup">
          <template
            x-for="v in [0, 45, 90, 135, 180, 225, 270, 315]"
            x-bind:key="v"
          >
            <div x-bind="marker(v)"></div>
          </template>
        </div>
      </div>
      <input x-bind="hidden-input" />
    </div>
  );
}
