import { Component, OnInit } from "@angular/core";
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
export class AppComponent implements OnInit {
    /**
     * App title.
     */
    public title = "ClientApp";

    /**
     * Constructs the AppComponent.
     */
    constructor(
        private _ready: ReadyService,
        private _account: AccountService,
        private _github: GithubService
    ) {}

    /**
     * On init, syncs the local user and Github API access details.
     */
    public ngOnInit(): void {
        this._ready.await(async () => {
            await this._account.syncLocalUser();

            if (this._account.isSignedIn()) {
                await this._github.syncAccessToken();
            }
        });
    }
}
