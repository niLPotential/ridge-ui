export default function CheckBoxDemo() {
  return (
    <div x-data="{props: {disabled: false, invalid: false}}">
      <div>
        <input type="checkbox" id="disabled" x-model="props.disabled" />
        <label for="disabled">disabled</label>
      </div>
      <div>
        <input type="checkbox" id="invalid" x-model="props.invalid" />
        <label for="invalid">invalid</label>
      </div>
      <label
        x-data="checkbox(props)"
        x-bind="root"
        class="flex flex-row select-none gap-2 text-lg data-[disabled]:(cursor-not-allowed opacity-40)"
      >
        <div
          x-bind="control"
          class="h-24px w-24px border-2 border-blue rounded-0.275rem border-solid text-white data-[disabled]:(border-black bg-black) data-[invalid]:border-red data-[state=checked]:(border-blue bg-blue) data-[state=indeterminate]:(border-yellow bg-white text-yellow) data-[hover]:bg-gray data-[focus]:(outline-2 outline-blue outline-offset-2 outline-solid)"
        >
        </div>
        <span x-bind="label">
          Input is
          <span x-text="checked ? ' checked' : ' unchecked'"></span>
        </span>
        <input x-bind="hiddenInput" />
      </label>
    </div>
  );
}
