"use client";
import Map from "./components/Map";
import {addMarker} from "./components/Map";
import SideNavbar from "./components/sidebar";

export default function PrivatePage(event: any) {
  let  center = { lat: 38.3853, lng: -91.9099 };
  const zoom = 10;
  const mapId = "a9c7951e16e3f5b1";

  function changeCoords(): void {
    const latInput = document.getElementById("lat") as HTMLInputElement;
    const lat = parseFloat(latInput.value);

    const lonInput = document.getElementById("lon") as HTMLInputElement;
    const lon = parseFloat(lonInput.value);

    const newLocation = new google.maps.LatLng(lat, lon);
  }

  return (
    <main>
      <title>EMS Dashboard</title>
      <div className="flex-container">

        <div className="map-controls flex-item">
          <h1 className="sectionHeader">Advanced Map Controls</h1>
            {/* { <form>  TODO: Form for adding custom marker
              <label>Latitude: </label>
              <input id="lat" type="number" placeholder="000.0000"></input>
              <br/><br/>
              <label>Longitude: </label>
              <input  id="lat" type="number" placeholder="000.0000"></input>
              <br/><br/>
              <button type="button" onClick={() => {changeCoords()}}>Submit</button>
            </form> } */}
            {/* <button className="button-1" type="button" onClick={() => {addMarker(38.3853, -91.9099)}}>Add Test Marker</button> */}
        </div>

        <div className="map-div">
          {<Map center={center} zoom={zoom} mapId={mapId}/>}
        </div>
      </div>
      <SideNavbar/>
    </main>
  );
};