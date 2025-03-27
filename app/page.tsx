"use client";
import Map from "./pages/mapComponent/Map";
import { toggleMarkerGroup } from "./pages/mapComponent/Map";
import Sidebar from "./components/sidebarComponent";

export default function PrivatePage() {

  return (
    <main>
      <title>EMS Dashboard</title>
      <div className="flex-container">
        <Sidebar/>
        <div id="mapControls" className="map-controls flex-item">
          <h1 className="sectionHeader">Advanced Map Controls</h1>
            <br/>
            <div id="checkbox-container" className="checkbox-container">
              <input type="checkbox" id="myCheckbox" name="myCheckbox" onChange={() => toggleMarkerGroup()}></input>
              <label htmlFor="myCheckbox">Plane Landing Zones</label>
              
              <button
                type="button"
                onClick={async () => {
                  const response = await fetch('/api/mapping', {
                    method: 'POST', // ✅ Set the method to POST
                    headers: {
                      'Content-Type': 'application/json', // Specify the content type
                    },
                    body:'https://services2.arcgis.com/bHCR7EW2rtRWmtnn/ArcGIS/rest/services/Soma_Driveways/FeatureServer/1', // Add the data you want to send in the request
                  });

                  if (response.ok) {
                    const data = await response.json();
                    console.log('Response:', data);
                  } else {
                    console.error('Error:', response.statusText);
                  }
                }}
              >
              MappingPost
              </button>

            </div>
        </div>
        <div className="map-div">
          {<Map/>}
        </div>
      </div>
    </main>
  );
};
