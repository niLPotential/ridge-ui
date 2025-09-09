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
        class="flex flex-row gap-2 select-none text-lg data-[disabled]:(cursor-not-allowed opacity-40)"
      >
        <div
          x-bind="control"
          class="w-24px h-24px rounded-0.275rem border-solid border-2 border-blue text-white data-[hover]:bg-gray data-[focus]:(outline-2 outline-solid outline-blue outline-offset-2) data-[disabled]:(bg-black border-black) data-[invalid]:border-red data-[state=indeterminate]:(bg-white border-yellow text-yellow) data-[state=checked]:(bg-blue border-blue)"
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
