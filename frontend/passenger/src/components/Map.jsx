import { GoogleMap, Marker, DirectionsRenderer, useJsApiLoader } from '@react-google-maps/api';
import { useState, useEffect } from 'react';

const MAP_LIBRARIES = ['places'];

// Default center: approximate center of FREDONIA campus
const DEFAULT_CENTER = { lat: 42.4600, lng: -79.3365 };

/**
 * CampusMap renders a Google Map with optional pickup/dropoff markers
 * and a route between them when both are provided.
 *
 * Props:
 *   pickup  – { lat, lng, label } | null
 *   dropoff – { lat, lng, label } | null
 *
 * Environment variable required:
 *   VITE_GOOGLE_MAPS_API_KEY – your Google Maps JavaScript API key.
 *
 * Enable these APIs in Google Cloud Console:
 *   - Maps JavaScript API
 *   - Directions API
 *   - Places API (optional, for address search)
 */
export default function CampusMap({ pickup = null, dropoff = null }) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey || '',
    libraries: MAP_LIBRARIES,
  });

  const [directions, setDirections] = useState(null);

  useEffect(() => {
    if (!isLoaded || !pickup || !dropoff) {
      setDirections(null);
      return;
    }

    const service = new window.google.maps.DirectionsService();
    service.route(
      {
        origin: { lat: pickup.lat, lng: pickup.lng },
        destination: { lat: dropoff.lat, lng: dropoff.lng },
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === 'OK') {
          setDirections(result);
        } else {
          console.warn('Directions request failed:', status);
          setDirections(null);
        }
      }
    );
  }, [isLoaded, pickup, dropoff]);

  if (!apiKey) {
    return (
      <div className="map-placeholder">
        <p>
          Add <code>VITE_GOOGLE_MAPS_API_KEY</code> to your <code>.env</code> file to
          enable the map.
        </p>
      </div>
    );
  }

  if (loadError) {
    return <div className="map-placeholder">Failed to load Google Maps.</div>;
  }

  if (!isLoaded) {
    return <div className="map-placeholder">Loading map…</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '100%' }}
      center={pickup ? { lat: pickup.lat, lng: pickup.lng } : DEFAULT_CENTER}
      zoom={15}
    >
      {pickup && !directions && (
        <Marker
          position={{ lat: pickup.lat, lng: pickup.lng }}
          label="A"
          title={pickup.label}
        />
      )}
      {dropoff && !directions && (
        <Marker
          position={{ lat: dropoff.lat, lng: dropoff.lng }}
          label="B"
          title={dropoff.label}
        />
      )}
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
}
