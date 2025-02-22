import { DataObject } from '../Interfaces/DataObject';

/**
 * Represents a data layer for a Google Map, including GeoJSON data and styling.
 * The DataLayer class manages the addition of GeoJSON data and applies a style to the layer.
 */
export class DataLayer {
    layer: google.maps.Data;
    data: DataObject;

    /**
     * Creates a new DataLayer instance and initializes it with the provided data.
     * This constructor adds GeoJSON data to the layer and applies the specified style.
     *
     * @param {DataObject} data - The data object containing the GeoJSON file and style options.
     */
    constructor(data: DataObject) {
        this.layer = new google.maps.Data();  // Initialize the Google Maps Data layer
        this.data = data;  // Store the data object

        // Add the GeoJSON data and apply the style
        this.addGeoJson(this.data.file);
        this.setStyle(this.data.style);
    }

    /**
     * Adds the provided GeoJSON data to the map layer.
     *
     * @param {object} dataFile - The GeoJSON data to be added to the layer.
     * @private
     */
    private addGeoJson(dataFile: object): void {
        this.layer.addGeoJson(dataFile);  // Add the GeoJSON data to the layer
    }

    /**
     * Sets the style for the map layer using the provided style options.
     *
     * @param {google.maps.Data.StyleOptions} style - The style options to apply to the layer.
     * @private
     */
    private setStyle(style: google.maps.Data.StyleOptions): void {
        this.layer.setStyle(style);  // Apply the style to the layer
    }
}
