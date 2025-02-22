/**
 * Represents a folder in the file structure, which can contain both files and nested folders.
 */
import { fileCard } from "./fileCard";

export class fileFolder {
    folderName: string;
    contents: (fileCard | fileFolder)[];

    /**
     * Creates a new file folder instance.
     * @param {string} folderName - The name of the folder.
     * @param {(fileCard | fileFolder)[]} contents - The initial list of files and/or folders contained in the folder.
     */
    constructor(folderName: string, contents: (fileCard | fileFolder)[]) {
        this.folderName = folderName;
        this.contents = contents;
    }
}
