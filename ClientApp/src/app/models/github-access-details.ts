/**
 * Details required to authenticate with Github's API.
 */
export interface GithubAccessDetails {
    /**
     * The Github OAuth app's client ID.
     */
    clientId: string;

    /**
     * The local user's access token.
     */
    accessToken: string;
}
