import { Repository } from "./repository";

/**
 * GraphQL response format used in {@link GithubService.getUserRepoNames}
 */
export interface UserReposResponse {
    /**
     * User node.
     */
    user: {
        /**
         * Repository query.
         */
        repositories: {
            /**
             * Repository nodes.
             */
            nodes: Repository[];
        };
    };
}
