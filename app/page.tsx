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
              
            </div>
        </div>
        <div className="map-div">
          {<Map/>}
        </div>
      </div>
    </main>
  );
};
