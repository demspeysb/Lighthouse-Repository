"use client"; // Enables client-side rendering in Next.js

import Map from "./mapComponent/Map";
import { toggleMarkerGroup } from "./mapComponent/Map";
import Sidebar from "./components/sidebarComponent";

/**
 * Home component that renders the main dashboard layout, including:
 * - A sidebar for navigation or additional controls.
 * - A map with interactive features.
 * - Advanced map controls for toggling marker groups.
 *
 * @returns {JSX.Element} The rendered home page component.
 */
export default function Home() {
  // Map center coordinates (Osage County, Missouri)
  const center = { lat: 38.3853, lng: -91.9099 };
  const zoom = 10; // Default zoom level for the map
  const mapId = "a9c7951e16e3f5b1"; // Google Maps map ID

  return (
    <main>
      <title>EMS Dashboard</title>
      <div className="flex-container">
        {/* Sidebar component for additional UI controls */}
        <Sidebar />

        {/* Map control panel with a checkbox for toggling marker groups */}
        <div id="mapControls" className="map-controls flex-item">
          <h1 className="sectionHeader">Advanced Map Controls</h1>
          <br />
          <div id="checkbox-container" className="checkbox-container">
            {/* Checkbox to toggle the visibility of plane landing zone markers */}
            <input
              type="checkbox"
              id="myCheckbox"
              name="myCheckbox"
              onChange={() => toggleMarkerGroup()}
            />
            <label htmlFor="myCheckbox">Plane Landing Zones</label>
          </div>
        </div>

        {/* Map component rendering the interactive map */}
        <div className="map-div">
          <Map center={center} zoom={zoom} mapId={mapId} />
        </div>
      </div>
    </main>
  );
}
