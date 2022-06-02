import { Component, HostBinding, HostListener, Input } from "@angular/core";
import { Router } from "@angular/router";

/**
 * The app's text-based logo.
 */
@Component({
    selector: "app-logo",
    templateUrl: "./logo.component.html",
    styleUrls: ["./logo.component.scss"],
})
export class LogoComponent {
    /**
     * Constructs the LogoComponent.
     */
    constructor(private router: Router) {}

    /**
     * Default height for the logo. Used as font-size.
     */
    @Input()
    public height = 68;

    /**
     * Determines if the logo can be clicked to redirect to the homepage.
     */
    @Input()
    @HostBinding("class.clickable")
    public clickable = false;

    /**
     * On click, redirects to the homepage.
     */
    @HostListener("click")
    public onClick(): void {
        this.router.navigate(["/"]);
    }

    /**
     * Used in template to determine text-shadow vertical offset.
     */
    public ceil(val: number): number {
        return Math.ceil(val);
    }
}
