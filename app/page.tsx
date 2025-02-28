"use client";
import Map from "./pages/mapComponent/Map";
import { toggleMarkerGroup } from "./pages/mapComponent/Map";
import SideNavbar from "./pages/mapComponent/Map";
import Sidebar from "./components/sidebarComponent";

export default function PrivatePage() {
  const  center = { lat: 38.3853, lng: -91.9099 };
  const zoom = 10;
  const mapId = "a9c7951e16e3f5b1";

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
              {
              <button onClick={async () => {
                try {
                  sendDataToBackend();
                } catch (error) {
                  await console.error('Error fetching data:', error);
                }
              }}>
              ConnectionTestPOST
              </button>
              }
            </div>
        </div>

        <div className="map-div">
          {<Map center={center} zoom={zoom} mapId={mapId}/>}
        </div>
      </div>
    </main>
  );
};
/*
const sendStringToBackend = async () => {
  const myString = "Hello from frontend!";

  try {
      const response = await fetch("http://localhost:3000/api/send-string", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: myString }),
      });

      const result = await response.json();
      console.log("Response from backend:", result);
  } catch (error) {
      console.error("Error sending string:", error);
  }
};*/
const sendDataToBackend = async () => {
  try {
    const response = await fetch('../api/fileViewer', {
      method: 'POST',
      headers: {
        'Content-Type': "text/plain", // specify JSON format
      },
      //body: JSON.stringify({ data: 'Hello from Front end' }), // pass the input data as JSON
      body: 'Hello from Front end', // pass the input data as JSON
    });
    console.log('We attempt the frontend post')
    const result = await response.json(); // handle backend response if needed
    console.log('Backend response:', result);
    
  } catch (error) {
    console.error('Error sending data to backend:', error);
  }
};