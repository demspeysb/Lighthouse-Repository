import { useEffect, useState } from 'react';
import { createDatalayerButton } from '../mapControls';
import landingZones from '../dataFiles/landingZones.json';
import MoCounties from '../dataFiles/MoCounties.json';

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

      // Create the layers and add data
      // landingZones.forEach(({position, title}, i) => {

      //   // A switch case to determine the background color based on surface type
      //   let backgroundColor;
      //   switch (true) {
      //     case title.includes('Grass'):
      //       backgroundColor = '#27d836';
      //       break;
      //     case title.includes('Concrete'):
      //       backgroundColor = '#a9a8ac';
      //       break;
      //     case title.includes('Gravel'):
      //       backgroundColor = '#5d5c61';
      //       break;
      //     default:
      //       backgroundColor = '#1979e6'; // Default color if no specific surface is found
      //   }

      //   // Custom styling for the Pins
      //   const pin = new PinElement({
      //       glyph: `${i + 1}`,
      //       glyphColor: '#FFFFFF',
      //       background: backgroundColor,
      //       borderColor: 'black',
      //       scale: 1.5,
      //   });

      //   // Marker creation
      //   const marker = new AdvancedMarkerElement({
      //       position,
      //       map,
      //       title: `${i + 1}. ${title}`,
      //       content: pin.element,
      //       gmpClickable: true,
      //   });

      //   // Click listener for each marker, and set up the info window.
      //   marker.addListener('gmp-click', (event: google.maps.MapMouseEvent) => {
      //     const latLng = event.latLng;
      //     infoWindow.close();
      //     infoWindow.setContent(marker.title);
      //     infoWindow.open(marker.map, marker);
      //   });
      // });

      //--------below is test code to represent using overlays and data layers-------|

      // Instantiates the data layer for the landing zones
      let landingZoneLayer = new google.maps.Data();
      landingZoneLayer.addGeoJson(landingZones);

      let countiesLayer = new google.maps.Data();
      countiesLayer.addGeoJson(MoCounties);

      // Creates div that holds all the layer toggle buttons
      const LayersDiv = document.createElement("div");

      // Creates a button for each layer
      const landingZonesButton = createDatalayerButton(map, landingZoneLayer, "map-control-button", "Plane Landing Zones");
      const countiesButton = createDatalayerButton(map, countiesLayer, "map-control-button", "County Zones");

      // Append the button to the DIV.
      LayersDiv.appendChild(landingZonesButton);
      LayersDiv.appendChild(countiesButton);
      
      // Add the layer control div to the map UI
      map.controls[google.maps.ControlPosition.TOP_RIGHT].push(LayersDiv);

    }

    initMap();
  }, [center, zoom, mapId]);

  return (
      <>
        {/* The map container */}
        <div id="map" style={{ height: '700px', width: '100%' }} />

        <script
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDDx3QCrdoOowfXLJfeoReFkDFV4ZeKZgw&loading=async&libraries=maps,marker&v=beta" defer>
        </script>
      </>
  );
};

export default Map;