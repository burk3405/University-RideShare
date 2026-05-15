import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CampusMap from '../components/Map';
import './OfferRide.css';

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

export default function OfferRide() {
  const navigate = useNavigate();

  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [seats, setSeats] = useState(1);
  const [departTime, setDepartTime] = useState('');
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const departureLocation = LANDMARKS.find((l) => l.label === departure) || null;
  const destinationLocation = LANDMARKS.find((l) => l.label === destination) || null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!departure || !destination || !departTime) return;
    // TODO: POST request to backend API
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="offer-success">
        <div className="success-icon">✅</div>
        <h2>Ride Posted!</h2>
        <p>
          Your ride from <strong>{departure}</strong> to <strong>{destination}</strong> has been
          listed. Passengers will be notified.
        </p>
        <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="offer-ride">
      <h1>Offer a Ride</h1>

      <div className="offer-layout">
        <form className="offer-form" onSubmit={handleSubmit}>
          <label htmlFor="departure">Departure Location</label>
          <select
            id="departure"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
            required
          >
            <option value="">Select a campus location…</option>
            {LANDMARKS.map((l) => (
              <option key={l.label} value={l.label}>
                {l.label}
              </option>
            ))}
          </select>

          <label htmlFor="destination">Destination</label>
          <select
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          >
            <option value="">Select a campus location…</option>
            {LANDMARKS.map((l) => (
              <option key={l.label} value={l.label}>
                {l.label}
              </option>
            ))}
          </select>

          <label htmlFor="departTime">Departure Time</label>
          <input
            id="departTime"
            type="datetime-local"
            value={departTime}
            onChange={(e) => setDepartTime(e.target.value)}
            required
          />

          <label htmlFor="seats">Available Seats</label>
          <input
            id="seats"
            type="number"
            min={1}
            max={7}
            value={seats}
            onChange={(e) => setSeats(Number(e.target.value))}
          />

          <label htmlFor="note">Note for Passengers (optional)</label>
          <textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="e.g. I'll be in a blue Honda Civic"
            rows={3}
          />

          <button
            className="btn btn-primary btn-full"
            type="submit"
            disabled={!departure || !destination || !departTime}
          >
            Post Ride
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
          <CampusMap pickup={departureLocation} dropoff={destinationLocation} />
        </div>
      </div>
    </div>
  );
}
