"use client";
import Map from "./components/Map";
import Navbar from './components/Navbar';

export default function PrivatePage(event: any) {
  let  center = { lat: 38.3853, lng: -91.9099 };
  const zoom = 10;

  function changeCoords(): void {
    const latInput = document.getElementById("lat") as HTMLInputElement;
    const lat = parseFloat(latInput.value);

    const lonInput = document.getElementById("lon") as HTMLInputElement;
    const lon = parseFloat(lonInput.value);

    const newLocation = new google.maps.LatLng(lat, lon);
  }

  return (
    <main>
      <Navbar/>
      <div className="flex-container">

        <div className="map-controls flex-item">
          <h1>Map Controls</h1>
            <form>
              <label>Latitude: </label>
              <input id="lat" type="number" placeholder="000.0000"></input>
              <br/><br/>
              <label>Longitude: </label>
              <input  id="lat" type="number" placeholder="000.0000"></input>
              <br/><br/>
              <button type="button" onClick={() => {changeCoords()}}>Submit</button>
            </form>
        </div>

        <div className="map-div">
          {<Map center={center} zoom={zoom} />}
        </div>

        <div className="weather-history flex-item"><h1>Weather History Section</h1></div>

      </div>
      <div className="data-section flex-item">Charts, Data analysis Section</div>
    </main>
  );
};