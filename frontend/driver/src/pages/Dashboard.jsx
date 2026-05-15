import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard() {
  const { user, logout } = useAuth0();

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Driver Dashboard</h1>
        <div className="header-right">
          <span className="driver-badge">🚗 Driver</span>
          <button
            className="btn btn-outline"
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin + '/login' } })
            }
          >
            Log Out
          </button>
        </div>
      </header>

      <div className="dashboard-grid">
        <div className="card card-highlight">
          <h2>Offer a Ride</h2>
          <p>Set your route and pick up passengers heading your way.</p>
          <Link to="/offer-ride" className="btn btn-primary">
            Start a Ride
          </Link>
        </div>

        <div className="card">
          <h2>Ride Requests</h2>
          <p>View and respond to pending passenger requests.</p>
          <Link to="/requests" className="btn btn-secondary">
            View Requests
          </Link>
        </div>

        <div className="card">
          <h2>My Rating</h2>
          <div className="rating-display">
            <span className="rating-score">
              {user?.['https://university-rideshare/driver_rating'] ?? '—'}
            </span>
            <span className="rating-label">ELO Score</span>
          </div>
        </div>

        <div className="card">
          <h2>Ride History</h2>
          <p>Review completed rides and earnings.</p>
          <Link to="/history" className="btn btn-secondary">
            View History
          </Link>
        </div>

        <div className="card">
          <h2>My Vehicle</h2>
          <p>Manage your registered vehicle information.</p>
          <Link to="/vehicle" className="btn btn-secondary">
            Manage Vehicle
          </Link>
        </div>

        <div className="card">
          <h2>Profile</h2>
          <div className="profile-preview">
            {user?.picture && (
              <img src={user.picture} alt="profile" className="avatar" />
            )}
            <p>{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
