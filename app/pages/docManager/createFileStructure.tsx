import { fileCard } from "./fileCard";
import { fileFolder } from "./fileFolder";

/**
 * Constructs a hierarchical file and folder structure from a list of file paths.
 *
 * @param {string[]} bucketArray - An array of file paths representing files and folders.
 * @returns {fileFolder} - The root folder containing the constructed file structure.
 */
export function buildFileStructure(bucketArray: string[]): fileFolder {
    const root = new fileFolder("root", []); // Root directory
    const folderMap = new Map<string, fileFolder>(); // Maps folder paths to their corresponding objects

    folderMap.set("", root); // Initialize root folder in the map

    for (const path of bucketArray) {
        const parts = path.split("/"); // Split the path into components
        let currentFolder = root;
        let currentPath = "";

        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            currentPath = currentPath ? `${currentPath}/${part}` : part;

            const isLast = i === parts.length - 1;
            const isFile = !path.endsWith("/"); // Determines if the path represents a file

            if (isFile && isLast) {
                // If the last part is a file, add it to the current folder with full path
                currentFolder.contents.push(new fileCard(part, currentPath));
            } else {
                // If it's a folder, ensure it exists in the structure
                if (!folderMap.has(currentPath)) {
                    if (part.trim() === "") continue; // Skip empty folder names
                    const newFolder = new fileFolder(part, []);
                    currentFolder.contents.push(newFolder);
                    folderMap.set(currentPath, newFolder);
                }
                currentFolder = folderMap.get(currentPath)!; // Move into the folder
            }
        }
    }

    return root;
}
