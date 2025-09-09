export default function CheckBoxDemo() {
  return (
    <div x-data="{props: {disabled: false, invalid: false}}">
      <div>
        <label for="disabled">disabled</label>
        <input type="checkbox" id="disabled" x-model="props.disabled" />
      </div>
      <div>
        <label for="invalid">invalid</label>
        <input type="checkbox" id="invalid" x-model="props.invalid" />
      </div>
      <label
        x-data="checkbox(props)"
        x-bind="root"
        class="flex flex-row-reverse gap-2 select-none text-lg data-[disabled]:(cursor-not-allowed opacity-40)"
      >
        <span x-bind="label">
          Input is
          <span x-text="checked ? ' checked' : ' unchecked'"></span>
        </span>
        <div
          x-bind="control"
          class="w-24px h-24px rounded-0.275rem border-solid border-2 border-green text-white data-[hover]:bg-gray-2 data-[focus]:(outline-2 outline-solid outline-red outline-offset-2) data-[disabled]:(bg-black border-blue) data-[invalid]:border-yellow data-[state=indeterminate]:(bg-white border-gray text-gray) data-[state=checked]:(bg-red border-red)"
        >
        </div>
        <input x-bind="hiddenInput" />
      </label>
    </div>
  );
}
