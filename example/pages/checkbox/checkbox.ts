import Alpine from "alpinejs";
import { Checkbox } from "../../../src/index.ts";

// @ts-ignore: Alpine
globalThis.Alpine = Alpine;

Alpine.data("checkbox", (userProps: any) => new Checkbox(userProps));

Alpine.start();
