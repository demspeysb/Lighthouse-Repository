import { useEffect } from 'react';
import PlaneZones from '../dataFiles/PlaneZones.json';
import { getDataLayers } from '../dataFiles/getDataFiles';
import { createDataLayerCheckbox } from '../mapComponents/mapControls';

interface MapProps {
  center: google.maps.LatLngLiteral;
  zoom: number;
  mapId: string;
}

const mapApiKeyName: string = 'projects/489795191195/secrets/google-maps-api-key/versions/latest';
let apiKey: string ="";

// Create map source string with apiKey to access google maps
const mapSource: string = `https://maps.googleapis.com/maps/api/js?key=${apiKey}AIzaSyDDx3QCrdoOowfXLJfeoReFkDFV4ZeKZgw&loading=async&libraries=maps,marker&v=beta`

// Export map allow allows for outside files to access map functions
export let map: google.maps.Map;

// Holds marker group for plane landing zones
const markerGroupOne: google.maps.marker.AdvancedMarkerElement[] = [];

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

      // Fetch api key from google cloud
      fetch(`../api/getSecret`, {
        method: "POST",          
        headers: {"Content-Type": "text/plain" },
        body: mapApiKeyName
      })
        .then((res) => res.json())
        .then((data) => {
          apiKey = data.secret; // Use the secret
        })
        .catch((error) => console.error(error));

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
         console.log(latLng);
         infoWindow.close();
         infoWindow.setContent(marker.title);
         infoWindow.open(marker.map, marker);
       });

       markerGroupOne.push(marker);
     });

      const controlsDiv = document.getElementById("checkbox-container")

      //Dynamic data layers
      getDataLayers().forEach((dataObject) => {
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
        
        const checkboxId = `layerCheckbox${metaData.name}`;
        if (!document.getElementById(checkboxId)) {
          const checkbox = createDataLayerCheckbox(dataObject);
          controlsDiv?.appendChild(checkbox);
        }
      });

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