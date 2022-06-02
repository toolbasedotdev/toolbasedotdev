import { Component, HostBinding } from "@angular/core";

/**
 * A simple horizontal rule for a drop-down menu.
 */
@Component({
    selector: "app-nav-menu-separator",
    templateUrl: "./nav-menu-separator.component.html",
    styleUrls: ["./nav-menu-separator.component.scss"],
})
export class NavMenuSeparatorComponent {
    /**
     * ARIA role.
     */
    @HostBinding("attr.role")
    public role = "separator";
}
