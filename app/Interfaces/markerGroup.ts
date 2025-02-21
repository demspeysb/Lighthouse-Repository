// Interface defines the structure of the data to be read into the map
export interface markerGroup {
    file: object;
    pinStyle: google.maps.marker.PinElementOptions;
    metaData: {
        name: string;
        items: Array<{
            title: string;
            property: string;
        }>;
    };
}