import Alpine from "alpinejs";
import { AngleSlider } from "@ridge-ui/angle-slider";

Alpine.data("angle-slider", (userProps: any) => new AngleSlider(userProps));
