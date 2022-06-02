import { Component } from "@angular/core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

/**
 * The app's main search bar.
 */
@Component({
    selector: "app-banner-searchbar",
    templateUrl: "./banner-searchbar.component.html",
    styleUrls: ["./banner-searchbar.component.scss"],
})
export class BannerSearchbarComponent {
    public faMagnifyingGlass = faMagnifyingGlass;
}
