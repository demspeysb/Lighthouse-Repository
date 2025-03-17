/**
 * Represents a file card with basic information.
 * 
 * TODO: Extend functionality to include metadata such as file size, type, 
 * last modified date, and other relevant attributes. This may also include
 * the Auth URL for fillable forms.
 */
export class fileCard {
    filename: string;
    fullPath: string;

    constructor(filename: string, fullPath: string) {
        this.filename = filename;
        this.fullPath = fullPath;
    }
}
