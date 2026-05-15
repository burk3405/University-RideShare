import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CampusMap from '../components/Map';
import './RequestRide.css';

// Predefined campus landmark coordinates (FREDONIA campus example — update lat/lng as needed)
const LANDMARKS = [
  { label: 'Reed Library', lat: 42.4599, lng: -79.3359 },
  { label: 'Science Center', lat: 42.4603, lng: -79.3362 },
  { label: 'Williams Center', lat: 42.4612, lng: -79.3371 },
  { label: 'Rockefeller Arts Center', lat: 42.4608, lng: -79.3384 },
  { label: 'Thompson Hall', lat: 42.4591, lng: -79.3347 },
  { label: 'University Commons', lat: 42.4615, lng: -79.3356 },
  { label: 'LoGrasso Hall (Health Center)', lat: 42.4588, lng: -79.3365 },
  { label: 'Maytum Hall', lat: 42.4596, lng: -79.3375 },
  { label: 'Jewett Hall', lat: 42.4620, lng: -79.3390 },
  { label: 'University Village (Townhouses)', lat: 42.4570, lng: -79.3340 },
  { label: 'University Stadium', lat: 42.4575, lng: -79.3400 },
  { label: 'Alumni Hall', lat: 42.4631, lng: -79.3355 },
];

export default function RequestRide() {
  const navigate = useNavigate();
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const pickupLocation = LANDMARKS.find((l) => l.label === pickup) || null;
  const dropoffLocation = LANDMARKS.find((l) => l.label === dropoff) || null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pickup || !dropoff) return;
    // TODO: POST request to backend API
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="request-success">
        <div className="success-icon">✅</div>
        <h2>Ride Requested!</h2>
        <p>We're finding a driver for you. You'll be notified when one is matched.</p>
        <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="request-ride">
      <h1>Request a Ride</h1>

      <div className="request-layout">
        <form className="request-form" onSubmit={handleSubmit}>
          <label htmlFor="pickup">Pickup Location</label>
          <select
            id="pickup"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            required
          >
            <option value="">Select a campus location…</option>
            {LANDMARKS.map((l) => (
              <option key={l.label} value={l.label}>
                {l.label}
              </option>
            ))}
          </select>

          <label htmlFor="dropoff">Drop-off Location</label>
          <select
            id="dropoff"
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
            required
          >
            <option value="">Select a campus location…</option>
            {LANDMARKS.map((l) => (
              <option key={l.label} value={l.label}>
                {l.label}
              </option>
            ))}
          </select>

          <label htmlFor="note">Note for Driver (optional)</label>
          <textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="e.g. I'll be waiting outside the main entrance"
            rows={3}
          />

          <button
            className="btn btn-primary btn-full"
            type="submit"
            disabled={!pickup || !dropoff}
          >
            Request Ride
          </button>
          <button
            className="btn btn-outline btn-full"
            type="button"
            onClick={() => navigate('/dashboard')}
          >
            Cancel
          </button>
        </form>

        <div className="map-wrapper">
          <CampusMap
            pickup={pickupLocation}
            dropoff={dropoffLocation}
          />
        </div>
      </div>
    </div>
  );
}
