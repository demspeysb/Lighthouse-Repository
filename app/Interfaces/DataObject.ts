// Interface defines the structure of the data to be read into the map
export interface DataObject {
    file: any;
    style: google.maps.Data.StyleOptions;
    metaData: {
        name: string;
        items: Array<{
            title: string;
            property: string;
        }>;
    };
}