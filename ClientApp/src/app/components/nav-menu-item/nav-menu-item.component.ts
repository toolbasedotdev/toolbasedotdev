import { Component, HostBinding, Input } from "@angular/core";

/**
 * An item in a drop-down menu.
 */
@Component({
    selector: "app-nav-menu-item",
    templateUrl: "./nav-menu-item.component.html",
    styleUrls: ["./nav-menu-item.component.scss"],
})
export class NavMenuItemComponent {
    /**
     * Used to set ARIA role.
     */
    @HostBinding("attr.role")
    public role = "listitem";

    /**
     * Strikes unimplemented actions
     * TODO: Remove this
     */
    @Input("wip")
    @HostBinding("class.WIP")
    public wip = false;
}
