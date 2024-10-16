import { useEffect, useState } from 'react';
import { createDatalayerButton } from '../mapControls';
import landingZones from '../dataFiles/landingZones.json';
import MoCounties from '../dataFiles/MoCounties.json';
import MoTornados from '../dataFiles/tornado_paths.json';

interface MapProps {
  center: google.maps.LatLngLiteral;
  zoom: number;
  mapId: string;
}

let map: google.maps.Map;

export function addMarker(lat: number, lon: number) {

  const pin = new google.maps.marker.PinElement({
    scale: 1,
    background: '#000FFF',
    borderColor: '#000FFE',
    glyphColor: 'white',
  });

  if (map) {
    let marker = new google.maps.marker.AdvancedMarkerElement({
      position: { lat, lng: lon }, 
      map: map,
      content: pin.element,
      title: "Title text for the test marker",
      gmpClickable: true,
    });
  } else {
    console.error('Map instance not available');
  }
};

const Map: React.FC<MapProps> = ({ center, zoom, mapId }) => {

  useEffect(() => {
    async function initMap(): Promise<void> {
      //Api library imports
      const { Map, InfoWindow } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
      const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
      //await google.maps.importLibrary("weather&sensor") as google.maps.MapsLibrary;

      //Instantiates the map
      if (!map) {
        const { Map } = await google.maps.importLibrary('maps') as google.maps.MapsLibrary;
        map = new Map(document.getElementById('map') as HTMLElement, {
          center: center,
          zoom: zoom,
          mapId: mapId,
          mapTypeId: google.maps.MapTypeId.TERRAIN,
          fullscreenControlOptions: {
            position: google.maps.ControlPosition.LEFT_BOTTOM // Change the position of the fullscreen button
          }
        });
      }

      // Create an info window to share between markers.
      const infoWindow = new InfoWindow();

      // Creates div that holds all the layer toggle buttons
      const LayersDiv = document.createElement("div");

      // Data layer for the landing zones
      let landingZoneLayer = new google.maps.Data();
      landingZoneLayer.addGeoJson(landingZones);
      landingZoneLayer.setStyle({
        clickable: true
      });

      // Add a click event listener to the layer with a proper type definition
      landingZoneLayer.addListener('click', (event: google.maps.Data.MouseEvent) => {
        const title = event.feature.getProperty('title') as string;
        
        if (title) {
          // Set the content of the info window to the title property
          infoWindow.setContent(`<div><strong>${title}</strong></div>`);
          // Position the info window at the clicked point
          infoWindow.setPosition(event.latLng);
          // Open the info window on the map
          infoWindow.open(map);
        }
      });

      const landingZonesButton = createDatalayerButton(map, landingZoneLayer, "map-control-button", "Plane Landing Zones");
      LayersDiv.appendChild(landingZonesButton);

      // Data layer for the Tornado paths
      let tornadoLayer = new google.maps.Data();
      tornadoLayer.addGeoJson(MoTornados);
      tornadoLayer.setStyle({
        strokeColor: "#BD2682",
        strokeWeight: 6, 
        clickable: true,
      });

      tornadoLayer.addListener('click', (event: google.maps.Data.MouseEvent) => {
        const contentString = `
          <div>
            <strong>Date:</strong> ${event.feature.getProperty('date')}<br/>
            <strong>Time:</strong> ${event.feature.getProperty('time')}<br/>
            <strong>Magnitude:</strong> ${event.feature.getProperty('mag')}<br/>
            <strong>Injuries:</strong> ${event.feature.getProperty('inj')}<br/>
            <strong>Fatalities:</strong> ${event.feature.getProperty('fat')}<br/>
            <strong>Length (miles):</strong> ${event.feature.getProperty('len')}<br/>
            <strong>Width (yards):</strong> ${event.feature.getProperty('wid')}<br/>
            <strong>Property Loss:</strong> ${event.feature.getProperty('loss')}<br/>
          </div>
        `;
        infoWindow.setContent(contentString);
        infoWindow.setPosition(event.latLng);
        infoWindow.open(map);
      });

      const TornadosButton = createDatalayerButton(map, tornadoLayer, "map-control-button", "Missouri Tornados");
      LayersDiv.appendChild(TornadosButton);

      // Data layer for the county zones
      let countiesLayer = new google.maps.Data();
      countiesLayer.addGeoJson(MoCounties);
      countiesLayer.setStyle({
        fillOpacity: 0,
        strokeWeight: 4

      });
      const countiesButton = createDatalayerButton(map, countiesLayer, "map-control-button", "County Zones");
      LayersDiv.appendChild(countiesButton);

      // Add the layer control div to the map UI
      map.controls[google.maps.ControlPosition.TOP_RIGHT].push(LayersDiv);

    }

    initMap();
  }, [center, zoom, mapId]);

  return (
      <>
        {/* The map container */}
        <div id="map" style={{ height: '900px', width: '100%' }} />

        <script
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDDx3QCrdoOowfXLJfeoReFkDFV4ZeKZgw&loading=async&libraries=maps,marker&v=beta" defer>
        </script>
      </>
  );
};

export default Map;