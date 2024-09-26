const fs = require('fs');

// Function to filter county polygons for a given state
function filterStateCounties(inputFilePath, outputFilePath, targetState) {
  // Read the original JSON file
  fs.readFile(inputFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }

    // Parse the JSON data
    let geojson = JSON.parse(data);

    // Filter for only the target state counties (assuming the 'state' property exists)
    let stateCounties = geojson.features.filter(feature => {
      return feature.properties.ste_name == targetState;
    });

    // Create a new JSON object with filtered counties
    let stateJson = {
      type: "FeatureCollection",
      features: stateCounties
    };

    // Write the filtered data to a new file
    fs.writeFile(outputFilePath, JSON.stringify(stateJson, null, 2), 'utf8', err => {
      if (err) {
        console.error("Error writing the file:", err);
        return;
      }
      console.log("File successfully written to", outputFilePath);
    });
  });
}

// Example usage
const inputFilePath = 'usCounties.json';   // Path to your input JSON file
const outputFilePath = 'MoCounties.json'; // Path to the output file
const targetState = 'Missouri'; // State you want the counties for

filterStateCounties(inputFilePath, outputFilePath, targetState);
