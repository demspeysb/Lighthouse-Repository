import MoCounties from '../dataFiles/MoCounties.json';
import MoTornados from '../dataFiles/tornado_paths.json';
import townships from '../dataFiles/MO_Townships_Boundaries.json';
import primaryCare from '../dataFiles/Selected_Counties_Facilities.json';
import drinkingDistricts from '../dataFiles/MO_Public_Drinking_Water_Districts.json';
import arcGisUrls from '../api/mapping/arcGisUrls.json';
import arcgisEmsZones from '../api/mapping/GISDataLayer.json';
import { DataLayer } from '../pages/mapComponent/dataLayer';
import { DataObject } from '../Interfaces/DataObject';
import { fetchEsriData } from '../api/mapping/tsArcFetch';

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
        }, 
        {
            file: primaryCare,
            style: {},
            metaData: {
                name: "Primary Care Facilities",
                items: 
                [
                    {
                        title: "Facility", 
                        property: "FACILITY"
                    },
                    {
                        title: "Address", 
                        property: "ADDRESS"
                    },
                    {
                        title: "City", 
                        property: "CITY"
                    },
                ]
            }
        },
        {
            file: arcgisEmsZones,
            style: {fillOpacity: 0,strokeWeight: 2,strokeColor: 'blue'},
            metaData: {
                name: "EMS Zones",
                items:[]
            }
        }
    ];

async function createArcGISLayers() {
    const layers: DataLayer[] = [];
    const arcData = arcGisUrls.layers; 

    // Creates DataObjects and DataLayers for each ARCGIS layers in the json file
    for (let i = 0; i < arcData.length; i++) {
        const dataObject: DataObject = {        // Creates DataObject used to instantiate a google map layer
            file: fetchEsriData(arcData[i].url),    // Fetches the geojson data from the ARC server using link
            style: {fillOpacity: 0,strokeWeight: 4},
            metaData: {
                name: arcData[i].name,
                items:[]
            }
        }
        console.log(arcData[i].name);
        const layer = new DataLayer(dataObject);
        layers.push(layer);
    }
}

export function getDataLayers(): DataLayer[]  {
    const layers: DataLayer[] = [];

    // Creates DataLayers for each of the custom dataset layers in the datafiles location
    for (let i = 0; i < dataObjects.length; i++) {
        const layer = new DataLayer(dataObjects[i]);
        layers.push(layer);
    }
    return layers;
}
