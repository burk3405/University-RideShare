import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import './Auth.css';

export default function Login() {
  const { loginWithRedirect, isLoading } = useAuth0();

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">🎓</div>
        <h1>University RideShare</h1>
        <p className="auth-subtitle">Passenger Portal</p>

        <button
          className="btn btn-primary btn-full"
          onClick={() => loginWithRedirect()}
          disabled={isLoading}
        >
          {isLoading ? 'Loading…' : 'Log In'}
        </button>

        <div className="auth-divider">or</div>

        <button
          className="btn btn-secondary btn-full"
          onClick={() =>
            loginWithRedirect({
              authorizationParams: { screen_hint: 'signup' },
            })
          }
          disabled={isLoading}
        >
          Create Account
        </button>

        <p className="auth-note">
          Are you a driver?{' '}
          <a href="http://localhost:3001" rel="noreferrer">
            Switch to Driver Portal
          </a>
        </p>
      </div>
    </div>
  );
}
