import Alpine from "alpinejs";
import { AngleSlider } from "@ridge-ui/angle-slider";

// @ts-ignore: Alpine
globalThis.Alpine = Alpine;

Alpine.data("angleSlider", (userProps: any) => new AngleSlider(userProps));

Alpine.start();
