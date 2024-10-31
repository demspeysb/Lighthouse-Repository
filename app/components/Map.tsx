import { useEffect, useState } from 'react';
import { createDatalayerButton } from '../mapComponents/mapControls';
import PlaneZones from '../dataFiles/PlaneZones.json';
import primaryCare from '../dataFiles/Selected_Counties_Facilities.json';
import { getDataLayers } from '../dataFiles/getDataFiles';

interface MapProps {
  center: google.maps.LatLngLiteral;
  zoom: number;
  mapId: string;
}

const mapApiKeyName: string = 'projects/489795191195/secrets/google-maps-api-key/versions/latest';
let apiKey: string ="";

// Fetch api key from google cloud
fetch(`http://localhost:3000/api/getSecret`, {
  method: "POST",          
  headers: {"Content-Type": "text/plain" },
  body: mapApiKeyName
})
  .then((res) => res.json())
  .then((data) => {
    apiKey = data.secret; // Use the secret
  })
  .catch((error) => console.error(error));

// Create map source string with apiKey to access google maps
const mapSource: string = `https://maps.googleapis.com/maps/api/js?key=${apiKey}AIzaSyDDx3QCrdoOowfXLJfeoReFkDFV4ZeKZgw&loading=async&libraries=maps,marker&v=beta`

// Export map allow allows for outside files to access map functions
export let map: google.maps.Map;

// Holds marker group for plane landing zones
let markerGroupOne: google.maps.marker.AdvancedMarkerElement[] = [];

export function toggleMarkerGroup() {
  if(markerGroupOne[0].map == map) {
    markerGroupOne.forEach((marker) => {
      marker.map = null;
    });
  } else {
    markerGroupOne.forEach((marker) => {
      marker.map = map;
    });
  }
}

export function showMarkerGroup() {
  markerGroupOne.forEach((marker) => {
    marker.map = map;
  });
}

export function toggleLayer(layer:google.maps.Data) {
    if (layer.getMap()) {
      layer.setMap(null);  // Remove the layer
    } else {
      layer.setMap(map);  // Add the layer back
      console.log("layer added");
    }
}

export const Map: React.FC<MapProps> = ({ center, zoom, mapId }) => {

  useEffect(() => {
    async function initMap(): Promise<void> {
      //Api library imports
      const { InfoWindow } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
      const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

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

      PlaneZones.forEach(({position, title}, i) => {

        //A switch case to determine the background color based on surface type
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
           backgroundColor = '#1979e6';  //Default color if no specific surface is found
       }

        //Custom styling for the Pins
       const pin = new PinElement({
           glyph: `${i + 1}`,
           glyphColor: '#FFFFFF',
           background: backgroundColor,
           borderColor: 'black',
           scale: 1,
       });

       // Marker creation
       const marker = new AdvancedMarkerElement({
           position,
           map: null,
           title: `${i + 1}. ${title}`,
           content: pin.element,
           gmpClickable: true,
       });

       // Click listener for each marker, and set up the info window.
       marker.addListener('gmp-click', (event: google.maps.MapMouseEvent) => {
         const latLng = event.latLng;
         infoWindow.close();
         infoWindow.setContent(marker.title);
         infoWindow.open(marker.map, marker);
       });

       markerGroupOne.push(marker);
     });

      // Creates div that holds all the layer toggle buttons
      const LayersDiv = document.createElement("div");

      // Data layer for the primary care facilities
      let primaryCareLayer = new google.maps.Data();
      primaryCareLayer.addGeoJson(primaryCare);
      primaryCareLayer.addListener('click', (event: google.maps.Data.MouseEvent) => {
        const contentString = `
          <div>
            <strong>Facility:</strong> ${event.feature.getProperty('FACILITY')}<br/>
            <strong>Address:</strong> ${event.feature.getProperty('ADDRESS')}<br/>
            <strong>City:</strong> ${event.feature.getProperty('CITY')}<br/>
          </div>
        `;
        infoWindow.setContent(contentString);
        infoWindow.setPosition(event.latLng);
        infoWindow.open(map);
      });
      const primaryCareButton = createDatalayerButton(map, primaryCareLayer, "map-control-button", "Primary Care Providers");
      LayersDiv.appendChild(primaryCareButton);

      //Dynamic data layers
      getDataLayers().forEach((dataObject, i) => {
        const metaData = dataObject.data.metaData;
        if(metaData.items.length > 0) {
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
        let layerButton = createDatalayerButton(map, dataObject.layer, "map-control-button", `${metaData.name}`);
        LayersDiv.appendChild(layerButton);
      });

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
          src={mapSource} defer>
        </script>
      </>
  );
};

export default Map;