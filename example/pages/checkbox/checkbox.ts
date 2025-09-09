import "virtual:uno.css";
import Alpine from "alpinejs";
import { Checkbox } from "@ridge-ui/checkbox";

Alpine.data("checkbox", (userProps: any) => new Checkbox(userProps));
// @ts-ignore: Alpine
globalThis.Alpine = Alpine;
Alpine.start();
