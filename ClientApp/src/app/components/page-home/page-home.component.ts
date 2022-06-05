import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { AccountService } from "src/app/services/account.service";

/**
 * The app's homepage.
 */
@Component({
    selector: "app-home",
    templateUrl: "./page-home.component.html",
    styleUrls: ["./page-home.component.scss"],
})
export class PageHomeComponent implements OnInit, OnDestroy {
    /**
     * Constructs the PageHomeComponent.
     */
    constructor(
        private route: ActivatedRoute,
        private account: AccountService
    ) {}

    /**
     * Subscription: Route data changes
     */
    private _routeDataSub: Subscription | null = null;

    /**
     * On init, subscribe to route data changes.
     */
    public ngOnInit(): void {
        this._routeDataSub = this.route.data.subscribe(
            (data) => {
                if (data?.command) {
                    switch (data.command) {
                        case "signout":
                            this.account.signOut();
                            break;
                    }
                }
            },
            (err) => {
                throw err;
            }
        );
    }

    /**
     * On destroy, unsubscribe from route data changes.
     */
    public ngOnDestroy(): void {
        if (this._routeDataSub) this._routeDataSub.unsubscribe();
    }
}
