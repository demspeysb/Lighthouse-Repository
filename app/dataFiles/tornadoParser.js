const fs = require('fs');
const csv = require('csv-parser');

// Initialize GeoJSON structure
const geojson = {
  type: "FeatureCollection",
  features: []
};

// Read the CSV file and parse it
fs.createReadStream('./MOTornadoCSV.csv')
  .pipe(csv())
  .on('data', (row) => {

    if (parseFloat(row.elat) === 0 && parseFloat(row.elon) === 0) {
        return;  // Skip this row
      }

    const feature = {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [
          [parseFloat(row.slon), parseFloat(row.slat)],  // Start coordinates [lon, lat]
          [parseFloat(row.elon), parseFloat(row.elat)]   // End coordinates [lon, lat]
        ]
      },
      properties: {
        om: row.om,      // Omitted data or unique identifier
        yr: row.yr,      // Year
        mo: row.mo,      // Month
        dy: row.dy,      // Day
        date: row.date,  // Full date
        time: row.time,  // Time of event
        tz: row.tz,      // Timezone
        st: row.st,      // State
        mag: row.mag,    // Magnitude
        inj: row.inj,    // Number of injuries
        fat: row.fat,    // Number of fatalities
        loss: row.loss,  // Property loss
        closs: row.closs, // Crop loss
        len: row.len,
        wid: row.wid,
        ns: row.ns,
        sn: row.sn,
        sg: row.sg,
        f1: row.f1,
        f2: row.f2,
        f3: row.f3,
        f4: row.f4,
        fc: row.fc
      }
    };

    geojson.features.push(feature);
  })
  .on('end', () => {
    // Once done, write the GeoJSON to a file
    fs.writeFileSync('tornado_paths.json', JSON.stringify(geojson, null, 2));
    console.log('GeoJSON file successfully created');
  });
