import Alpine from "alpinejs";
import { Accordion } from "@ridge-ui/accordion";

Alpine.data("accordion", (userProps: any) => new Accordion(userProps));
// @ts-ignore: Alpine
globalThis.Alpine = Alpine;
Alpine.start();
