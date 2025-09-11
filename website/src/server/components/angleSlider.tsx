export default function AngleSliderDemo() {
  return (
    <div
      x-data="angle-slider({})"
      x-bind="root"
      class="mb-4 flex flex-col items-center gap-2"
    >
      <label x-bind="label" class="flex items-center gap-2">
        Angle Slider: <div x-bind="value-text" x-text="valueAsDegree"></div>
      </label>
      <div
        x-bind="control"
        class="relative h-120px w-120px flex select-none items-center justify-center rounded-full bg-blueGray data-[disabled]:opacity-40"
      >
        <div
          x-bind="thumb"
          class="pointer-events-none absolute bottom-0 left-[calc(50%-1.5px)] right-0 top-0 h-full w-1 before:(absolute right-0 top-0 h-sm w-1 bg-blue)"
        >
        </div>
        <div
          x-bind="markerGroup"
          class="absolute bottom-0 left-[calc(50%-1px)] top-0 w-0.5 before:(absolute left-0.5px top-sm h-[1.75rem] w-1px bg-blue -translate-50%)"
        >
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
