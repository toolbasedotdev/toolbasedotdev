import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivationStart, Data, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AccountService } from "./services/account/account.service";
import { GithubService } from "./services/github/github.service";
import { ReadyService } from "./services/ready/ready.service";

/**
 * The app's main component.
 */
@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {
    /**
     * App title.
     */
    public title = "ClientApp";

    /**
     * Constructs the AppComponent.
     */
    constructor(
        private _router: Router,
        private _ready: ReadyService,
        private _account: AccountService,
        private _github: GithubService
    ) {}

    /**
     * Subscription: Router events.
     */
    private _routerSub: Subscription | null = null;

    /**
     * On init: syncs the local user and Github API access details.
     */
    public ngOnInit(): void {
        this._routerSub = this._router.events.subscribe((event) => {
            if (event instanceof ActivationStart) {
                this.onRouterData(event.snapshot.data);
            }
        });

        this._ready.await(async () => {
            await this._account.syncLocalUser();

            if (this._account.isSignedIn()) {
                await this._github.syncAccessToken();
            }
        });
    }

    /**
     * On destroy: Unsubscribes from router events.
     */
    public ngOnDestroy(): void {
        if (this._routerSub) {
            this._routerSub.unsubscribe();
        }
    }

    /**
     * Fires when router data changes.
     */
    public async onRouterData(data: Data): Promise<void> {
        await this._ready.toPromise();

        if (data.auth && !this._account.isSignedIn()) {
            this._router.navigate(["/"]);
        }
    }
}
