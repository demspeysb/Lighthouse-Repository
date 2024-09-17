import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

interface MapProps {
  center: google.maps.LatLngLiteral;
  zoom: number;
}

const Map: React.FC<MapProps> = ({ center, zoom }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false); // Track if the script is loaded

  useEffect(() => {
    if (isLoaded && mapRef.current && window.google) {
      const map = new google.maps.Map(mapRef.current, {
        center,
        zoom,
        mapTypeId: google.maps.MapTypeId.TERRAIN,
      });
    }
  }, [isLoaded, center, zoom]);

  return (
    <>
      {/* Load the Google Maps script dynamically */}
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDDx3QCrdoOowfXLJfeoReFkDFV4ZeKZgw`}
        strategy="afterInteractive"
        onLoad={() => setIsLoaded(true)}
      />
      {/* The map container */}
      <div ref={mapRef} style={{ height: '600px', width: '100%' }} />
    </>
  );
};

export default Map;