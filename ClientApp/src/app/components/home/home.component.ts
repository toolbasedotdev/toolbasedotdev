import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { AccountService } from "src/app/services/account.service";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit, OnDestroy {
    constructor(
        private route: ActivatedRoute,
        private account: AccountService
    ) {}

    private _routeDataSub: Subscription | null = null;

    ngOnInit(): void {
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

    ngOnDestroy(): void {
        if (this._routeDataSub) this._routeDataSub.unsubscribe();
    }
}
