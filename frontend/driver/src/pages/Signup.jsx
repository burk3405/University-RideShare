import { useAuth0 } from '@auth0/auth0-react';

export default function Signup() {
  const { loginWithRedirect } = useAuth0();

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
