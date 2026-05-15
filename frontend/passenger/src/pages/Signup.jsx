import { useAuth0 } from '@auth0/auth0-react';

/**
 * Auth0's Universal Login handles signup natively.
 * This page is shown if the user navigates to /signup directly;
 * it immediately redirects to Auth0 with screen_hint="signup".
 */
export default function Signup() {
  const { loginWithRedirect } = useAuth0();

  // Fire immediately on mount
  loginWithRedirect({
    authorizationParams: { screen_hint: 'signup' },
  });

  return (
    <div className="auth-container">
      <div className="auth-card">
        <p>Redirecting to sign up…</p>
      </div>
    </div>
  );
}
