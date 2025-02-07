import { fileCard } from "./fileCard"

export class fileFolder {
    folderName: string
    contents: (fileCard | fileFolder)[]

    constructor(folderName: string, contents: fileCard[]) {
        this.folderName = folderName
        this.contents = contents
    }
}