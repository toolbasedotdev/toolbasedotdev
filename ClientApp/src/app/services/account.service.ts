import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { take } from "rxjs/operators";
import { UserDetails } from "../models/user-details";

/**
 * Used for actions related to the local user's account.
 */
@Injectable({
    providedIn: "root",
})
export class AccountService {
    /**
     * Constructs the AccountService.
     */
    public constructor(private http: HttpClient) {}

    public localUser: UserDetails = { notFound: true };

    /**
     * Fetches and stores local user details.
     */
    public async syncLocalUser(): Promise<void> {
        this.localUser = await this.http
            .get<UserDetails>("/api/account/whoami")
            .toPromise();
    }

    /**
     * Signs in the local user using Github OAuth.
     */
    public signIn(): void {
        location.href = "api/github/signin";
    }

    /**
     * Signs out the local user.
     */
    public signOut(): void {
        this.http
            .get("/api/account/signout")
            .pipe(take(1))
            .subscribe(() => (location.href = ""));
    }

    /**
     * Returns if the user is signed in or not.
     */
    public isSignedIn(): boolean {
        return !this.localUser.notFound;
    }

    /**
     * Returns the local user's username.
     */
    public getOwnName(): string {
        if (!this.localUser.name) throw "Not logged in";
        return this.localUser.name;
    }
}
