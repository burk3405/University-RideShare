import { Auth0Provider } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

/**
 * Wraps the app with Auth0Provider.
 *
 * Set the following environment variables in a .env file at the root
 * of this project:
 *   VITE_AUTH0_DOMAIN=your-auth0-domain.auth0.com
 *   VITE_AUTH0_CLIENT_ID=your-client-id
 *   VITE_AUTH0_AUDIENCE=https://your-api-identifier (optional)
 *
 * In Auth0 Dashboard:
 *   - Allowed Callback URLs: http://localhost:3000/dashboard
 *   - Allowed Logout URLs:   http://localhost:3000/login
 *   - Allowed Web Origins:   http://localhost:3000
 */
export default function Auth0ProviderWithNavigate({ children }) {
  const navigate = useNavigate();

  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

  if (!domain || !clientId) {
    return (
      <div className="auth-error">
        <p>
          Auth0 is not configured. Add <code>VITE_AUTH0_DOMAIN</code> and{' '}
          <code>VITE_AUTH0_CLIENT_ID</code> to your <code>.env</code> file.
        </p>
      </div>
    );
  }

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || '/dashboard');
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin + '/dashboard',
        ...(audience ? { audience } : {}),
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
}
