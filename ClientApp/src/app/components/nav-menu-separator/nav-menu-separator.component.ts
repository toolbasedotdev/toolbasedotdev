import { Component, HostBinding } from "@angular/core";

@Component({
    selector: "app-nav-menu-separator",
    templateUrl: "./nav-menu-separator.component.html",
    styleUrls: ["./nav-menu-separator.component.scss"],
})
export class NavMenuSeparatorComponent {
    @HostBinding("attr.role")
    public role = "separator";
}
