const fs = require('fs');

// Load the GeoJSON file
const inputFile = 'MO_Long_Term_Care_Facilities.json';
const outputFile = 'Selected_Counties_Facilities.json';

// List of counties to filter
const counties = ['MARIES', 'GASCONADE', 'COLE', 'CALLAWAY', 'MONTGOMERY', 'MILLER', 'OSAGE'];

// Read the GeoJSON file
fs.readFile(inputFile, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the input file:', err);
        return;
    }

    // Parse the JSON data
    let geoData = JSON.parse(data);

    // Filter the features for facilities in the specified counties
    let selectedCountyFeatures = geoData.features.filter(feature => 
        counties.includes(feature.properties.COUNTY.toUpperCase())
    );

    // Create the new GeoJSON object
    let filteredData = {
        type: "FeatureCollection",
        name: "Selected_Counties_Facilities",
        crs: geoData.crs,
        features: selectedCountyFeatures
    };

    // Write the filtered data to a new file
    fs.writeFile(outputFile, JSON.stringify(filteredData, null, 4), 'utf8', err => {
        if (err) {
            console.error('Error writing to the output file:', err);
            return;
        }
        console.log(`Filtered GeoJSON file saved as ${outputFile}`);
    });
});
