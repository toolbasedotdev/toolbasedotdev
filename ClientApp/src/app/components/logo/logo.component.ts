import { Component, Input } from "@angular/core";

@Component({
    selector: "app-logo",
    templateUrl: "./logo.component.html",
    styleUrls: ["./logo.component.scss"],
})
export class LogoComponent {
    @Input()
    public height = 68;

    public ceil(val: number): number {
        return Math.ceil(val);
    }
}
