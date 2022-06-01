import { Component, HostBinding, Input } from "@angular/core";

@Component({
    selector: "app-nav-menu-item",
    templateUrl: "./nav-menu-item.component.html",
    styleUrls: ["./nav-menu-item.component.scss"],
})
export class NavMenuItemComponent {
    @HostBinding("attr.role")
    public role = "listitem";

    @Input("wip")
    @HostBinding("class.WIP")
    public wip = false;
}
