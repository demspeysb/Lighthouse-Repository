  //Old Code
  
  
  
  
  // [START bigquery_simple_app_deps]
  // Import the Google Cloud client library
  const {BigQuery} = require('@google-cloud/bigquery');
  process.env.GOOGLE_APPLICATION_CREDENTIALS = 'the-lighthouse-collective-d8aff8bf795a.json';


  async function queryStackOverflow() {
    // Queries a public Stack Overflow dataset.

    // [START bigquery_simple_app_client]
    // Create a client
    const bigqueryClient = new BigQuery();
    // [END bigquery_simple_app_client]

    // [START bigquery_simple_app_query]
    // The SQL query to run
    const sqlQuery = `SELECT *
      FROM \`the-lighthouse-collective.tornado_paths\`
        `;

    const options = {
      query: sqlQuery
    };

    // Run the query
    const [rows] = await bigqueryClient.query(options);
    // [END bigquery_simple_app_query]

    // [START bigquery_simple_app_print]
    console.log(rows);
    // [END bigquery_simple_app_print]
  }
  queryStackOverflow();
