import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { take } from "rxjs/operators";
import { AccountService } from "src/app/services/account/account.service";
import { GithubService } from "src/app/services/github/github.service";
import { Repository } from "src/app/services/github/models/repository";
import { ReadyService } from "src/app/services/ready/ready.service";

/**
 * Page used to link the local user's tool repositories. Contains a browser
 * to view all of the user's repositories. Allows the user to register a tool
 * project and make it useable on the platform.
 */
@Component({
    selector: "app-page-link-tool",
    templateUrl: "./page-link-tool.component.html",
    styleUrls: ["./page-link-tool.component.scss"],
})
export class PageLinkToolComponent implements OnInit {
    /**
     * Constructs the PageLinkToolComponent.
     */
    constructor(
        private _ready: ReadyService,
        private _account: AccountService,
        private _github: GithubService,
        private _router: Router
    ) {}

    /**
     * Subscription to account sync event.
     */
    private _onSyncedSub: Subscription | null = null;

    /**
     * List of repositories owned by the local user.
     */
    public repos: Repository[] = [];

    /**
     * On init: Wait for ready, then get the local user's repo list. If the user
     * is not signed in, redirects to homepage.
     */
    public async ngOnInit(): Promise<void> {
        await this._ready.toPromise();

        if (!this._account.isSignedIn()) {
            this._router.navigate(["/"]);
            return;
        }

        this.repos = await this._github.getUserRepoNames(
            this._account.getOwnName()
        );
    }
}
