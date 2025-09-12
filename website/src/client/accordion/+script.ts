import Alpine from "alpinejs";
import { Accordion } from "@ridge-ui/accordion";

Alpine.data("accordion", (userProps: any) => new Accordion(userProps));
