import { useEffect, useState } from 'react';

interface MapProps {
  center: google.maps.LatLngLiteral;
  zoom: number;
  mapId: string;
}

let map: google.maps.Map;

export function addMarker(lat: number, lon: number) {
  if (map) {
    new google.maps.marker.AdvancedMarkerElement({
      position: { lat, lng: lon }, 
      map: map,
    });
  } else {
    console.error('Map instance not available');
  }
};

const Map: React.FC<MapProps> = ({ center, zoom, mapId }) => {

  useEffect(() => {
    async function initMap(): Promise<void> {
      if (!map) {
        const { Map } = await google.maps.importLibrary('maps') as google.maps.MapsLibrary;
        map = new Map(document.getElementById('map') as HTMLElement, {
          center: center,
          zoom: zoom,
          mapId: mapId
        });
      }
    }

    initMap();
  }, [center, zoom, mapId]);


  return (
      <>
        {/* The map container */}
        <div id="map" style={{ height: '600px', width: '100%' }} />

        <script
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDDx3QCrdoOowfXLJfeoReFkDFV4ZeKZgw&loading=async&libraries=maps,marker&v=beta" defer>
        </script>
      </>
  );
};

export default Map;