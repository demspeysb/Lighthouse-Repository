"use client";
import Map from "./components/Map";
import { toggleMarkerGroup } from "./components/Map";
import SideNavbar from "./components/sidebar";

export default function PrivatePage() {
  const  center = { lat: 38.3853, lng: -91.9099 };
  const zoom = 10;
  const mapId = "a9c7951e16e3f5b1";

  return (
    <main>
      <title>EMS Dashboard</title>
      <div className="flex-container">

        <div id="mapControls" className="map-controls flex-item">
          <h1 className="sectionHeader">Advanced Map Controls</h1>
            <br/>
            <div id="checkbox-container" className="checkbox-container">
              <input type="checkbox" id="myCheckbox" name="myCheckbox" onChange={() => toggleMarkerGroup()}></input>
              <label htmlFor="myCheckbox">Plane Landing Zones</label>
              <button onClick={async () => {
                try {
                  const response = await fetch('/api/fileViewer'); // Adjust the path as needed
                  const data = await response.json();
                  //alert(data.message);
                  alert(data.output); // You can do something with the data here
                  //console.log(data)
                } catch (error) {
                  await console.error('Error fetching data:', error);
                }
              }}>
              ConnectionTest
              </button>
            </div>
        </div>

        <div className="map-div">
          {<Map center={center} zoom={zoom} mapId={mapId}/>}
        </div>
      </div>
      <SideNavbar/>
    </main>
  );
};