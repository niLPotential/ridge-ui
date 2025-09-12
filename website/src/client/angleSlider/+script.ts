import Alpine from "alpinejs";
import { AngleSlider } from "@ridge-ui/angle-slider";

Alpine.data("angleSlider", (userProps: any) => new AngleSlider(userProps));
