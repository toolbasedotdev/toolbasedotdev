import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { graphql } from "@octokit/graphql/dist-types/types";
import { Octokit } from "octokit";
import { GithubAccessDetails } from "./models/github-access-details";

const noAuthMsg = "No Github authentication";

/**
 * Used for actions related to Github OAuth, and the Github GraphQL API.
 */
@Injectable({
    providedIn: "root",
})
export class GithubService implements OnInit {
    /**
     * Constructs the GithubService.
     */
    constructor(private http: HttpClient) {}

    /**
     *
     */
    private _octokit = new Octokit();

    /**
     *
     */
    private _access: GithubAccessDetails | null = null;

    /**
     *
     */
    private _graphql: graphql | null = null;

    /**
     * On init, configures Octokit hooks.
     */
    public ngOnInit(): void {
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

    /**
     * Fetches details required to authenticate with Github's GraphQL API.
     */
    public async syncAccessToken(): Promise<void> {
        this._access = await this.http
            .get<GithubAccessDetails>("/api/github/access")
            .toPromise();

        this._graphql = this._octokit.graphql.defaults({
            headers: {
                authorization: `token ${this._access.accessToken}`,
            },
        });
    }

    /**
     * Gets a user's Github avatar.
     *
     * @param username - Github username
     * @returns Avatar URL
     */
    public getAvatarUrl(username: string): string {
        return `https://github.com/${username}.png`;
    }

    /**
     * Queries Github's REST API for a user object
     *
     * @param username - Github username
     */
    public getUser(username: string) {
        return this._octokit.rest.users.getByUsername({ username });
    }

    /**
     * Queries Github's GraphQL API for a list of a user's repos.
     *
     * @param owner - Github username
     */
    public getUserRepoNames(owner: string) {
        if (!this._graphql) throw Error(noAuthMsg);

        return this._graphql(
            `query($login: String!) {
                user(login: $login) {
                  repositories(first: 10, privacy: PUBLIC) {
                    nodes {
                      id,
                      name,
                      default_branch
                    }
                  }
                }
              }`,
            { login: owner }
        );
    }
}
