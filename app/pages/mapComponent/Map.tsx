import { useEffect, useState } from 'react';
import PlaneZones from '../../dataFiles/PlaneZones.json';
import { getDataLayers } from '../../dataFiles/getDataFiles';
import { createDataLayerCheckbox } from './mapControls';

// API key reference from Google Cloud Secret Manager
const mapApiKeyName: string = 'projects/489795191195/secrets/google-maps-api-key/versions/latest';

// Exported map instance for external access
export let map: google.maps.Map;

// Default parameters for map instantiation
const center = { lat: 38.3853, lng: -91.9099 };
const zoom = 10;
const mapId = "a9c7951e16e3f5b1";

// Holds marker group for plane landing zones
const markerGroupOne: google.maps.marker.AdvancedMarkerElement[] = [];

/**
 * Toggles visibility of the marker group on the map.
 */
export function toggleMarkerGroup() {
  if (markerGroupOne[0].map == map) {
    markerGroupOne.forEach((marker) => {
      marker.map = null;
    });
  } else {
    markerGroupOne.forEach((marker) => {
      marker.map = map;
    });
  }
}

/**
 * Shows all markers in the marker group.
 */
export function showMarkerGroup() {
  markerGroupOne.forEach((marker) => {
    marker.map = map;
  });
}

/**
 * Toggles visibility of a given data layer on the map.
 * @param {google.maps.Data} layer - The data layer to toggle.
 */
export function toggleLayer(layer: google.maps.Data) {
  if (layer.getMap()) {
    layer.setMap(null); // Remove the layer
  } else {
    layer.setMap(map); // Add the layer back
    console.log("layer added");
  }
}

declare global {
  interface Window {
    initMap: () => void;
  }
}

// Define globally so callback works
async function initMap() {
  if (!window.google || !window.google.maps) {
    console.error("Google Maps API failed to load.");
    return;
  }

  // Import necessary API libraries
  const { InfoWindow } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
  const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

  // Instantiate the map
  const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
  map = new Map(document.getElementById('map') as HTMLElement, {
    center: center,
    zoom: zoom,
    mapId: mapId,
    mapTypeId: google.maps.MapTypeId.TERRAIN,
    fullscreenControlOptions: {
      position: google.maps.ControlPosition.LEFT_BOTTOM // Position of the fullscreen button
    }
  });

  // Create an info window for markers
  const infoWindow = new InfoWindow();

  // Loop through plane zones and add markers to the map
  PlaneZones.forEach(({ position, title }, i) => {
    // Determine background color based on surface type
    let backgroundColor;
    switch (true) {
      case title.includes('Grass'):
        backgroundColor = '#27d836';
        break;
      case title.includes('Concrete'):
        backgroundColor = '#a9a8ac';
        break;
      case title.includes('Gravel'):
        backgroundColor = '#5d5c61';
        break;
      default:
        backgroundColor = '#1979e6';  // Default color
    }

    // Create custom styled pin for the marker
    const pin = new PinElement({
      glyph: `${i + 1}`,
      glyphColor: '#FFFFFF',
      background: backgroundColor,
      borderColor: 'black',
      scale: 1,
    });

    // Create marker with custom pin styling
    const marker = new AdvancedMarkerElement({
      position,
      map: null,
      title: `${i + 1}. ${title}`,
      content: pin.element,
      gmpClickable: true,
    });

    // Add click listener for each marker to display info window
    marker.addListener('gmp-click', (event: google.maps.MapMouseEvent) => {
      const latLng = event.latLng;
      console.log(latLng);
      infoWindow.close();
      infoWindow.setContent(marker.title);
      infoWindow.open(marker.map, marker);
    });

    markerGroupOne.push(marker);
  });

  const controlsDiv = document.getElementById("checkbox-container");

  // Dynamically add data layers with checkboxes
  getDataLayers().forEach((dataObject) => {
    const metaData = dataObject.data.metaData;
    if (metaData.items.length > 0) {
      dataObject.layer.addListener('click', (event: google.maps.Data.MouseEvent) => {
        let contentString = "<div>";
        metaData.items.forEach((item) => {
          contentString += `<strong>${item.title}: </strong> ${event.feature.getProperty(item.property)}<br/>`
        });
        contentString += "</div>";
        infoWindow.setContent(contentString);
        infoWindow.setPosition(event.latLng);
        infoWindow.open(map);
      });
    }
    
    const checkboxId = `layerCheckbox${metaData.name}`;
    if (!document.getElementById(checkboxId)) {
      const checkbox = createDataLayerCheckbox(dataObject);
      controlsDiv?.appendChild(checkbox);
    }
  });
};

/**
 * React functional component representing a Google Map.
 */
export function Map() {
  const [apiKey, setApiKey] = useState<string | null>(null);

  useEffect(() => {
    async function fetchApiKey() {
      try {
        const response = await fetch("../api/getSecret", {
          method: "POST",
          headers: { "Content-Type": "text/plain" },
          body: mapApiKeyName,
        });
        const data = await response.json();
        setApiKey(data.secret);
        console.log("API key fetched:", data.secret);
      } catch (error) {
        console.error("Error fetching API key:", error);
      }
    }

    fetchApiKey();
  }, []);

  useEffect(() => {
    if (!apiKey || typeof window === "undefined") return; // Ensure we have an API key and are in the browser

  window.initMap = async function () {
    if (!window.google || !window.google.maps) {
      console.error("Google Maps API failed to load.");
      return;
    }
    initMap();
  };

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&loading=async&libraries=maps,marker&v=weekly&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    console.log("script created")

    // script.onload = () => {
    //   initMap();
    // };

    return () => {
      document.body.removeChild(script);
    };
  }, [apiKey]); // Runs when apiKey updates

  return (
    <>
      {/* The map container */}
      <div id="map" style={{ height: '900px', width: '100%' }} />

    </>
  );
};

export default Map;
