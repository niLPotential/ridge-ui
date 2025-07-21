import Alpine from "alpinejs";
import { AngleSlider } from "../../../src/index.ts";

// @ts-ignore: Alpine
globalThis.Alpine = Alpine;

Alpine.data("angleSlider", (userProps: any) => new AngleSlider(userProps));

Alpine.start();
