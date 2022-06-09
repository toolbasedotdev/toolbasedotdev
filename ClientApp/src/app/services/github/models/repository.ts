import { TreeEntry } from "./tree-entry";

/**
 * Represents a Git repository.
 */
export interface Repository {
    /**
     * Repository ID.
     */
    id: string;

    /**
     * Repository name.
     */
    name: string;

    /**
     * Repository owner's username.
     */
    owner: string;

    /**
     * Files and directories in the repository.
     */
    entries: TreeEntry[];
}
