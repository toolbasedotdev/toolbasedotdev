/**
 * Represents a Git tree entry. A file or directory in a Git repository.
 */
export interface TreeEntry {
    /**
     * Name of the file or directory.
     */
    name: string;

    /**
     * `blob` = file, `tree` = directory.
     */
    type: "blob" | "tree";

    /**
     * The actual data of the object. Trees will have an empty \{ \} for their
     * `object` field.
     */
    object: {
        /**
         * UTF8 text data, or null if the Blob is binary.
         */
        text?: string;

        /**
         * Indicates whether the Blob is binary or text. Returns null if
         * unable to determine the encoding.
         */
        isBinary?: boolean;

        /**
         * Indicates whether the content is truncated.
         */
        isTruncated?: boolean;
    };
}
