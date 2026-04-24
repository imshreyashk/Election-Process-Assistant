import { GoogleMap, useJsApiLoader, Marker, InfoWindow, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import type { PollingLocation } from '../../services/civicApi';
import { MapPin } from 'lucide-react';

interface PollingLocationMapProps {
  locations: PollingLocation[];
  userOrigin: string;
}

const mapContainerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: 'var(--radius-lg)'
};

export const PollingLocationMap = ({ locations, userOrigin }: PollingLocationMapProps) => {
  const [selectedLocation, setSelectedLocation] = useState<PollingLocation | null>(null);
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
  const [directionsError, setDirectionsError] = useState<string | null>(null);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey
  });

  const center = useMemo(() => {
    if (locations && locations.length > 0) {
      return {
        lat: locations[0].latitude ?? 0,
        lng: locations[0].longitude ?? 0
      };
    }
    return { lat: 0, lng: 0 }; // Default fallback
  }, [locations]);

  const handleMarkerClick = (loc: PollingLocation) => {
    setSelectedLocation(loc);
    setDirectionsResponse(null);
    setDirectionsError(null);
  };

  const directionsCallback = (
    result: google.maps.DirectionsResult | null,
    status: google.maps.DirectionsStatus
  ) => {
    if (status === 'OK' && result) {
      setDirectionsResponse(result);
    } else {
      setDirectionsError('Could not calculate directions.');
    }
  };

  if (!apiKey) {
    return (
      <div className="card text-center flex flex-col items-center justify-center gap-4" style={{ height: '400px' }}>
        <MapPin size={48} color="var(--text-muted)" />
        <h3 style={{ color: 'var(--text-muted)' }}>Map is unavailable</h3>
        <p className="text-muted">A valid Google Maps API key is required to view the interactive map.</p>
        <div style={{ textAlign: 'left', width: '100%', maxWidth: '400px' }}>
          {locations.map(loc => (
            <div key={loc.id} style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>
              <strong>{loc.address.locationName}</strong><br />
              {loc.address.line1}, {loc.address.city}, {loc.address.state} {loc.address.zip}<br />
              <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Hours: {loc.pollingHours}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (loadError) {
    return <div className="card">Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div className="card flex items-center justify-center" style={{ height: '400px' }}>Loading Map...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card"
      style={{ padding: '1rem' }}
    >
      <h3 style={{ marginLeft: '1rem', marginBottom: '1rem' }}>Your Polling Locations</h3>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={13}
        aria-label="Interactive map showing polling locations and directions"
        options={{
          styles: [
            { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
            {
              featureType: "administrative.locality",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [{ color: "#38414e" }],
            },
            {
              featureType: "road",
              elementType: "geometry.stroke",
              stylers: [{ color: "#212a37" }],
            },
            {
              featureType: "road",
              elementType: "labels.text.fill",
              stylers: [{ color: "#9ca5b3" }],
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#17263c" }],
            },
            {
              featureType: "water",
              elementType: "labels.text.fill",
              stylers: [{ color: "#515c6d" }],
            },
            {
              featureType: "water",
              elementType: "labels.text.stroke",
              stylers: [{ color: "#17263c" }],
            },
          ], // Dark mode map styles to match the premium theme
          disableDefaultUI: true,
          zoomControl: true,
        }}
      >
        {locations.map((loc) => (
          <Marker
            key={loc.id}
            position={{ lat: loc.latitude!, lng: loc.longitude! }}
            onClick={() => handleMarkerClick(loc)}
          />
        ))}

        {selectedLocation && userOrigin && !directionsResponse && !directionsError && (
          <DirectionsService
            options={{
              destination: { lat: selectedLocation.latitude!, lng: selectedLocation.longitude! },
              origin: userOrigin,
              travelMode: google.maps.TravelMode.DRIVING,
            }}
            callback={directionsCallback}
          />
        )}

        {directionsResponse && (
          <DirectionsRenderer
            options={{
              directions: directionsResponse,
              suppressMarkers: true, // We already render our own markers
              polylineOptions: {
                strokeColor: '#4F46E5', // match var(--primary)
                strokeWeight: 5,
              }
            }}
          />
        )}

        {selectedLocation && (
          <InfoWindow
            position={{ lat: selectedLocation.latitude!, lng: selectedLocation.longitude! }}
            onCloseClick={() => setSelectedLocation(null)}
          >
            <div style={{ color: '#000', padding: '0.5rem' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#000' }}>{selectedLocation.address.locationName}</h4>
              <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.875rem' }}>
                {selectedLocation.address.line1}<br />
                {selectedLocation.address.city}, {selectedLocation.address.state} {selectedLocation.address.zip}
              </p>
              <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600 }}>
                Hours: {selectedLocation.pollingHours}
              </p>
              {directionsResponse && directionsResponse.routes[0]?.legs[0] && (
                <div style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid #ccc' }}>
                  <p style={{ margin: 0, fontSize: '0.875rem' }}>
                    <strong>Distance:</strong> {directionsResponse.routes[0].legs[0].distance?.text} <br />
                    <strong>Time:</strong> {directionsResponse.routes[0].legs[0].duration?.text}
                  </p>
                </div>
              )}
              {directionsError && (
                <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.75rem', color: 'red' }}>{directionsError}</p>
              )}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </motion.div>
  );
};
