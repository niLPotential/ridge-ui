/**
 * Implements a basic Zag state machine constructor for Alpine.js.
 * Direct use is not intended. Use `@ridge-ui/*` components instead.
 *
 * @example
 * ```ts
 * import * as component from "@zag-js/component";
 * import { AlpineMachine } from "@ridge-ui/lib";
 *
 * export class Component extends AlpineMachine<component.Schema> {...}
 * ```
 *
 * @module
 */

export { mergeProps } from "@zag-js/core";
export { AlpineMachine } from "./machine.ts";
