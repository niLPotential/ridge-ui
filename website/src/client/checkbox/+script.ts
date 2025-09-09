import Alpine from "alpinejs";
import { Checkbox } from "@ridge-ui/checkbox";

Alpine.data("checkbox", (userProps: any) => new Checkbox(userProps));
