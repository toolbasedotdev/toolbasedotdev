import { Component, OnInit } from "@angular/core";
import { AccountService } from "./services/account/account.service";
import { GithubService } from "./services/github/github.service";

/**
 * The app's main component.
 */
@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
    public title = "ClientApp";
    public debug = "";

    /**
     * Constructs the AppComponent.
     */
    constructor(
        private account: AccountService,
        private github: GithubService
    ) {}

    /**
     * On init, syncs the local user and Github API access details.
     */
    public async ngOnInit(): Promise<void> {
        await this.account.syncLocalUser();
        if (this.account.isSignedIn()) {
            await this.github.syncAccessToken();

            this.debug = JSON.stringify(
                await this.github.getUserRepoNames(this.account.getOwnName()),
                null,
                4
            );
        }
    }
}
