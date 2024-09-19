/*
*   Zachary Caldwell
*   The Lighthouse Collective
*   Tool to turn .csv files into JSON objects and create a file to review later
*   Developed for Osage County Emergency Response Planning
*   September 11, 2024 (in progress)
*/ 
var fs = require('fs');

async function getFile(filePath){
    await fs.readFile(filePath, "utf-8", async (err, data) => {
        if (err) throw err;
        //console.log(data);
        await fs.writeFile(
            "csvInJson.txt",
            await csvToJson(data),
            function (err) {
                if (err) {
                    return console.error(err);
                }
        
                // If no error the remaining code executes
                console.log(" Finished writing ");
                console.log("Reading the data that's written");
        
                // Reading the file
                fs.readFile("csvInJson.txt", function (err, data) {
                    if (err) {
                        return console.error(err);
                    }
                    //console.log("Data read : " + data.toString());
        
                });
            }
        )

      });
      //console.log('ending');
}
async function csvToJson(csvString) {
    // Trim and split the CSV data into rows
    const rows = csvString.trim().split("\n");
    console.log(`Total rows: ${rows.length}`);

    // Check if there are no rows or just one row (which means no data)
    if (rows.length <= 1) {
        return JSON.stringify([]);
    }

    // Extract headers
    const headers = rows[0].split(",").map(header => header.trim());
    console.log(`Headers: ${headers.join(", ")}`);

    // Process rows to create JSON objects
    const jsonData = rows.slice(1).reduce((acc, row, index) => {
        // Split values and trim them
        const values = row.split(",").map(value => value.trim());

        // Log the number of values in each row
        console.log(`Row ${index + 1}: ${values.length} values`);
        

        const obj = headers.reduce((obj, header, index) => {
            obj[header] = values[index];
            return obj;
        }, {});
        acc.push(obj);
        if (values.length !== headers.length) {
            console.log(`Row ${index + 1}: Does not match header length`);
        }
        return acc;
    }, []);

    console.log(`Total objects created: ${jsonData.length}`);

    // Return the JSON data as a string
    return JSON.stringify(jsonData);
}

//Work on way to get data to search from front end
getFile('1950-2023_actual_tornadoes.csv');