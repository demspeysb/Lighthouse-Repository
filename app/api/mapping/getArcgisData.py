from arcgis.gis import GIS
from arcgis.features import FeatureLayer
import json
 

output_file_path = "./app/api/mapping/GISDataLayer.json"

import json

def convert_to_feature_collection(json_data, output_file):
    # Parse the input JSON string if needed
    if isinstance(json_data, str):
        json_data = json.loads(json_data)

    # Ensure the top-level structure is a dictionary
    if not isinstance(json_data, dict) or "features" not in json_data:
        raise ValueError("Invalid input JSON format")

    # Modify each feature to include "type": "Feature" as the first key
    json_data["features"] = [
        {"type": "Feature", **feature} for feature in json_data["features"]
    ]

    # Add "type": "FeatureCollection" at the top level as the first key
    json_data = {"type": "FeatureCollection", **json_data}

    # Write to a GeoJSON file
    with open(output_file, "w") as file:
        json.dump(json_data, file, indent=4)

    print(f"GeoJSON data saved to {output_file}")
    
    return json_data  # Returns the modified JSON dictionary



#must run pip install arcgis

# Create a GIS instance (you can use None for public access)
#GIS([url of the enterprise portal][user])
#gis = GIS("https://pythonapi.playground.esri.com/portal", username='arcgis_python')
gis = GIS("https://www.arcgis.com")

# Define the URL for the FeatureLayer
url = "https://services2.arcgis.com/bHCR7EW2rtRWmtnn/ArcGIS/rest/services/Soma_Roads_ExportFeatures/FeatureServer/2"

# Create a FeatureLayer object
feature_layer = FeatureLayer(url)
#print(feature_layer)
try:
    query_result =feature_layer.query(where="OBJECTID=1", out_fields="*", return_geometry=True)
    

    print(f"Returned {len(query_result.features)} features.")
    #query_result is too long to see in the terminal we may need to write to a .txt file

    # Convert query result to GeoJSON
    #print(query_result.to_geojson)
    #i=0
    
    if len(query_result.features) > 0:
        #print(query_result.features)
        file = open("./app/api/mapping/GISDataLayer.json", "w")
        # while(i<len(query_result.features)):
            
        #     file.write(str(query_result.features[i])+'\n')  
        #     i=i+1  
        file.write(query_result.to_json)
        file.close() 
    else:
        print("No features found.")
    convert_to_feature_collection(query_result.to_json, output_file_path)

except Exception as e:
    print(f"Error querying feature layer: {e}")





