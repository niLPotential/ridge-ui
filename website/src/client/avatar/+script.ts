import Alpine from "alpinejs";
import { Avatar } from "@ridge-ui/avatar";

Alpine.data("avatar", (userProps: any) => new Avatar(userProps));
