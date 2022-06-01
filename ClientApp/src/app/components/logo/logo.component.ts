import { Component, HostBinding, HostListener, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-logo",
    templateUrl: "./logo.component.html",
    styleUrls: ["./logo.component.scss"],
})
export class LogoComponent {
    @Input()
    public height = 68;

    @Input()
    @HostBinding("class.clickable")
    public clickable = false;

    constructor(private router: Router) {}

    @HostListener("click")
    public onClick(): void {
        this.router.navigate(["/"]);
    }

    public ceil(val: number): number {
        return Math.ceil(val);
    }
}
