import { useEffect, useState } from 'react';
import { createDatalayerButton } from '../mapComponents/mapControls';
import landingZones from '../dataFiles/landingZones.json';
import PlaneZones from '../dataFiles/PlaneZones.json';
import MoCounties from '../dataFiles/MoCounties.json';
import MoTornados from '../dataFiles/tornado_paths.json';
import townships from '../dataFiles/MO_Townships_Boundaries.json';
import drinkingDistricts from '../dataFiles/MO_Public_Drinking_Water_Districts.json';
import primaryCare from '../dataFiles/Selected_Counties_Facilities.json';

interface MapProps {
  center: google.maps.LatLngLiteral;
  zoom: number;
  mapId: string;
}

export let map: google.maps.Map;
let markerGroupOne: google.maps.marker.AdvancedMarkerElement[] = [];
let layers: google.maps.Data[] = [];

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

export function getLayers() {
  return layers;
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

      // Create an info window to share between markers.
      const infoWindow = new InfoWindow();

      // Creates div that holds all the layer toggle buttons
      const LayersDiv = document.createElement("div");

      //----------------------------------------------------------------------------------------------------------------------------
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
      layers.push(tornadoLayer);
      //----------------------------------------------------------------------------------------------------------------------------
      // Data layer for the county zones
      let countiesLayer = new google.maps.Data();
      countiesLayer.addGeoJson(MoCounties);
      countiesLayer.setStyle({
        fillOpacity: 0,
        strokeWeight: 4

      });
      countiesLayer.addListener('click', (event: google.maps.Data.MouseEvent) => {
        const contentString = `
          <div>
          ${event.feature.getProperty('coty_name_long')}
          </div>
        `;
        infoWindow.setContent(contentString);
        infoWindow.setPosition(event.latLng);
        infoWindow.open(map);
      });
      countiesLayer.setMap(map);
      layers.push(countiesLayer);
      //----------------------------------------------------------------------------------------------------------------------------
      // Data layer for the Township zones
      let townshipLayer = new google.maps.Data();
      townshipLayer.addGeoJson(townships);
      townshipLayer.setStyle({
        fillOpacity: 0,
        strokeWeight: 1,
        strokeColor: 'red'

      });
      const townshipButton = createDatalayerButton(map, townshipLayer, "map-control-button", "Townships");
      LayersDiv.appendChild(townshipButton);
      layers.push(townshipLayer);
      //----------------------------------------------------------------------------------------------------------------------------
      // Data layer for the drinking water districts
      let drinkingLayer = new google.maps.Data();
      drinkingLayer.addGeoJson(drinkingDistricts);
      drinkingLayer.setStyle({
        fillOpacity: 0,
        strokeWeight: 1,
        strokeColor: 'blue'

      });
      drinkingLayer.addListener('click', (event: google.maps.Data.MouseEvent) => {
        const contentString = `
          <div>
          <strong>Public Water Supply System: </strong>${event.feature.getProperty('PWSSNAME')}
          </div>
        `;
        infoWindow.setContent(contentString);
        infoWindow.setPosition(event.latLng);
        infoWindow.open(map);
      });
      const drinkingButton = createDatalayerButton(map, drinkingLayer, "map-control-button", "Drinking Districts");
      LayersDiv.appendChild(drinkingButton);
      layers.push(drinkingLayer);
      //----------------------------------------------------------------------------------------------------------------------------
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
      layers.push(primaryCareLayer);
      //----------------------------------------------------------------------------------------------------------------------------
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