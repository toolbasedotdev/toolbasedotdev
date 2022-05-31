import { Component, OnInit } from "@angular/core";
import { AccountService } from "./services/account.service";
import { GithubService } from "./services/github.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
    title = "ClientApp";
    debug = "";

    constructor(
        private account: AccountService,
        private github: GithubService
    ) {}

    async ngOnInit(): Promise<void> {
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
