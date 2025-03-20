from arcgis.gis import GIS
from arcgis.features import FeatureLayer

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
    query_result = feature_layer.query(where="1=1", out_fields="*", return_geometry=True)
    print(f"Returned {len(query_result.features)} features.")
    #query_result is too long to see in the terminal we may need to write to a .txt file
    print(query_result)
    i=0
    curString = ""
    """
    while(i<len(query_result.features)):
        i=i+1
        print(i)
        curString=query_result.features 
    """
    if len(query_result.features) > 0:
        #print(query_result.features)
        file = open("./app/api/mapping/GISDataLayer.txt", "w")
        while(i<len(query_result.features)):
            
            file.write(str(query_result.features[i])+'\n')  
            i=i+1  
        file.close() 
    else:
        print("No features found.")
except Exception as e:
    print(f"Error querying feature layer: {e}")
