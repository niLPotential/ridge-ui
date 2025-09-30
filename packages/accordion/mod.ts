/**
 * Alpine.js accordion plugin powered by Zag
 *
 * @example
 * ```html
 *  <div x-accordion="props" x-accordion:root>
 *    <div x-accordion:item="{value}">
 *      <h3>
 *        <button x-accordion:item-trigger="{value}"></button>
 *      </h3>
 *      <div x-accordion:item-content></div>
 *    </div>
 *  </div>
 * ```
 *
 * @module
 */

import Accordion from "./plugin.ts";

/**
 * Alpine.js accordion plugin powered by Zag
 *
 * ```ts
 *  import Alpine from "alpinejs"
 *  import Accordion from "@ridge-ui/accordion"
 *
 *  Alpine.plugin(Accordion)
 * ```
 */
export default Accordion;
