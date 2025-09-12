export default function AccordionDemo() {
  return (
    <div x-data="accordion({id: 1})" x-bind="root">
      <template
        x-for="value in ['First', 'Second', 'Third']"
        x-bind:key="value"
        class="w-md"
      >
        <div x-bind="item({value})" class="border-1 bg-truegray text-sm">
          <h3>
            <button
              type="button"
              x-bind="itemTrigger({value})"
              x-text="value + ' Item'"
              class="w-full cursor-pointer bg-blueGray px-3 py-2 text-align-start focus-visible:(outline-2px outline-blue outline-solid)"
            >
            </button>
          </h3>
          <div
            x-bind="itemContent({value})"
            x-text="value + ' content'"
            class="w-full px-3 py-2"
          >
          </div>
        </div>
      </template>
    </div>
  );
}
