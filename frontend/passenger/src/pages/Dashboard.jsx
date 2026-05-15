import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard() {
  const { user, logout } = useAuth0();

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome, {user?.given_name || user?.email}!</h1>
        <button
          className="btn btn-outline"
          onClick={() => logout({ logoutParams: { returnTo: window.location.origin + '/login' } })}
        >
          Log Out
        </button>
      </header>

      <div className="dashboard-grid">
        <div className="card">
          <h2>Request a Ride</h2>
          <p>Find a driver heading your way on campus.</p>
          <Link to="/request-ride" className="btn btn-primary">
            Request Now
          </Link>
        </div>

        <div className="card">
          <h2>My Ride History</h2>
          <p>View past trips and ratings.</p>
          <Link to="/history" className="btn btn-secondary">
            View History
          </Link>
        </div>

        <div className="card">
          <h2>My Rating</h2>
          <div className="rating-display">
            <span className="rating-score">
              {user?.['https://university-rideshare/passenger_rating'] ?? '—'}
            </span>
            <span className="rating-label">ELO Score</span>
          </div>
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
