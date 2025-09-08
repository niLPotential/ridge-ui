import "virtual:uno.css";
import Alpine from "alpinejs";
import { Checkbox } from "@ridge-ui/checkbox";

// @ts-ignore: Alpine
globalThis.Alpine = Alpine;

Alpine.data("checkbox", (userProps: any) => new Checkbox(userProps));

Alpine.start();
