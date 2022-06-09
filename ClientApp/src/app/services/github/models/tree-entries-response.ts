import { TreeEntry } from "./tree-entry";

/**
 * GraphQL response format used in {@link GithubService.getRepoEntries}
 */
export interface TreeEntriesResponse {
    /**
     * Git repository node.
     */
    node?: {
        /**
         * `HEAD:` object.
         */
        object?: {
            /**
             * Tree entries.
             */
            entries?: TreeEntry[];
        };
    };
}
