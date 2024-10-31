import { DataObject } from '../Interfaces/DataObject';

export class DataLayer {
    layer: google.maps.Data;
    data: DataObject;

    constructor(data: DataObject) {
        this.layer = new google.maps.Data();
        this.data = data;

        this.addGeoJson(this.data.file);
        this.setStyle(this.data.style);
    }

    private addGeoJson(dataFile: object): void {
        this.layer.addGeoJson(dataFile);
    }

    private setStyle(style: google.maps.Data.StyleOptions): void {
        this.layer.setStyle(style);
    }

    

}
