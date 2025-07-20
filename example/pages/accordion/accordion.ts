import Alpine from "alpinejs";
import { Accordion } from "../../../src/index.ts";

// @ts-ignore: Alpine
globalThis.Alpine = Alpine;

Alpine.data("accordion", (userProps: any) => new Accordion(userProps));

Alpine.start();
