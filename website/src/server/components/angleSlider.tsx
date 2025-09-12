export default function AngleSliderDemo() {
  return (
    <div
      x-data="angleSlider({id: 1})"
      x-bind="root"
      class="mb-4 flex flex-col items-center gap-2"
    >
      <label x-bind="label" class="flex items-center gap-2">
        Angle Slider: <div x-bind="valueText" x-text="valueAsDegree"></div>
      </label>
      <div
        x-bind="control"
        class="touch-none relative h-120px w-120px flex select-none items-center justify-center rounded-full bg-gray-3 data-[disabled]:opacity-40"
      >
        <div
          x-bind="thumb"
          class="pointer-events-none absolute bottom-0 left-[calc(50%-1.5px)] right-0 top-0 h-full w-1 before:(absolute right-0 top-0 h-40px w-1 bg-red content-[''])"
        >
        </div>
        <div
          x-bind="markerGroup"
          class="pointer-events-none absolute inset-px rounded-120px"
        >
          <template
            x-for="v in [0, 45, 90, 135, 180, 225, 270, 315]"
            x-bind:key="v"
          >
            <div
              x-bind="marker({value: v})"
              class="absolute bottom-0 left-[calc(50%-1px)] top-0 w-0.5 before:(absolute left-0.5px top-sm h-20px w-1 bg-blue content-[''] -translate-50% data-[state=at-value]:bg-blue data-[state=over-value]:bg-coolgray data-[state=under-value]:bg-blue)"
            >
            </div>
          </template>
        </div>
      </div>
      <input x-bind="hiddenInput" />
    </div>
  );
}
