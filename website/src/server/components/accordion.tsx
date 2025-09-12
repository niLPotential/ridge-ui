export default function AccordionDemo() {
  return (
    <div x-data="accordion({id: 1})" x-bind="root">
      <template
        x-for="value in ['First', 'Second', 'Third']"
        x-bind:key="value"
      >
        <div x-bind="item({value})">
          <h3>
            <button
              type="button"
              x-bind="itemTrigger({value})"
              x-text="value + ' Item'"
            >
            </button>
          </h3>
          <div x-bind="itemContent({value})" x-text="value + ' content'">
          </div>
        </div>
      </template>
    </div>
  );
}
