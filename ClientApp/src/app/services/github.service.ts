import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { graphql } from "@octokit/graphql/dist-types/types";
import { Octokit } from "octokit";
import { take } from "rxjs/operators";
import { GithubAccessDetails } from "../models/github-access-details";

const noAuthMsg = "No Github authentication";

@Injectable({
    providedIn: "root",
})
export class GithubService implements OnInit {
    constructor(private http: HttpClient) {}

    private _octokit = new Octokit();
    private _access: GithubAccessDetails | null = null;
    private _graphql: graphql | null = null;

    ngOnInit(): void {
        this._octokit.hook.after("request", async (response, options) => {
            console.log(
                `[Github API] ${options.method} ${options.url}: ${response.status}`
            );
        });

        this._octokit.hook.error("request", async (error) => {
            console.error("[Github API] Error!");
            throw error;
        });
    }

    async syncAccessToken(): Promise<void> {
        this._access = await this.http
            .get<GithubAccessDetails>("/github/access")
            .toPromise();

        this._graphql = this._octokit.graphql.defaults({
            headers: {
                authorization: `token ${this._access.accessToken}`,
            },
        });
    }

    getAvatarUrl(name: string): string {
        return `https://github.com/${name}.png`;
    }

    getUser(username: string) {
        return this._octokit.rest.users.getByUsername({ username });
    }

    getUserRepoNames(username: string) {
        if (!this._graphql) throw Error(noAuthMsg);

        return this._graphql(
            `query($login:String!) {
                user(login:$login) {
                  repositories(first:10, privacy: PUBLIC) {
                    nodes {
                      id,
                      name
                    }
                  }
                }
              }`,
            { login: username }
        );
    }
}
