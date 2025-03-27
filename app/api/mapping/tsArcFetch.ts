//const fs = require("fs").promises;


/*
export async function fetchEsriData(url: string) {
    try {
        const response = await fetch(`${url}/query?where=1=1&outFields=*&outSR=4326&f=geojson`);
        const data = await response.json();
        console.log(data)
        return data

    } catch (error) {
        console.error("Error fetching ArcGIS data:", error);
    }
}
fetchEsriData('https://services2.arcgis.com/bHCR7EW2rtRWmtnn/ArcGIS/rest/services/EMS_BOUNDARIES/FeatureServer/21')
*/


// Code for writing the ARCGIS geojson to a file
/*
async function fetchEsriDataToOutputFile(url: string, outputFile: string) {
     try {
         const response = await fetch(`${url}/query?where=1=1&outFields=*&outSR=4326&f=geojson`);
         const data = await response.json();

         // // Write data to a JSON file
         await fs.writeFile(outputFile, JSON.stringify(data, null, 2));
         console.log(`Data successfully written to ${outputFile}`);
     } catch (error) {
        console.error("Error fetching ArcGIS data:", error);
     }
}


// // Example usage:
 const esriLayerUrl = "https://services2.arcgis.com/bHCR7EW2rtRWmtnn/ArcGIS/rest/services/EMS_BOUNDARIES/FeatureServer/21";
fetchEsriDataToOutputFile(esriLayerUrl, "./app/api/mapping/GISDataLayer.json");

*/