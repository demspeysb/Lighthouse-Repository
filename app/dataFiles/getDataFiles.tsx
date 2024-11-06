import MoCounties from '../dataFiles/MoCounties.json';
import MoTornados from '../dataFiles/tornado_paths.json';
import townships from '../dataFiles/MO_Townships_Boundaries.json';
import drinkingDistricts from '../dataFiles/MO_Public_Drinking_Water_Districts.json';
import { DataLayer } from '../mapComponents/dataLayer';
import { DataObject } from '../Interfaces/DataObject';

// Eventually, the files and styles will be stored on the GCP and called in
const dataObjects: DataObject[] = 
    [
        {
            file: MoCounties,
            style: {fillOpacity: 0,strokeWeight: 4},
            metaData: {
                name: "MO Counties",
                items: 
                [
                    {
                        title: "County Name", 
                        property: "coty_name"
                    }
                ]
            }
        },
        {
            file: MoTornados,
            style:{strokeColor: "#BD2682",strokeWeight: 6,clickable: true},
            metaData: {
                name: "MO Tornado Paths",
                items: 
                [
                    {
                        title: "Date", 
                        property: "date"
                    },
                    {
                        title: "Time", 
                        property: "time"
                    },
                    {
                        title: "Magnitude", 
                        property: "mag"
                    },
                    {
                        title: "Injuries", 
                        property: "inj"
                    },
                    {
                        title: "Fatalities", 
                        property: "fat"
                    },
                    {
                        title: "Length (miles)", 
                        property: "len"
                    },
                    {
                        title: "Width (yards)", 
                        property: "wid"
                    },
                    {
                        title: "Property Loss", 
                        property: "loss"
                    }
                ]
            }
        },
        {
            file: townships,
            style: {fillOpacity: 0,strokeWeight: 1,strokeColor: 'red'},
            metaData: {
                name: "MO Townships",
                items: []
            }
        },
        {
            file: drinkingDistricts,
            style: {fillOpacity: 0,strokeWeight: 1,strokeColor: 'blue'},
            metaData: {
                name: "MO Public Water Districts",
                items: 
                [
                    {
                        title: "Public Water Supply System", 
                        property: "PWSSNAME"
                    }
                ]
            }
        }
    ];

export function getDataLayers(): DataLayer[]  {
    const layers: DataLayer[] = [];

    for (let i = 0; i < dataObjects.length; i++) {
        const layer = new DataLayer(dataObjects[i]);
        layers.push(layer);
    }
    return layers;
}
