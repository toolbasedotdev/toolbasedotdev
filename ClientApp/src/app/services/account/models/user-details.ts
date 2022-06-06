/**
 * Details relevant to displaying a user. Does not include user data.
 */
export interface UserDetails {
    /**
     * Specifies that the user was not found.
     */
    notFound: boolean;

    /**
     * The username, which is also used as the display name.
     */
    name?: string;
}
