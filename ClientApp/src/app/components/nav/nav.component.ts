import {
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
} from "@angular/core";
import { NavigationEnd, Router, RouterEvent } from "@angular/router";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import { AccountService } from "src/app/services/account.service";
import { GithubService } from "src/app/services/github.service";
import { NavMenuComponent } from "../nav-menu/nav-menu.component";

@Component({
    selector: "app-nav",
    templateUrl: "./nav.component.html",
    styleUrls: ["./nav.component.scss"],
})
export class NavComponent implements OnInit, OnDestroy {
    faGithub = faGithub;
    constructor(
        private router: Router,
        public account: AccountService,
        public github: GithubService
    ) {}

    private _routeUrlSub: Subscription | null = null;

    @ViewChild("accountMenu")
    public accountMenu!: NavMenuComponent;

    @ViewChild("accountMenuButton")
    public accountMenuButton: ElementRef | undefined;

    public url = "/";

    ngOnInit(): void {
        this._routeUrlSub = this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe(
                (event) => {
                    this.url = (event as NavigationEnd).urlAfterRedirects;
                },
                (err) => {
                    throw err;
                }
            );
    }

    ngOnDestroy(): void {
        if (this._routeUrlSub) this._routeUrlSub.unsubscribe();
    }

    signInGithub(): void {
        this.account.signIn();
    }

    showAccountMenu(): void {
        const centerUnder = this?.accountMenuButton?.nativeElement;
        if (centerUnder) this.accountMenu.show(centerUnder);
    }
}
