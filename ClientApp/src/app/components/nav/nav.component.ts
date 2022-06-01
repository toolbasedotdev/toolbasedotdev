import { Component, ElementRef, ViewChild } from "@angular/core";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { AccountService } from "src/app/services/account.service";
import { GithubService } from "src/app/services/github.service";
import { NavMenuComponent } from "../nav-menu/nav-menu.component";

@Component({
    selector: "app-nav",
    templateUrl: "./nav.component.html",
    styleUrls: ["./nav.component.scss"],
})
export class NavComponent {
    faGithub = faGithub;
    constructor(public account: AccountService, public github: GithubService) {}

    @ViewChild("accountMenu")
    public accountMenu!: NavMenuComponent;

    @ViewChild("accountMenuButton")
    public accountMenuButton: ElementRef | undefined;

    signInGithub(): void {
        this.account.signIn();
    }

    showAccountMenu(): void {
        const centerUnder = this?.accountMenuButton?.nativeElement;
        if (centerUnder) this.accountMenu.show(centerUnder);
    }
}
