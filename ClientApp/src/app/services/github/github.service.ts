import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { graphql } from "@octokit/graphql/dist-types/types";
import { GraphqlResponseError } from "@octokit/graphql";
import { Octokit } from "octokit";
import { TreeEntriesResponse } from "./models/tree-entries-response";
import { TreeEntry } from "./models/tree-entry";
import { GithubAccessDetails } from "./models/github-access-details";
import { UserReposResponse } from "./models/user-repos-response";
import { Repository } from "./models/repository";

// * Use Github's GraphQL Explorer to build queries:
// * https://docs.github.com/en/graphql/overview/explorer

/**
 * Default message for authentication errors.
 */
const ERR_NO_AUTH = "No Github authentication";

/**
 * Default message for GraphQL errors.
 */
const ERR_GRAPHQL = "Github GraphQL API error";

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
    private _access: GithubAccessDetails | null = null;

    /**
     * Octokit instance used for REST API. addAuthHeader must be used to add the
     * authorization header.
     */
    private _octokit = new Octokit();

    /**
     * Octokit GraphQL instance used for GraphQL API. Automatically includes
     * authorization header.
     */
    private _graphql: graphql | null = null;

    /**
     * Adds default headers to a Github API request.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private _addAuthHeader(request: any): any {
        if (this?._access?.accessToken) {
            return {
                ...request,
                headers: {
                    ...request.headers,
                    authorization: `token ${this._access.accessToken}`,
                },
            };
        }

        return request;
    }

    /**
     * Handles an error response from Github's GraphQL API.
     */
    private _handleGraphqlError(e: unknown): void {
        let log = "[Github] GraphQL response error!";

        if (e instanceof GraphqlResponseError) {
            log += "\n" + JSON.stringify(e, null, 2);
        }

        console.error(log);

        throw e;
    }

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
    public async getUserRepoNames(owner: string) {
        if (!this._graphql) throw Error(ERR_NO_AUTH);

        let result: Repository[] | null = null;

        try {
            const res: UserReposResponse = await this._graphql(
                `query($login: String!) {
                    user(login: $login) {
                        repositories(first: 100, privacy: PUBLIC) {
                            nodes {
                                id
                                name
                            }
                        }
                    }
                }`,
                { login: owner }
            );

            if (res?.user?.repositories?.nodes) {
                result = res.user.repositories.nodes;
            }
        } catch (e) {
            this._handleGraphqlError(e);
        }

        if (!result) throw Error(ERR_GRAPHQL);

        return result;
    }

    /**
     * Queries Github's GraphQL API for all the files and directories in a repo.
     * Top level only. Recursive requests are not supported by this method.
     *
     * @param repoId - Repository ID
     * @param fetchObjects - Indicates if file data should be included
     */
    public async getTreeEntries(
        repoId: string,
        fetchObjects: boolean
    ): Promise<TreeEntry[]> {
        if (!this._graphql) throw Error(ERR_NO_AUTH);

        let result: TreeEntry[] | null = null;

        const objectsQuery = `
            object {
                ... on Blob {
                    text
                    isBinary
                }
            }`;

        try {
            const res: TreeEntriesResponse = await this._graphql(
                `query($id: ID!) {
                    node(id: $id) {
                        ... on Repository {
                            object(expression: "HEAD:") {
                                ... on Tree {
                                    entries {
                                        name
                                        type
                                        ${fetchObjects ? objectsQuery : ""}
                                    }
                                }
                            }
                        }
                    }
                }`,
                { id: repoId }
            );

            if (res?.node?.object?.entries) {
                result = res.node.object.entries;
            }
        } catch (e) {
            this._handleGraphqlError(e);
        }

        if (!result) throw Error(ERR_GRAPHQL);

        return result;
    }
}
