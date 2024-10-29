"use client";
import Map from "./components/Map";
import {addMarker, toggleMarkerGroup, toggleLayer, getLayers } from "./components/Map";
import SideNavbar from "./components/sidebar";

export default function PrivatePage(event: any) {
  let  center = { lat: 38.3853, lng: -91.9099 };
  const zoom = 10;
  const mapId = "a9c7951e16e3f5b1";

  // const controlsDiv = document.getElementById("mapControls") as HTMLDivElement;
  // const dataLayers = getLayers();

  // for(let i=0; i < dataLayers.length; i++){
  //   const layerCheckbox = `
  //     <div class="checkbox-wrapper-13">
  //         <input type="checkbox" id="layerCheckbox${i}" name="layerCheckbox${i}" onchange="toggleLayer(${dataLayers[i]})">
  //         <label for="layerCheckbox${i}">Data Layer</label>
  //     </div>
  //   `;
  //   controlsDiv.innerHTML += layerCheckbox;
  // };

  return (
    <main>
      <title>EMS Dashboard</title>
      <div className="flex-container">

        <div id="mapControls" className="map-controls flex-item">
          <h1 className="sectionHeader">Advanced Map Controls</h1>
            <br/>
            <div className="checkbox-wrapper-13">
              <input type="checkbox" id="myCheckbox" name="myCheckbox" onChange={() => toggleMarkerGroup()}></input>
              <label htmlFor="myCheckbox">Plane Landing Zones</label>
            </div>
            {/* <div className="checkbox-wrapper-13">
              <input type="checkbox" id="layerCheckbox" name="layerCheckbox" onChange={() => toggleLayers()}></input>
              <label htmlFor="layerCheckbox">Data Layers</label>
            </div> */}
        </div>

        <div className="map-div">
          {<Map center={center} zoom={zoom} mapId={mapId}/>}
        </div>
      </div>
      <SideNavbar/>
    </main>
  );
};