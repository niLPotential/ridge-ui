export default function AccordionDemo() {
  return (
    <div x-data="{collapsible: true, multiple: false}">
      <div>
        <input type="checkbox" id="collapsible" x-model="collapsible" />
        <label for="collapsible">collapsible</label>
      </div>
      <div>
        <input type="checkbox" id="multiple" x-model="multiple" />
        <label for="multiple">multiple</label>
      </div>
      <div
        x-accordion="{collapsible, multiple, id: 37}"
        x-accordion:root
        class="w-md"
      >
        <template
          x-for="value in ['First', 'Second', 'Third']"
          x-bind:key="value"
        >
          <div x-accordion:item="{value}" class="border-1 bg-truegray text-sm">
            <h3>
              <button
                type="button"
                x-accordion:item-trigger="{value}"
                x-text="value + ' Item'"
                class="w-full cursor-pointer bg-blueGray px-3 py-2 text-align-start focus-visible:(outline-2px outline-blue outline-solid)"
              >
              </button>
            </h3>
            <div
              x-accordion:item-content="{value}"
              x-text="value + ' content'"
              class="w-full px-3 py-2"
            >
            </div>
          </div>
        </template>
      </div>
    </div>
  );
}
