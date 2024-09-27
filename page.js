"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PrivatePage;
var Map_1 = require("./app/components/Map");
var Map_2 = require("./app/components/Map");
var Navbar_1 = require("./app/components/Navbar");
function PrivatePage(event) {
    var center = { lat: 38.3853, lng: -91.9099 };
    var zoom = 10;
    var mapId = "a9c7951e16e3f5b1";
    function changeCoords() {
        var latInput = document.getElementById("lat");
        var lat = parseFloat(latInput.value);
        var lonInput = document.getElementById("lon");
        var lon = parseFloat(lonInput.value);
        var newLocation = new google.maps.LatLng(lat, lon);
    }
    <main>
      <Navbar_1.default />
      <div className="flex-container">

        <div className="map-controls flex-item">
          <h1>Map Controls</h1>
            {/* <form>  TODO: Form for adding custom marker
          <label>Latitude: </label>
          <input id="lat" type="number" placeholder="000.0000"></input>
          <br/><br/>
          <label>Longitude: </label>
          <input  id="lat" type="number" placeholder="000.0000"></input>
          <br/><br/>
          <button type="button" onClick={() => {changeCoords()}}>Submit</button>
        </form> */}
            <button className="button-1" type="button" onClick={function () { (0, Map_2.addMarker)(38.3853, -91.9099); }}>Add Test Marker</button>
        </div>

        <div className="map-div">
          {<Map_1.default center={center} zoom={zoom} mapId={mapId}/>}
        </div>

        <div className="weather-history flex-item"><h1>Weather History Section</h1></div>

      </div>
      <div className="data-section flex-item">Charts, Data analysis Section</div>
    </main>;
};
export default page;