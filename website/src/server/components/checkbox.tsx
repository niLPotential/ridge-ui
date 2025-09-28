export default function CheckboxDemo() {
  return (
    <div x-data="{disabled: true, invalid: false}">
      <div>
        <input type="checkbox" id="disabled" x-model="disabled" />
        <label for="disabled">disabled</label>
      </div>
      <div>
        <input type="checkbox" id="invalid" x-model="invalid" />
        <label for="invalid">invalid</label>
      </div>
      <label
        x-checkbox="{disabled, invalid, id: 37}"
        x-checkbox:root
        class="flex flex-row select-none gap-2 text-lg data-[disabled]:(cursor-not-allowed opacity-40)"
      >
        <p x-text="props.disabled"></p>
        <p x-text="$checkbox.disabled"></p>
        <div
          x-checkbox:control
          class="h-24px w-24px border-2 border-blue rounded-0.275rem border-solid text-white data-[disabled]:(border-black bg-black) data-[invalid]:border-red data-[state=checked]:(border-blue bg-blue) data-[state=indeterminate]:(border-yellow bg-white text-yellow) data-[hover]:bg-gray data-[focus]:(outline-2 outline-blue outline-offset-2 outline-solid)"
        >
        </div>
        <span x-checkbox:label>
          Input is
          <span x-text="$checkbox.checked ? ' checked' : ' unchecked'"></span>
        </span>
        <input x-checkbox:hidden-input />
      </label>
    </div>
  );
}
