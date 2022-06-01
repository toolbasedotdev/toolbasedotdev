import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { take } from "rxjs/operators";
// import { toPromise } "rxjs";
import { UserDetails } from "../models/user-details";

@Injectable({
    providedIn: "root",
})
export class AccountService {
    constructor(private http: HttpClient) {}

    localUser: UserDetails = { notFound: true };

    async syncLocalUser(): Promise<void> {
        this.localUser = await this.http
            .get<UserDetails>("/api/account/whoami")
            .toPromise();
    }

    signIn(): void {
        location.href = "api/github/signin";
    }

    signOut(): void {
        this.http
            .get("/api/account/signout")
            .pipe(take(1))
            .subscribe(() => (location.href = ""));
    }

    isSignedIn(): boolean {
        return !this.localUser.notFound;
    }

    getOwnName(): string {
        if (!this.localUser.name) throw "Not logged in";
        return this.localUser.name;
    }
}
