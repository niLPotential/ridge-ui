/**
 * Alpine.js angle slider plugin powered by Zag
 *
 * @example
 * ```html
 *  <div x-angle-slider="props" x-angle-slider:root>
 *    <label x-angle-slider:label></label>
 *    <div x-angle-slider:control>
 *      <div x-angle-slider:thumb></div>
 *      <div x-angle-slider:marker-group>
 *        <div x-angle-slider:marker="{value}"></div>
 *      </div>
 *    </div>
 *    <div x-angle-slider:value-text></div>
 *    <input x-angle-slider:hidden-input />
 *  </div>
 *
 * @module
 */
import AngleSlider from "./plugin.ts";

/**
 * Alpine.js angle slider plugin powered by Zag
 * 
 * ```ts
 *  import Alpine from "alpinejs";
 *  import AngleSlider from "@ridge-ui/angle-slider";
 * 
 *  Alpine.plugin(AngleSlider);
 */
export default AngleSlider;
