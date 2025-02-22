import { markerGroup } from '../Interfaces/markerGroup';

/**
 * Represents a data layer that holds a collection of markers.
 */
export class DataLayer {
    data: markerGroup;

    /**
     * Creates an instance of DataLayer.
     * @param data - The marker group to be stored in the data layer.
     */
    constructor(data: markerGroup) {
        this.data = data;
    }
}
