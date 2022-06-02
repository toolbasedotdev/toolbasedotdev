import {
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
} from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import { AccountService } from "src/app/services/account.service";
import { GithubService } from "src/app/services/github.service";
import { NavMenuComponent } from "../nav-menu/nav-menu.component";

/**
 * The app's global navigation bar.
 */
@Component({
    selector: "app-nav",
    templateUrl: "./nav.component.html",
    styleUrls: ["./nav.component.scss"],
})
export class NavComponent implements OnInit, OnDestroy {
    /**
     * Github logo icon.
     */
    public faGithub = faGithub;

    /**
     * Contructs the NavComponent.
     */
    constructor(
        private router: Router,
        public account: AccountService,
        public github: GithubService
    ) {}

    /**
     * Subscription: Router events.
     */
    public _routeUrlSub: Subscription | null = null;

    /**
     * Shows the local user's name, and displays a drop-down menu when clicked.
     */
    @ViewChild("accountMenuButton")
    public accountMenuButton: ElementRef | undefined;

    /**
     * Drop down menu for account-related actions.
     */
    @ViewChild("accountMenu")
    public accountMenu!: NavMenuComponent;

    /**
     * The app's current URL.
     */
    public url = "/";

    /**
     * On init, subscribe to router events.
     */
    public ngOnInit(): void {
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

    /**
     * On destroy, unsubscribe from router events.
     */
    public ngOnDestroy(): void {
        if (this._routeUrlSub) this._routeUrlSub.unsubscribe();
    }

    /**
     * Signs the local user using Github OAuth.
     */
    public signInGithub(): void {
        this.account.signIn();
    }

    /**
     * Opens the account actions drop-down menu underneath the account button.
     */
    public showAccountMenu(): void {
        const centerUnder = this?.accountMenuButton?.nativeElement;
        if (centerUnder) this.accountMenu.show(centerUnder);
    }
}
