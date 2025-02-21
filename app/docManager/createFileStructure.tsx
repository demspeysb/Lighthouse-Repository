import { fileCard } from "./fileCard";
import { fileFolder } from "./fileFolder";

export function buildFileStructure(bucketArray: string[]): fileFolder {
    const root = new fileFolder("root", []);
    const folderMap = new Map<string, fileFolder>(); // Track folders

    folderMap.set("", root); // Root folder as the base case

    for (const path of bucketArray) {
        const parts = path.split("/");
        let currentFolder = root;
        let currentPath = "";

        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            currentPath = currentPath ? `${currentPath}/${part}` : part;

            const isLast = i === parts.length - 1;
            const isFile = !path.endsWith("/");

            if (isFile && isLast) {
                // If it's the last part and is a file, add a fileCard
                currentFolder.contents.push(new fileCard(part));
            } else {
                // If it's a folder, check if it already exists
                if (!folderMap.has(currentPath)) {
                    if (part.trim() === "") continue; // Avoid empty folder names
                    const newFolder = new fileFolder(part, []);
                    currentFolder.contents.push(newFolder);
                    folderMap.set(currentPath, newFolder);
                }
                currentFolder = folderMap.get(currentPath)!;
            }
        }
    }

    return root;
}


// Example usage
/*let bucketArray: string[] = [
    '1955-2023_hail.csv', 
    'MO_Long_Term_Care_Facilities.geojson', 
    'MO_Primary_Care_Providers.csv', 
    'MO_Public_Drinking_Water_Districts.geojson',
    'MO_Rural_Health_Clinics.csv', 
    'MO_Townships_Boundaries.geojson', 
    'fire_data/_variable_descriptions.csv', 
    'fire_data/data.csv', 
    'testfolder/', 
    'testfolder/testNestedFolder/', 
    'testfolder/testNestedFolder/Example.txt', 
    'testfolder/testdocviewer.docx', 
    'tornado/', 
    'tornado/1950-2023_actual_tornadoes.csv', 
    'tornado/tornadoCsvInJson.txt'
];

const fileStructure = buildFileStructure(bucketArray);
console.log(JSON.stringify(fileStructure, null, 2));*/