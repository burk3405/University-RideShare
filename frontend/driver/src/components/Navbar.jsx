import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import './Navbar.css';

export default function Navbar() {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  return (
    <nav className="navbar">
      <Link to="/dashboard" className="navbar-brand">
        🎓 UniRideShare <span className="navbar-role">Driver</span>
      </Link>

      <div className="navbar-links">
        {isAuthenticated ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/offer-ride">Offer Ride</Link>
            <Link to="/requests">Requests</Link>
            <span className="navbar-user">{user?.given_name || user?.email}</span>
            <button
              className="btn btn-outline btn-sm"
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin + '/login' } })
              }
            >
              Log Out
            </button>
          </>
        ) : (
          <button className="btn btn-primary btn-sm" onClick={() => loginWithRedirect()}>
            Log In
          </button>
        )}
      </div>
    </nav>
  );
}
