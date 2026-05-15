import { useAuth0 } from '@auth0/auth0-react';
import './Auth.css';

export default function Login() {
  const { loginWithRedirect, isLoading } = useAuth0();

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">🚗</div>
        <h1>University RideShare</h1>
        <p className="auth-subtitle">Driver Portal</p>

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
          Create Driver Account
        </button>

        <p className="auth-note">
          Need a ride?{' '}
          <a href="http://localhost:3000" rel="noreferrer">
            Switch to Passenger Portal
          </a>
        </p>
      </div>
    </div>
  );
}
